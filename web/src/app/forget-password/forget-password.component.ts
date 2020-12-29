import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ValidationMessage, ForgetPasswordModel } from '../core/models/core.model';
import { CoreService } from '../core/services/core.service';

type FormKeys = keyof ForgetPasswordModel;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  validationMessages: ValidationMessage[];
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private coreService: CoreService) { }

  ngOnInit(): void {
    this.validationMessages = [];

    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  getFormControl(...keys: FormKeys[]): AbstractControl {
    return this.coreService.getFormControl(this.forgetPasswordForm, ...keys);
  }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      const model: ForgetPasswordModel = {
        email: this.forgetPasswordForm.get('email').value
      };

      this.coreService.forgetPassword(model).subscribe((res: any) => {
        if (res) {
          this.submitted = true;
        }
      });
    }
  }

  getHeaderMessage() {
    if (!this.submitted) {
      return 'Submit the email that you used to register for the account to receive the password reset link.';
    } else {
      return 'A password reset link has been sent to your email address if you are registered with us. Thank you.';
    }
  }
}
