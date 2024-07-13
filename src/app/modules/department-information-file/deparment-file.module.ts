import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeparmentFileRoutingModule } from './deparment-file-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DifConfigComponent } from './dif-config/dif-config.component';
import { TransactionRecordsComponent } from './transaction-records/transaction-records.component';
import { AckNckListComponent } from './ack-nck-list/ack-nck-list.component';
import { AckNckDetailComponent } from './ack-nck-detail/ack-nck-detail.component';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    CreateComponent,
    DifConfigComponent,
    TransactionRecordsComponent,
    AckNckListComponent,
    AckNckDetailComponent
  ],
  imports: [
    CommonModule,
    DeparmentFileRoutingModule,
    SharedModule
  ]
})
export class DeparmentFileModule { }
