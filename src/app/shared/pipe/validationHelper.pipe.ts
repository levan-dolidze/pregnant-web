import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';

export type PatternTypes =
  | 'email'
  | 'mobNumber'
  | 'onlyNumbers'
  | 'onlyAZ'
  | 'personalNumber'
  | 'format'
  | 'onlyLatins'
  | 'none';

@Pipe({
  name: 'validationFormat'
})
export class ValidationHelper implements PipeTransform {
  constructor(private readonly translateService: TranslocoService) { }

  transform(source: FormControl, name: string, patternTypes?: PatternTypes): string[] {

    if (source instanceof FormControl) {
      return this.format(source.errors, name, patternTypes);
    }
    return this.format(source as ValidationErrors, name, patternTypes);

  }

  format(
    errors: ValidationErrors | null,
    name: string,
    patternTypes?: PatternTypes
  ): string[] {
    const messages: string[] = [];
    for (const errorName in errors) {
      switch (errorName) {
        case 'required':
          messages.push(this.translateService.translate('Error_required'));
          break;
        case 'pattern':
          if (patternTypes?.includes('mobNumber')) {
            messages.push(this.translateService.translate('Error_incorrect_mob'));
          }
          if (patternTypes?.includes('email')) {
            messages.push(
              this.translateService.translate('Error_incorrect_email')
            );
          }
          if (patternTypes?.includes('format')) {
            messages.push(
              this.translateService.translate('Error_incorrect_format')
            );
          }
          break;
      }
    }
    return messages;
  }
}
