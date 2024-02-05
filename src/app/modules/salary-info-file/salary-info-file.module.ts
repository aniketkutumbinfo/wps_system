import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryInfoFileRoutingModule } from './salary-info-file-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SalaryInfoFileRoutingModule
  ]
})
export class SalaryInfoFileModule { }
