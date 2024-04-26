import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:  [AuthService]
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = this.formBuilder.group({});

  constructor(private authService : AuthService,
    private formBuilder : FormBuilder,
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.buildLoginForm();   
  }

  buildLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.isSuccess) {         
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {       
      },
    });
  }
}
