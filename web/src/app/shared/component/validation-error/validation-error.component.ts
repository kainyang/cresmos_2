import { Component, Input, ChangeDetectionStrategy, DoCheck, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

interface ValidationErrors {
    [key: string]: { textReplacements?: string[] };
}

@Component({
    selector: 'app-validation-error',
    templateUrl: 'validation-error.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorComponent implements DoCheck {
    @Input() formCtrl: FormControl;

    errors: ValidationErrors = null;

    constructor(
        private cd: ChangeDetectorRef) { }

    ngDoCheck() {
        if ((this.formCtrl.touched || this.formCtrl.dirty) && this.errors !== this.formCtrl.errors) {
            this.errors = this.formCtrl.errors;
            this.cd.markForCheck();
        }
    }

    mapPropertyToTextKey(prop: string) {
        switch (prop) {
            case 'required':
                return 'This field is required.';
            case 'email':
                return 'Please enter a valid email.';
            case 'passwordNotMatch':
                return 'Passwords do not match.';
            case 'minlength':
                return 'Passwords length must be 8 characters or more.';
            case 'duplicate':
                return 'Duplicated entry not allowed.';
        }
    }
}
