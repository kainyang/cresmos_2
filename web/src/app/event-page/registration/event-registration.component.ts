import { Component, OnInit, ViewChild } from '@angular/core';
import { EventInformation, TeamEvent, MemberDetail, PaymentMethod } from '../event-page.model';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventPageService } from '../event-page.service';
import { CoreService } from 'src/app/core/services/core.service';
import { ValidationMessage } from 'src/app/core/models/core.model';
import { LoadingScreenService } from 'src/app/core/loadingScreen/loading-screen.service';
import { WindowService } from 'src/app/core/services/window.service';

type FormKeys = keyof TeamEvent | keyof MemberDetail;

@Component({
    selector: 'app-event-registration',
    templateUrl: './event-registration.component.html',
    styleUrls: ['./event-registration.component.scss']
})

export class EventRegistrationComponent implements OnInit {

    @ViewChild('stepper') stepper;

    paymentMethods: PaymentMethod[] = [
        {value: 'paynow', viewValue: 'PayNow'},
        {value: 'stripe', viewValue: 'Stripe'},
    ];
    selectedPaymentMethod = this.paymentMethods[0].value;

    eventInformation: EventInformation;
    validationMessages: ValidationMessage[];
    memberForm: FormGroup;
    detailsForm: FormGroup;
    teamEvent: TeamEvent;

