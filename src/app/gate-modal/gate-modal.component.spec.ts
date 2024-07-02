import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateModalComponent } from './gate-modal.component';
import { NgxsModule } from '@ngxs/store';

describe('GateModalComponent', () => {
  let component: GateModalComponent;
  let fixture: ComponentFixture<GateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateModalComponent,
        NgxsModule.forRoot()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
