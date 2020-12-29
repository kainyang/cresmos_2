import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CoreService } from '../../core/services/core.service';
import { LoginModel, ValidationMessage } from '../../core/models/core.model';
import { Router } from '@angular/router';

type FormKeys = keyof LoginModel;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;
  validationMessages: ValidationMessage[];

  constructor(
    private formBuilder: FormBuilder,
    private coreService: CoreService,
    private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.router.navigateByUrl('');
    }

    this.validationMessages = [];

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.validationMessages = [];

    const loginData: LoginModel = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    };

    this.coreService.login(loginData).subscribe(
      (res: any) => {
        if (res !== null) {
          this.coreService.setItem('token', res.token);
          this.router.navigateByUrl('/admin');
        }
      },
      err => {
        if (err.status === 400) {
          this.setValidationMessage(err.error.message);
        } else {
          console.log(err);
        }
      }
    );
  }

  getFormControl(...keys: FormKeys[]): AbstractControl {
    return this.coreService.getFormControl(this.loginForm, ...keys);
  }

  private setValidationMessage(message: string) {
    const errorMessage: ValidationMessage = {
      message: message,
      property: '',
      replacements: null
    };

    if (!this.validationMessages.find(x => x.message === message)) {
      this.validationMessages.push(errorMessage);
    }
  }
}
