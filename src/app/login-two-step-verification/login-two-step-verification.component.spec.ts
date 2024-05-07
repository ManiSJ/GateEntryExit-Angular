import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTwoStepVerificationComponent } from './login-two-step-verification.component';

describe('LoginTwoStepVerificationComponent', () => {
  let component: LoginTwoStepVerificationComponent;
  let fixture: ComponentFixture<LoginTwoStepVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTwoStepVerificationComponent]
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
