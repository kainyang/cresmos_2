import { Component, Input, OnInit } from '@angular/core';

import { ValidationMessage } from '../../../core/models/core.model';

@Component({
    selector: 'app-validation-message',
    templateUrl: 'validation-message.component.html',
    styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {
    @Input() validationMessages: ValidationMessage[];

    formatMessage(validationMessage: ValidationMessage) {
        let message: string = validationMessage.message;

        if (validationMessage.replacements && validationMessage.replacements.length) {
            validationMessage.replacements.forEach(x => {
                message = message.replace(`{${x.key}}`, x.value);
            });
        }

        if (validationMessage.property) {
            message = `${validationMessage.property}: ${message}`;
        }

        return message;
    }
}
