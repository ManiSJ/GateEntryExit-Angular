import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorComponent } from './sensor.component';
import { MessageService } from 'primeng/api';
import { NgxsModule } from '@ngxs/store';

describe('SensorComponent', () => {
  let component: SensorComponent;
  let fixture: ComponentFixture<SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorComponent,
        NgxsModule.forRoot()
      ],
      providers: [{ provide: MessageService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
