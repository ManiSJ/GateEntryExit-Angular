import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { GateEntryService } from '../../services/gate-entry.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { GateEntryDto } from '../../models/gateEntry/gate-entry-dto';
import { GetAllDto } from '../../models/shared/get-all-dto';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { GateEntryState } from '../../state/gateEntry/gate-entry-state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DeleteGateEntry, GetAllGateEntry } from '../../state/gateEntry/gate-entry-action';
import { GateEntryExitComponent } from '../gate-entry-exit/gate-entry-exit.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-gate-entry',
  standalone: true,
  imports: [BsDatepickerModule,
    TimepickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationComponent,
    GateEntryExitComponent
  ],
  templateUrl: './gate-entry.component.html',
  styleUrl: './gate-entry.component.css'
})
export class GateEntryComponent implements OnInit, OnDestroy {
  
  @ViewChild(GateEntryExitComponent) gateEntryExitComponent!: GateEntryExitComponent;

  selectedGateEntryId : string | null = null;
  gateEntries : GateEntryDto[] = [];
  gateEntryFormGroup: FormGroup = this.formBuilder.group({});
  
  getAllDto : GetAllDto = new GetAllDto({skipCount: 0, maxResultCount : 5, sorting : ''});
  totalCount : number = 0;
  lastCreatedGateEntry : GateEntryDto = new GateEntryDto();
  lastUpdatedGateEntry : GateEntryDto = new GateEntryDto();

  @Select(GateEntryState.getAllGateEntry) gateEntries$!: Observable<GateEntryDto[]>;
  @Select(GateEntryState.getLastCreatedGateEntry) lastCreatedGateEntry$!: Observable<GateEntryDto>;
  @Select(GateEntryState.getLastUpdatedGateEntry) lastUpdatedGateEntry$!: Observable<GateEntryDto>;
  @Select(GateEntryState.getTotalCount) totalCount$!: Observable<number>;

  private unSubscribeGetAllGateEntry$ = new Subject<void>();
  private unSubscribeGetLastCreatedGateEntry$ = new Subject<void>();
  private unSubscribeGetLastupdatedGateEntry$ = new Subject<void>();
  private unSubscribeGetTotalCount$ = new Subject<void>();

  constructor(private store: Store,
    private messageService: MessageService,
    private formBuilder : FormBuilder){
      this.gateEntries$.pipe(takeUntil(this.unSubscribeGetAllGateEntry$)).subscribe(allGateEntry => this.gateEntries = allGateEntry);
      this.lastCreatedGateEntry$.pipe(takeUntil(this.unSubscribeGetLastCreatedGateEntry$))
        .subscribe(lastCreatedGate => this.lastCreatedGateEntry = lastCreatedGate);
      this.lastUpdatedGateEntry$.pipe(takeUntil(this.unSubscribeGetLastupdatedGateEntry$))
        .subscribe(lastUpdatedGate => this.lastUpdatedGateEntry = lastUpdatedGate);
      this.totalCount$.pipe(takeUntil(this.unSubscribeGetTotalCount$))
        .subscribe(totalCount => this.totalCount = totalCount);
    }  

  ngOnInit() : void{
    this.getGateEntries(this.getAllDto);
  }

  ngOnDestroy(): void {
    this.unSubscribeGetAllGateEntry$.next();
    this.unSubscribeGetLastCreatedGateEntry$.next();
    this.unSubscribeGetLastupdatedGateEntry$.next();
    this.unSubscribeGetTotalCount$.next();
  }

  getGateEntries(getAllDto : GetAllDto){
    this.store.dispatch(new GetAllGateEntry(getAllDto)).subscribe(() => {});
  }

  editGateEntry(gateEntry : GateEntryDto){    
    this.gateEntryExitComponent.editGateEntry({
      id : gateEntry.id,
      gateId : gateEntry.gateId,
      gateName : gateEntry.gateName,
      timeStamp : gateEntry.timeStamp,
      numberOfPeople : gateEntry.numberOfPeople
    });
  }

  deleteGateEntry(id : string){
    this.store.dispatch(new DeleteGateEntry(id)).subscribe(() => {
      this.getGateEntries(this.getAllDto);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully' });
    });
  }

  pageChanged(event: PageChangedEvent){
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    let input = new GetAllDto({skipCount: startItem, maxResultCount : 5, sorting : ''});
    this.getGateEntries(input);
  }
}
