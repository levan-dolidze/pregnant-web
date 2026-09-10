export interface AppSettings {
  dir: 'ltr' | 'rtl';
  theme: string;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  boxed: boolean;
  horizontal: boolean;
  language: string;
  cardBorder: boolean;
  navPos: 'side' | 'top';
}

export const defaults: AppSettings = {
  dir: 'ltr',
  theme: 'dark',
  sidenavOpened: false,
  sidenavCollapsed: true,
  boxed: false,
  horizontal: false,
  cardBorder: false,
  language: 'en-us',
  navPos: 'side',
};
