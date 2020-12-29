import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { ApiHttpClient } from './api-http-client';
import { UserModel, LoginModel, RegisteredUsers, Payment, ForgetPasswordModel, ResetPasswordModel } from '../models/core.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CoreService {

    private storageSubscription = new Subject<string>();

    constructor(
        private httpClient: ApiHttpClient) {

    }

    observeStorage(): Observable<any> {
        return this.storageSubscription.asObservable();
    }

    setItem(key: string, data: any) {
        localStorage.setItem(key, data);
        this.storageSubscription.next('changed');
    }

    removeItem(key) {
        localStorage.removeItem(key);
        this.storageSubscription.next('changed');
    }

    registerUser(user: UserModel): Observable<void> {
        return this.httpClient.unsecurePost<void>('/Account/Register', user);
    }

    login(loginData: LoginModel) {
        return this.httpClient.unsecurePost<void>('/Account/Login', loginData);
    }

    forgetPassword(forgetPasswordModel: ForgetPasswordModel) {
        return this.httpClient.unsecurePost<void>('/Account/ForgetPassword', forgetPasswordModel);
    }

    resetPassword(resetPasswordModel: ResetPasswordModel) {
        return this.httpClient.unsecurePost<void>('/Account/ResetPassword', resetPasswordModel);
    }

    getFormControl<T extends string>(form: FormGroup, ...keys: T[]): AbstractControl {
        function getControls(formGroup: FormGroup, index: number): AbstractControl {
            const formControl = formGroup.controls[keys[index]];

            if (index + 1 === keys.length) {
                return formControl;
            } else {
                return getControls(formControl as FormGroup, index + 1);
            }
        }

        return getControls(form, 0);
    }

    validateAllFormFields(control: AbstractControl): void {
        if (control instanceof FormGroup) {
            Object.keys(control.controls).forEach((field: string) => {
                const groupControl = control.get(field);
                this.validateAllFormFields(groupControl);
            });
        } else if (control instanceof FormArray) {
            const controlAsFormArray = control;
            controlAsFormArray.controls.forEach((arrayControl: AbstractControl) => {
                this.validateAllFormFields(arrayControl);
            });
        }

        control.markAsTouched({ onlySelf: true });
        control.updateValueAndValidity({ onlySelf: true });
    }

    isUserLoggedIn(): boolean {
        if (localStorage.getItem('token') !== null) {
            return true;
        } else {
            return false;
        }
    }

    checkUserAccount(registeredUsers: RegisteredUsers): Observable<void> {
        return this.httpClient.unsecurePost<void>('/Account/CheckUserAccount', registeredUsers);
    }

    checkoutPayment(paymentRequest: Payment): Observable<any> {
        return this.httpClient.post<any>('/Payment/Pay', paymentRequest);
    }

    roleMatch(allowedRoles): boolean {
        let isMatch = false;
        const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        const userRole = payLoad.role;
        allowedRoles.forEach(role => {
            userRole === role ? isMatch = true : isMatch = false;
        });

        return isMatch;
    }

    uploadEventFile(formData: FormData): Observable<any> {
        return this.httpClient.postImage('/FileUpload/UploadEventFile', formData);
    }
}
