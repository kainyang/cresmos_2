import { Pipe, PipeTransform } from '@angular/core';

import { TextService } from '../../core/services/text.service';

@Pipe({
    name: 'appText'
})
export class AppTextPipe implements PipeTransform {

    constructor(private textService: TextService) {
    }

    transform(textKey: string, replacements: (string | number)[]): string {
        return this.textService.getText(textKey, replacements);
    }
}
