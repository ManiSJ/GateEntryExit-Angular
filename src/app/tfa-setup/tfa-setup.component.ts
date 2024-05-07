import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TfaSetupDto } from '../../models/account/tfa-setup-dto';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tfa-setup',
  standalone: true,
  imports: [QRCodeModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './tfa-setup.component.html',
  styleUrl: './tfa-setup.component.css'
})
export class TfaSetupComponent {
  tfaForm: FormGroup  = new FormGroup({
    code: new FormControl("", [Validators.required])
  });

  isLoading: boolean = true;
  tfaEnabled: boolean = false;
  showError: boolean = false;
  errorMessage: string = "";
  qrInfo: string = "";
  authenticatorKey: string = "";

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    let email = this.authService.getUserDetail()?.email ?? '';
    this.authService.getTfaSetup(email)
      .subscribe((response:TfaSetupDto) => {
        this.tfaEnabled = response.isTfaEnabled ?? false;
        this.qrInfo = response.formattedKey ?? '';
        this.authenticatorKey = response.authenticatorKey ?? '';
        this.isLoading = false;
      }
    );
  }

  validateControl = (controlName: string) => {
    return this.tfaForm.get(controlName)?.invalid && this.tfaForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.tfaForm.get(controlName)?.hasError(errorName)
  }

  disableTfa = () => {
    let email = this.authService.getUserDetail()?.email ?? '';
    this.authService.disableTfa(email)
    .subscribe({
      next: (res:any) => {
        this.tfaEnabled = false;
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = "Two-factor authentication was not disabled for this account (Message: " + err.message + ")";
      }})
  }

  enableTfa = (tfaFormValue: any) => {
    const tfaForm = {... tfaFormValue };

    const tfaSetupDto: TfaSetupDto = {
      email: this.authService.getUserDetail()?.email ?? '',
      code: tfaForm.code
    }

    this.authService.postTfaSetup(tfaSetupDto)
    .subscribe({
      next: (res:any) => {
        this.tfaEnabled = true;
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = "Two-factor authentication was not activated for this account (Message: " + err.message + ")";
      }})
  }  
}
