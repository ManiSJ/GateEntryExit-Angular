import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterOutlet, 
    CommonModule,
    RouterLink, 
    RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isLoggedIn : boolean = false;

  constructor(private authService : AuthService, private router: Router){}

  ngOnInit(): void {
      this.isLoggedIn = this.authService.isAuthenticated();
      if(this.isLoggedIn){
        this.router.navigate(['/dashboard']);
      }
  }
}
