import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = this.formBuilder.group({});

  constructor(private authService : AuthService,
    private formBuilder : FormBuilder,
    private router: Router,
    private messageService: MessageService) {
    
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
          if(response.isTfaEnabled){
              this.router.navigate(['/login-two-step']);
            }    
            else{
              this.authService.updateAuthenticationStatus(true); 
              this.router.navigate(['/dashboard']);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Log in success' });
            }                  
        }
      },
      error: (error) => {       
      },
    });
  }
}
