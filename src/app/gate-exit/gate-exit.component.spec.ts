import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateExitComponent } from './gate-exit.component';
import { NgxsModule } from '@ngxs/store';
import { MessageService } from 'primeng/api';

describe('GateExitComponent', () => {
  let component: GateExitComponent;
  let fixture: ComponentFixture<GateExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateExitComponent,
        NgxsModule.forRoot()
      ],
      providers: [{ provide: MessageService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GateExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
