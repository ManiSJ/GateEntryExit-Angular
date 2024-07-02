import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateEntryExitComponent } from './gate-entry-exit.component';
import { MessageService } from 'primeng/api';
import { NgxsModule } from '@ngxs/store';

describe('GateEntryExitComponent', () => {
  let component: GateEntryExitComponent;
  let fixture: ComponentFixture<GateEntryExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateEntryExitComponent,
        NgxsModule.forRoot()
      ],
      providers: [{ provide: MessageService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GateEntryExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
