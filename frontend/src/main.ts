import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// function globalEvent(eventName: string) {
//   if (!globalThis[eventName]) {
//     globalThis[eventName] = {
//       dispatch: (msg: string) => console.log(`Android [${eventName}]:`, msg),
//     };
//   }
// }

// globalEvent('insClose');
// globalEvent('insOrderCreated');
// globalEvent('insOpenTermsLink');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