    registrationCompleted = false;
    isLoaded = false;
    showPayButton = false;
    isRegistered = false;
    isPaidEvent = false;
    isMobileDevice = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private windowService: WindowService,
        private coreService: CoreService,
        private eventPageService: EventPageService,
        private loadingScreenService: LoadingScreenService) { }

    ngOnInit() {
        const eventID = this.route.snapshot.queryParams.eventID;

        this.isMobileDevice = this.windowService.isMobileDevice();

        this.validationMessages = [];

        this.detailsForm = this.formBuilder.group({
            membersDetailList: this.formBuilder.array([])
        });

        this.eventPageService.isUserRegistered(eventID).subscribe(registered => {
            if (registered) {
                this.isRegistered = registered;
                this.setValidationMessage('You are already registered with this event.');
            }
        });

        this.eventPageService.getEventByID(eventID).subscribe(res => {
            if (res) {
                this.eventInformation = res;
                this.isPaidEvent = res.isPaidEvent;

                this.memberForm = this.formBuilder.group({
                    teamName: ['', Validators.required],
                    membersUserName: this.formBuilder.array([])
                });

                const membersUserNameFormArray = this.memberForm.controls.membersUserName as FormArray;

                for (let i = 0; i < this.eventInformation.groupSize; i++) {
                    membersUserNameFormArray.push(this.formBuilder.group({ userName: ['', Validators.required] }));
                }

                this.isLoaded = true;
            }
        });
    }

    getMemberFormControl(...keys: FormKeys[]): AbstractControl {
        return this.coreService.getFormControl(this.memberForm, ...keys);
    }

    getMembersGroupControl(...keys: FormKeys[]): AbstractControl {
        const membersUserName = this.memberForm.controls.membersUserName as FormGroup;

        return this.coreService.getFormControl(membersUserName, ...keys);
    }

    getMemberDetailsControl(index: number, ...keys: FormKeys[]): AbstractControl {
        const memberDetails = this.detailsForm.controls.membersDetailList as FormGroup;

        return this.coreService.getFormControl(memberDetails.controls[index] as FormGroup, ...keys);
    }

    getMembersUserNameFormArray() {
        return this.memberForm.get('membersUserName') as FormArray;
    }

    getMembersDetailFormArray() {
        return this.detailsForm.get('membersDetailList') as FormArray;
    }

    onFirstNextStep() {
        let noErrors = true;
        this.validationMessages = [];

        this.coreService.validateAllFormFields(this.memberForm);
        noErrors = this.checkDuplicateUsernames();

        if (this.memberForm.valid && noErrors) {
            const membersArray = [];
            this.detailsForm.controls.membersDetailList = this.formBuilder.array([]);

            const userNameValues = this.getMembersUserNameFormArray().value;

            userNameValues.forEach(element => {
                membersArray.push({
                    userName: element.userName,
                    status: false
                });
            });

            this.teamEvent = {
                eventID: this.eventInformation.id,
                eventName: this.eventInformation.eventName,
                teamName: this.memberForm.get('teamName').value,
                membersDetail: membersArray
            };

            this.loadingScreenService.show();
            this.eventPageService.validateTeamRegistration(this.teamEvent).subscribe((res: any) => {
                if (res.length > 0) {
                    res.forEach(message => {
                        this.setValidationMessage(message);
                    });
                } else {
                    this.initDetailsForm();
                    this.stepper.selected.completed = true;
                    this.stepper.next();
                }

                this.loadingScreenService.hide();
            });
        }
    }

    onSecondNextStep() {
        this.coreService.validateAllFormFields(this.detailsForm);

        if (this.detailsForm.valid) {
            const memberDetailsList: MemberDetail[] = [];

            this.getMembersDetailFormArray().value.forEach((x: MemberDetail) => {
                const memberDetail: MemberDetail = {
                    userName: x.userName,
                    discordName: x.discordName,
                    playerIGN: x.playerIGN,
                    gameID: x.gameID,
                    dateOfBirth: x.dateOfBirth,
                    postalCode: x.postalCode,
                    phoneNumber: x.phoneNumber
                };

                memberDetailsList.push(memberDetail);
            });

            this.teamEvent.membersDetail = memberDetailsList;

            this.stepper.selected.completed = true;
            this.stepper.next();
        }
    }

    submit() {
        this.loadingScreenService.show();
        this.eventPageService.updateTeamEvent(this.teamEvent).subscribe((res: any) => {
            if (res.length > 0) {
                res.forEach(message => {
                    this.setValidationMessage(message);
                });
            } else {
                this.registrationCompleted = true;
            }

            this.loadingScreenService.hide();
        });
    }

    update() {
        if (this.validationMessages.length === 0) {
            this.loadingScreenService.show();
            this.eventPageService.updateTeamEvent(this.teamEvent).subscribe((res: any) => {
                if (res.length === 0) {
                    this.registrationCompleted = true;
                }

                this.loadingScreenService.hide();
            });
        }
    }

    back() {
        this.showPayButton = false;
    }

    onSelectionChange(event) {
        if (event.selectedIndex === 1) {
            this.onFirstNextStep();
        }
    }

    backToFirstStep() {
        this.stepper.previous();
        this.stepper.selected.completed = false;
    }

    showStripePayment() {
        return this.selectedPaymentMethod === 'stripe' && this.isPaidEvent;
    }

    showPayNowPayment() {
        return this.selectedPaymentMethod === 'paynow' && this.isPaidEvent;
    }

    private initDetailsForm() {
        const memberDetailsArray = this.detailsForm.controls.membersDetailList as FormArray;

        this.teamEvent.membersDetail.forEach(x => {
            memberDetailsArray.push(this.formBuilder.group({
                userName: [x.userName],
                discordName: ['', Validators.required],
                playerIGN: ['', Validators.required],
                gameID: ['', Validators.required],
                dateOfBirth: ['', Validators.required],
                postalCode: ['', Validators.required],
                phoneNumber: ['', Validators.required]
            }));
        });
    }

    private checkDuplicateUsernames() {
        let duplicateExist = false;

        const res = [];
        const memberFormArray = this.getMembersUserNameFormArray().value;

        if (memberFormArray.length <= 1) {
            return false;
        }

        memberFormArray.map(item => {
            const duplicateItem = res.find(x => x.userName === item.userName);

            if (duplicateItem) {
                this.setValidationMessage('Duplicate entry not allowed.');
                duplicateExist = true;
            } else {
                res.push(item);
            }
        });

        return duplicateExist ? false : true;
    }

    private setValidationMessage(message: string) {
        const errorMessage: ValidationMessage = {
            message: message,
            property: '',
            replacements: null
        };

        if (this.validationMessages === [] || !this.validationMessages.find(x => x.message === message)) {
            this.validationMessages.push(errorMessage);
        }
    }
}
