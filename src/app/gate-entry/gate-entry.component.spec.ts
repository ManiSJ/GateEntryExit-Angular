import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateEntryComponent } from './gate-entry.component';
import { NgxsModule } from '@ngxs/store';
import { MessageService } from 'primeng/api';

describe('GateEntryComponent', () => {
  let component: GateEntryComponent;
  let fixture: ComponentFixture<GateEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GateEntryComponent,
        NgxsModule.forRoot()
      ],
      providers: [{ provide: MessageService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
