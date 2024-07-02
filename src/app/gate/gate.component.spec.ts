import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateComponent } from './gate.component';
import { NgxsModule } from '@ngxs/store';
import { MessageService } from 'primeng/api';

describe('GateComponent', () => {
  let component: GateComponent;
  let fixture: ComponentFixture<GateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateComponent,
        NgxsModule.forRoot()
      ],
      providers: [{ provide: MessageService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
