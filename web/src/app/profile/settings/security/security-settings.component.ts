import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../profile.service';
import { ResetPasswordModel } from '../../profile.model';
import { LoadingScreenService } from 'src/app/core/loadingScreen/loading-screen.service';
import { ValidationMessage } from 'src/app/core/models/core.model';

@Component({
    selector: 'app-security-settings',
    templateUrl: 'security-settings.component.html',
    styleUrls: ['./security-settings.component.scss']
})

export class SecuritySettingsComponent implements OnInit {

    securityForm: FormGroup;

    validationMessages: ValidationMessage[];

    constructor(private formBuilder: FormBuilder,
        private profileService: ProfileService,
        private loadingScreenService: LoadingScreenService) {
    }

    ngOnInit() {
        this.validationMessages = [];

        this.securityForm = this.formBuilder.group({
            passwordReset: ['', Validators.required],
            passwordResetRepeat: ['', Validators.required],
        });
    }

    resetPassword() {
        this.validationMessages = [];

        const model: ResetPasswordModel = {
            password: this.securityForm.get('passwordReset').value,
            confirmPassword: this.securityForm.get('passwordResetRepeat').value
        };

        this.loadingScreenService.show();
        this.profileService.resetPassword(model).subscribe((res: any) => {
            this.loadingScreenService.hide();
        }, err => {
            if (err.status === 400) {
                this.setValidationMessage(err.error[0].description);
            }
            this.loadingScreenService.hide();
        });
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
