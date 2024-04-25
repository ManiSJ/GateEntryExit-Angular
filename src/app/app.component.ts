import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GateComponent } from './gate/gate.component';
import { SensorComponent } from './sensor/sensor.component';
import { SensorListWithDetailsComponent } from './sensor-list-with-details/sensor-list-with-details.component';
import { GateEntryExitComponent } from './gate-entry-exit/gate-entry-exit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    GateComponent, 
    GateEntryExitComponent,
    SensorComponent,
    SensorListWithDetailsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GateEntryExit';
}
