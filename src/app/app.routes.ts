import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { RoleComponent } from './role/role.component';
import { GateComponent } from './gate/gate.component';
import { GateEntryComponent } from './gate-entry/gate-entry.component';
import { GateExitComponent } from './gate-exit/gate-exit.component';
import { SensorComponent } from './sensor/sensor.component';
import { SensorListWithDetailsComponent } from './sensor-list-with-details/sensor-list-with-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TfaSetupComponent } from './tfa-setup/tfa-setup.component';
import { LoginTwoStepVerificationComponent } from './login-two-step-verification/login-two-step-verification.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

export const routes: Routes = [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forget-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [authGuard],
      },
      {
        path: 'tfa-setup',
        component: TfaSetupComponent,
        canActivate: [authGuard],
      },
      {
        path: 'login-two-step',
        component : LoginTwoStepVerificationComponent
      },
      {
        path: 'view-profile',
        component : ViewProfileComponent
      },
      {
        path: 'roles',
        component: RoleComponent,
        canActivate: [roleGuard],
        data: {
          roles: ['Admin'],
        },
      },
      {
        path: 'gates',
        component: GateComponent,
        canActivate: [authGuard],
      },
      {
        path: 'gate-entries',
        component: GateEntryComponent,
        canActivate: [authGuard],
      },
      {
        path: 'gate-exits',
        component: GateExitComponent,
        canActivate: [authGuard],
      },
      {
        path: 'sensors',
        component: SensorComponent,
        canActivate: [authGuard],
      },
      {
        path: 'sensor-with-details',
        component: SensorListWithDetailsComponent,
        canActivate: [authGuard],
      },
];
