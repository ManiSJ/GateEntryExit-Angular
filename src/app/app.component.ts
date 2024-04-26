import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GateComponent } from './gate/gate.component';
import { SensorComponent } from './sensor/sensor.component';
import { SensorListWithDetailsComponent } from './sensor-list-with-details/sensor-list-with-details.component';
import { GateEntryExitComponent } from './gate-entry-exit/gate-entry-exit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

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
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
    title = 'GateEntryExit';
    isLoggedIn : boolean = false;
  
    constructor(private authService : AuthService, private router: Router){}
  
    ngOnInit(): void {
        
        // this needed mainly for login, logout so navigation not shown if not signed in
        this.authService.isAuthenticatedSubject.subscribe((value) => {          
          this.isLoggedIn = value;
        });
        
        this.isLoggedIn = this.authService.isAuthenticated();
    }
  
    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    };
  }
