import { MomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/locale/ka';
import { LanguagesEnum } from 'src/app/shared/translate/translation.serive';

export const FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export function dateAdapterFactory() {

  const lang = globalThis.localStorage.getItem('saLang')
    ? JSON.parse(globalThis.localStorage.getItem('saLang') ?? '')
    : LanguagesEnum.Ka;
  return new MomentDateAdapter(lang);
}
