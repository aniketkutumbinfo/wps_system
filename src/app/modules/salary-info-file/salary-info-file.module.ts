import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryInfoFileRoutingModule } from './salary-info-file-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddFileComponent } from './add-file/add-file.component';


@NgModule({
  declarations: [
    ListComponent,
    AddFileComponent
  ],
  imports: [
    CommonModule,
    SalaryInfoFileRoutingModule,
    SharedModule
  ]
})
export class SalaryInfoFileModule { }
