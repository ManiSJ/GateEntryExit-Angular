import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { GateState } from '../state/gate/gate-state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { GateEntryState } from '../state/gateEntry/gate-entry-state';
import { GateExitState } from '../state/gateExit/gate-exit-state';
import { SensorState } from '../state/sensor/sensor-state';
import { tokenInterceptor } from './interceptor/token-interceptor.interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(),
    importProvidersFrom(
      NgxsModule.forRoot([GateState,
        GateEntryState,
        GateExitState,
        SensorState])
    )]
};
