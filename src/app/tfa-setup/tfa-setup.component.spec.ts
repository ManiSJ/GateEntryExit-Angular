import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfaSetupComponent } from './tfa-setup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TfaSetupComponent', () => {
  let component: TfaSetupComponent;
  let fixture: ComponentFixture<TfaSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TfaSetupComponent,
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TfaSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
