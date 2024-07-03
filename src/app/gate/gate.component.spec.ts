import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GateComponent } from './gate.component';
import { NgxsModule, Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import {render, screen, fireEvent} from '@testing-library/angular'
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('GateComponent', () => {
  let component: GateComponent;
  let fixture: ComponentFixture<GateComponent>;
  const user = userEvent.setup();
  let store: Store;
  let dispatchSpy : jasmine.Spy;
  let createGateSpy = jasmine.createSpy().and.callFake(() => {

  });

  beforeEach(async () => {
    const result = await render(GateComponent, {
      declarations : [],
      imports: [GateComponent,
        ReactiveFormsModule,
        CommonModule,
        NgxsModule.forRoot()],
      providers: [{ provide: MessageService }]
    });
    
    store = TestBed.inject(Store);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    fixture = result.fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have heading', () => {
    const heading = screen.getByRole('heading', { name : /gates/i });
    expect(heading).toBeTruthy();
  });

  it('should disable submit button',  async () => {

    // Checking status of submit button
    const submit = screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement;
    expect(submit).toBeTruthy();
    expect(submit.disabled).toBeTruthy();

    // Entering gate name value
    const nameControl = screen.getByRole('textbox', { name : 'name' });
    await user.clear(nameControl);
    await user.type(nameControl, 'GateAA');
    fixture.detectChanges();

    // Checking updated status of submit button
    const submitUpdated = screen.getByRole('button', { name: /submit/i }) as HTMLButtonElement;
    expect(submitUpdated.disabled).toBeFalsy();    

    // Spying on component createOrEditGate()
    spyOn(component, 'createOrEditGate').and.callThrough();

    // Submit form
    await userEvent.click(submit);

    // Checking method called
    expect(component.createOrEditGate).toHaveBeenCalled();
  });

});
