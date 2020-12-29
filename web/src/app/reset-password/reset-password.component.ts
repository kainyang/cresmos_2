import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ValidationMessage, ResetPasswordModel } from '../core/models/core.model';
import { CoreService } from '../core/services/core.service';
import { ActivatedRoute } from '@angular/router';

type FormKeys = keyof ResetPasswordModel;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  validationMessages: ValidationMessage[];
  email: string;
  token: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private coreService: CoreService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.queryParamMap.get('email');
    this.token = decodeURI(this.activatedRoute.snapshot.queryParamMap.get('token'));

    this.validationMessages = [];

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.checkPasswordMatch });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const model: ResetPasswordModel = {
        email: this.email,
        token: this.token,
        password: this.resetPasswordForm.get('password').value,
        confirmPassword: this.resetPasswordForm.get('confirmPassword').value
      };

      this.coreService.resetPassword(model).subscribe((res: any) => {
        if (res.result === 1) {
          this.submitted = true;
        } else {
          res.errors.forEach(element => {
            this.setValidationMessage(element.description);
          });
        }
      });
    }
  }

  getFormControl(...keys: FormKeys[]): AbstractControl {
    return this.coreService.getFormControl(this.resetPasswordForm, ...keys);
  }

  getHeaderMessage() {
    if (!this.submitted) {
      return 'Please reset your password.';
    } else {
      return 'Password reset completed! Please try to login again.';
    }
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

  private checkPasswordMatch(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    return password === confirmPassword ?
      control.get('confirmPassword').setErrors(null) :
      control.get('confirmPassword').setErrors({ passwordNotMatch: true });
  }
}
