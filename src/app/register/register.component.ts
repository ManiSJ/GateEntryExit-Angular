import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationErrorDto } from '../../models/account/validation-error-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit {

  registerForm: FormGroup = this.formBuilder.group({});
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;
  errors!: ValidationErrorDto[];
  
  constructor(private authService : AuthService,
    private formBuilder : FormBuilder,
    private messageService: MessageService,
    private router: Router){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        fullName: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        if (response.isSuccess) {         
          this.router.navigate(['/login']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully' });
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          this.errors = err!.error;
        }
      },
      complete: () => console.log('Register success'),
    });
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
  }
}
