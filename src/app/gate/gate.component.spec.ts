import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GateComponent } from './gate.component';
import { NgxsModule, Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import {render, screen, fireEvent} from '@testing-library/angular'
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GateState } from '../../state/gate/gate-state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GateService } from '../../services/gate.service';
import { CreateGateDto } from '../../models/gate/create-gate-dto';
import { GateDto } from '../../models/gate/gate-dto';
import { BehaviorSubject, map, of } from 'rxjs';
import { GetAllGatesDto } from '../../models/gate/get-all-gates-dto';
import { GateDetailsDto } from '../../models/gate/gate-details-dto';
import { GetAllDto } from '../../models/shared/get-all-dto';

describe('GateComponent', () => {
  let component: GateComponent;
  let fixture: ComponentFixture<GateComponent>;
  const user = userEvent.setup();
  let store: Store;
  
  const items$ = new BehaviorSubject<GateDetailsDto[]>([{ id : 'gateDetailsId', name : 'gateDetailsName', entryCount : 78, exitCount: 80}]);

  let createGateSpy = jasmine.createSpy().and.callFake((input: CreateGateDto) => {
    let result = new GateDto();
    result.id = 'gateId';
    result.name = 'gateName'
    const items = items$.value;
    items.push({ id : 'gateDetailsId2', name : 'gateDetailsName2', entryCount : 48, exitCount: 83})
    items$.next(items);
    return of(result);
  });

  let getAllGatesSpy = jasmine.createSpy().and.callFake((input: GetAllDto) => {
    let list$  = items$.pipe(map(items => {
      let result = new GetAllGatesDto();
      result.totalCount = items.length;
      result.items = items;
      return result;
    }))
    return list$;
  });

  beforeEach(async () => {
    const result = await render(GateComponent, {
      declarations : [],
      imports: [GateComponent,
        ReactiveFormsModule,
        CommonModule,
        NgxsModule.forRoot([GateState]),
        HttpClientTestingModule ],
      providers: [{ provide: MessageService },
        {
          provide : GateService,
          useValue : {
            create : createGateSpy,
            getAll : getAllGatesSpy
          }
        }
      ]
    });
    
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = result.fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'createOrEditGate').and.callThrough();
    spyOn(component, 'createGate').and.callThrough();
    spyOn(component, 'updateGate').and.callThrough();
    spyOn(component, 'editGate').and.callThrough();
    spyOn(component, 'deleteGate').and.callThrough();
    spyOn(component, 'pageChanged').and.callThrough();
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

  it('process flow check',  async () => {

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
    
    expect(component.selectedGateId).toBeFalsy();    
    expect(component.gateFormGroup.controls['name'].value).toBe('GateAA');

    // Submit form
    await userEvent.click(submit);

    // Checking method called
    expect(component.createOrEditGate).toHaveBeenCalled();
    expect(component.createGate).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();

    expect(store.selectSnapshot(GateState.getLastCreatedGate).id).toBe('gateId');
    expect(store.selectSnapshot(GateState.getLastCreatedGate).name).toBe('gateName');     

    expect(component.gateFormGroup.controls['name'].value).toBe(null);

    expect(component.lastCreatedGate.id).toBe('gateId');
    expect(component.lastCreatedGate.name).toBe('gateName');

    expect(component.gates.length == 2).toBeTruthy();
    expect(component.gates.filter(p => p.id == 'gateDetailsId')[0].entryCount == 78).toBeTruthy();
    expect(component.gates.filter(p => p.id == 'gateDetailsId')[0].exitCount == 80).toBeTruthy();
    expect(component.gates.filter(p => p.id == 'gateDetailsId2')[0].id).toBe('gateDetailsId2');
    expect(component.gates.filter(p => p.id == 'gateDetailsId2')[0].name).toBe('gateDetailsName2');
  });

});
