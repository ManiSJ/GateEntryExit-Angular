import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTwoStepVerificationComponent } from './login-two-step-verification.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('LoginTwoStepVerificationComponent', () => {
  let component: LoginTwoStepVerificationComponent;
  let fixture: ComponentFixture<LoginTwoStepVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTwoStepVerificationComponent,
        HttpClientTestingModule,
      ],
      providers : [MessageService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginTwoStepVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
