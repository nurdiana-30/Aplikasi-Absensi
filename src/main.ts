import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { addIcons } from 'ionicons';
import {
  homeOutline,
  checkmarkDoneOutline,
  documentTextOutline,
  peopleOutline
} from 'ionicons/icons';

addIcons({
  'home-outline': homeOutline,
  'checkmark-done-outline': checkmarkDoneOutline,
  'document-text-outline': documentTextOutline,
  'people-outline': peopleOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ✅ WAJIB untuk API
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
