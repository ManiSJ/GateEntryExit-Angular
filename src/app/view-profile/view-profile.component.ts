import { Component } from '@angular/core';
import { ValidationErrorDto } from '../../models/account/validation-error-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserDetailDto } from '../../models/account/user-detail-dto';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {
  updateProfileForm: FormGroup = this.formBuilder.group({});
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;
  errors!: ValidationErrorDto[];
  
  constructor(private authService : AuthService,
    private formBuilder : FormBuilder,
    private messageService: MessageService){}

  ngOnInit(): void {
   this.buildUpdateProfileForm();
   this.getUserProfile();
  }

  buildUpdateProfileForm(){
    this.updateProfileForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', Validators.required]
      }
    );
  }

  getUserProfile(){
    this.authService.getUserProfileDetail().subscribe((response: UserDetailDto) => {
      this.updateProfileForm.patchValue({  email : response.email, fullName : response.fullName });
    })
  }

  updateProfile() {
    this.authService.updateProfile(this.updateProfileForm.value).subscribe({
      next: (response) => {
        if (response.isSuccess) {         
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated successfully' });
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
}
