import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EventInformation, EventType, ParticipationType, PaidEvent } from 'src/app/event-page/event-page.model';
import { CoreService } from 'src/app/core/services/core.service';
import { ValidationMessage, Country } from 'src/app/core/models/core.model';
import { SelectService } from 'src/app/core/services/select.service';
import { FileData } from 'src/app/shared/component/file-upload/file-upload.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AdministrationService } from '../../administration.service';
import { forkJoin } from 'rxjs';
import { NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

// tslint:disable: max-line-length

type FormKeys = keyof EventInformation;

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  dateModel: NgbDateStruct;
  time = {hour: 13, minute: 30};
  @ViewChild('dp') dp: NgbDatepicker;

  eventForm: FormGroup;
  eventInformation: EventInformation;
  validationMessages: ValidationMessage[];
  fileValidationErrors: string[];
  eventCreated = false;
  isGroupEvent = false;
  isPaidEvent = false;

  selectedEventType: EventType;
  selectedPaidEvent: PaidEvent;
  selectedParticipationType: ParticipationType;
  selectedGroupSize: number;
  selectedCountry: string;
  fileName: string;

  eventType = EventType;
  paidEvent = PaidEvent;
  participationType = ParticipationType;
  eventTypeKeys = Object.keys(EventType).filter(Number);
  paidEventKeys = Object.keys(PaidEvent).filter(Number);
  participationTypeKeys = Object.keys(ParticipationType).filter(Number);

  groupSizeList: number[];
  countryList: Country[];

  imagePreview: SafeHtml;

  private formData: FormData = null;

  constructor(
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private selectService: SelectService,
    private sanitizer: DomSanitizer,
    private administrationService: AdministrationService) { }

  ngOnInit(): void {
    this.groupSizeList = this.selectService.getGroupSizeList();
    this.countryList = this.selectService.getCountries();

    this.fileValidationErrors = [];
    this.validationMessages = [];

    this.initialiseForm();
  }

  getFormControl(...keys: FormKeys[]): AbstractControl {
    return this.coreService.getFormControl(this.eventForm, ...keys);
  }

  onEventTypeChanged() {
    this.eventForm.get('eventType').setValue(this.selectedEventType);
  }

  onParticipationTypeChanged() {
    const requiredControl = this.formBuilder.control('', Validators.required);
    const type = parseInt(this.selectedParticipationType.toString(), 10);

    switch (type) {
      case ParticipationType.Single:
        this.eventForm.removeControl('groupSize');
        this.isGroupEvent = false;
        break;
      case ParticipationType.Group:
        this.eventForm.addControl('groupSize', requiredControl);
        this.isGroupEvent = true;
        break;
      default:
        break;
    }
  }

  onPaidEventTypeChanged() {
    const requiredControl = this.formBuilder.control('', Validators.required);
    const type = parseInt(this.selectedPaidEvent.toString(), 10);

    switch (type) {
      case PaidEvent.Yes:
        this.eventForm.addControl('amount', requiredControl);
        this.isPaidEvent = true;
        break;
      case PaidEvent.No:
        this.eventForm.removeControl('amount');
        this.isPaidEvent = false;
        break;
      default:
        break;
    }
  }

  onGroupSizeSelect() {
    this.eventForm.get('groupSize').setValue(this.selectedGroupSize);
  }

  onCountrySelect() {

  }

  fileSelected(files: FileData[]) {
    if (files && files.length > 0) {
      this.fileValidationErrors = files[0].validationErrors;

      if (this.fileValidationErrors.length === 0) {
        this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(files[0].previewUrl);

        this.formData = new FormData();
        this.formData.append('formFile', files[0].rawFile);

        this.fileName = files[0].fileName;
        this.eventForm.get('imageURL').setValue(files[0].fileName);
      }
    }
  }

  submit() {
    if (this.eventForm.valid) {
      const dateTime: Date = new Date(this.dateModel.year, this.dateModel.month, this.dateModel.day, this.time.hour, this.time.minute, 0);

      const event: EventInformation = {
        country: this.eventForm.get('country').value,
        description: this.eventForm.get('description').value,
        eventDate: dateTime,
        imageURL: this.eventForm.get('imageURL').value,
        eventName: this.eventForm.get('eventName').value,
        eventType: this.getEventType(this.eventForm.get('eventType').value),
        participationType: this.getParticipationValue(this.eventForm.get('participationType').value),
        groupSize: this.isGroupEvent ? parseInt(this.eventForm.get('groupSize').value, 10) : 0,
        isPaidEvent: this.getPaidEventType(this.eventForm.get('isPaidEvent').value),
        amount: this.isPaidEvent ? parseInt(this.eventForm.get('amount').value, 10) : 0,
        location: this.eventForm.get('location').value,
        points: parseInt(this.eventForm.get('points').value, 10),
      };

      const updateEvent = this.administrationService.updateEvent(event);
      const uploadImage = this.coreService.uploadEventFile(this.formData);

      forkJoin([updateEvent, uploadImage]).subscribe((res: any) => {
        if (res[0].succeeded) {
          this.eventCreated = true;
          this.initialiseForm();
          this.reset();
        }
      });

    } else {
      this.coreService.validateAllFormFields(this.eventForm);
    }
  }

  back() {
    this.eventCreated = false;
  }

  private initialiseForm() {
    this.eventForm = this.formBuilder.group({
      eventDate: [Validators.required],
      location: ['', Validators.required],
      eventType: [EventType.Tournament, Validators.required],
      eventName: ['', Validators.required],
      points: [Validators.required],
      country: ['', Validators.required],
      imageURL: ['', Validators.required],
      description: ['', Validators.required],
      participationType: [ParticipationType.Single, Validators.required],
      isPaidEvent: [false, Validators.required],
    });
  }

  private reset() {
    this.fileName = '';
    this.selectedCountry = null;
    this.selectedEventType = null;
    this.selectedEventType = null;
    this.formData = null;
    this.isGroupEvent = false;
    this.isPaidEvent = false;
  }

  private getPaidEventType(value: string): boolean {
    const type = parseInt(value.toString(), 10);

    switch (type) {
      case PaidEvent.Yes:
        return true;
      case PaidEvent.No:
        return false;
    }
  }

  private getEventType(value: string): EventType {
    const type = parseInt(value.toString(), 10);

    switch (type) {
      case EventType.Tournament:
        return EventType.Tournament;
      case EventType.Internship:
        return EventType.Internship;
    }
  }

  private getParticipationValue(value: string): ParticipationType {
    const type = parseInt(value.toString(), 10);

    switch (type) {
      case ParticipationType.Single:
        return ParticipationType.Single;
      case ParticipationType.Group:
        return ParticipationType.Group;
    }
  }
}
