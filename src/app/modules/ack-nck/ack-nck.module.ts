import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AckNckRoutingModule } from './ack-nck-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AckNckRoutingModule
  ]
})
export class AckNckModule { }
