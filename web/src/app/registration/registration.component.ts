import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CoreService } from '../core/services/core.service';
import { UserModel, UserForm, ValidationMessage } from '../core/models/core.model';
import { LoadingScreenService } from '../core/loadingScreen/loading-screen.service';

type FormKeys = keyof UserForm;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  validationMessages: ValidationMessage[];
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private loadingScreenService: LoadingScreenService) { }

  ngOnInit() {
    this.validationMessages = [];

    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.checkPasswordMatch });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.validationMessages = [];

    const user: UserModel = {
      userName: this.registrationForm.value.userName,
      email: this.registrationForm.value.email,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      password: this.registrationForm.value.password
    };

    this.loadingScreenService.show();
    this.coreService.registerUser(user).subscribe(
      (res: any) => {
        if (res !== null) {
          this.registrationForm.reset();
          this.isSubmitted = true;
          this.loadingScreenService.hide();
        }
      }, err => {
        if (err.status === 400) {
          this.setValidationMessage(err.error[0].description);
        } else {
          console.log(err);
        }
        this.loadingScreenService.hide();
      });
  }

  getFormControl(...keys: FormKeys[]): AbstractControl {
    return this.coreService.getFormControl(this.registrationForm, ...keys);
  }

  private checkPasswordMatch(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    return password === confirmPassword ?
      control.get('confirmPassword').setErrors(null) :
      control.get('confirmPassword').setErrors({ passwordNotMatch: true });
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
