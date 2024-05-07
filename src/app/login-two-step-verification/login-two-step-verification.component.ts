import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponseDto } from '../../models/account/auth-response-dto';
import { TfaDto } from '../../models/account/tfa-dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-two-step-verification',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-two-step-verification.component.html',
  styleUrl: './login-two-step-verification.component.css'
})
export class LoginTwoStepVerificationComponent {

  twoStepForm = new FormGroup({
    twoFactorCode: new FormControl('', [Validators.required]),
  });
  showError: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  validateControl = (controlName: string) => {
    return this.twoStepForm.get(controlName)?.invalid && this.twoStepForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.twoStepForm.get(controlName)?.hasError(errorName)
  }

  loginUser = (twoStepFromValue: any) => {
    this.showError = false;
    
    const formValue = { ...twoStepFromValue };
    let twoFactorDto: TfaDto = {
      email: this.authService.getUserDetail()?.email,
      code: formValue.twoFactorCode,
      refreshToken : this.authService.getRefreshToken()
    }
    this.authService.loginTfa(twoFactorDto)
    .subscribe({
      next: (response: AuthResponseDto) => {
        if (response.isSuccess) {
          this.authService.updateAuthenticationStatus(true); 
          this.router.navigate(['/dashboard']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Log in success' });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }  

}
