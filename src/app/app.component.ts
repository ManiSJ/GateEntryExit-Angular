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
import { GateExitComponent } from './gate-exit/gate-exit.component';
import { GateEntryComponent } from './gate-entry/gate-entry.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
    GateComponent, 
    GateEntryComponent, 
    GateExitComponent, 
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
    userFirstChar :string = "";
    showMenuItems : boolean = false;
    constructor(private authService : AuthService, private router: Router){}
  
    ngOnInit(): void {
        
        // this needed mainly for login, logout so navigation not shown if not signed in
        this.authService.isAuthenticatedSubject.subscribe((value) => {          
          this.isLoggedIn = value;

          if(value == true){
            this.getUserFirstCharacter();
          }
        });
        
        this.isLoggedIn = this.authService.isAuthenticated();

        if(this.isLoggedIn == true){
          this.getUserFirstCharacter();
        }
    }

    getUserFirstCharacter(){
      var userDetail = this.authService.getUserDetail();
      if(userDetail){
        this.userFirstChar = userDetail.fullName.charAt(0);
      }
    }
  
    logout() {
      this.showMenuItems = !this.showMenuItems;
      this.authService.logout();
      this.router.navigate(['/login']);
    };

    showMenu(){
      this.showMenuItems = !this.showMenuItems;
    }
  }
