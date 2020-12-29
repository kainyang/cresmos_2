import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProfileService } from '../../profile.service';
import { UserProfile } from '../../profile.model';
import { LoadingScreenService } from 'src/app/core/loadingScreen/loading-screen.service';

@Component({
    selector: 'app-general-settings',
    templateUrl: 'general-settings.component.html',
    styleUrls: ['./general-settings.component.scss']
})

export class GeneralSettingsComponent implements OnInit {

    userProfile: UserProfile;
    generalForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private profileService: ProfileService,
        private loadingScreenService: LoadingScreenService) {
    }

    ngOnInit() {
        this.loadingScreenService.show();
        this.profileService.getUserProfile().subscribe(res => {
            this.userProfile = res;

            this.initForm();
            this.loadingScreenService.hide();
        });
    }

    initForm() {
        this.generalForm = this.formBuilder.group({
            email: [this.userProfile.email, [Validators.required, Validators.email]],
            firstName: [this.userProfile.firstName, Validators.required],
            lastName: [this.userProfile.lastName, Validators.required],
            country: [this.userProfile.country, Validators.required],
            phoneNumber: [this.userProfile.phoneNumber, Validators.required],
        });
    }

    onUpdate() {
        const formData: UserProfile = {
            email: this.generalForm.get('email').value,
            userName: this.userProfile.userName,
            firstName: this.generalForm.get('firstName').value,
            lastName: this.generalForm.get('lastName').value,
            country: this.generalForm.get('country').value,
            phoneNumber: this.generalForm.get('phoneNumber').value.toString()
        };

        this.loadingScreenService.show();
        this.profileService.updateUserProfile(formData).subscribe((res: any) => {
            if (res) {
                this.loadingScreenService.hide();
            }
        });
    }
}
