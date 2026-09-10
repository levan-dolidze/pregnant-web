import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { LanguagesEnum } from 'src/app/shared/translate/translation.serive';
// import 'moment/locale/ka';

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
  const lang = window.sessionStorage.getItem('saLang')
    ? window.sessionStorage.getItem('saLang')
    : LanguagesEnum.Ka;
  return new MomentDateAdapter(lang);
}
