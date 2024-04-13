import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryInfoFileRoutingModule } from './salary-info-file-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditSifInfoComponent } from './edit-sif-info/edit-sif-info.component';
import { DragDropDirective } from './list/drag-drop.directive';


@NgModule({
  declarations: [
    ListComponent,
    EditSifInfoComponent,
    DragDropDirective
  ],
  imports: [
    CommonModule,
    SalaryInfoFileRoutingModule,
    SharedModule
  ]
})
export class SalaryInfoFileModule { }
