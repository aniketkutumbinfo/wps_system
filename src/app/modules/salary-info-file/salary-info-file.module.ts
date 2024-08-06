import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SalaryInfoFileRoutingModule } from './salary-info-file-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditSifInfoComponent } from './edit-sif-info/edit-sif-info.component';
import { SifListComponent } from './sif-list/sif-list.component';
import { SifDetailsComponent } from './sif-details/sif-details.component';


@NgModule({
  declarations: [
    ListComponent,
    EditSifInfoComponent,
    SifListComponent,
    SifDetailsComponent
  ],
  imports: [
    CommonModule,
    SalaryInfoFileRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class SalaryInfoFileModule { }
