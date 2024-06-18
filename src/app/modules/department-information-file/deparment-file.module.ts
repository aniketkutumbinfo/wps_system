import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeparmentFileRoutingModule } from './deparment-file-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    DeparmentFileRoutingModule,
    SharedModule
  ]
})
export class DeparmentFileModule { }
