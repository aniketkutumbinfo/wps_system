import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DcrRoutingModule } from './dcr-routing.module';
import { ViewComponent } from './view/view.component';
import { TransactionRecordsComponent } from './transaction-records/transaction-records.component';
import { AckAckDetailComponent } from './ack-ack-detail/ack-ack-detail.component';
import { AckAckListComponent } from './ack-ack-list/ack-ack-list.component';
import { DcrConfigComponent } from './dcr-config/dcr-config.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    TransactionRecordsComponent,
    AckAckDetailComponent,
    AckAckListComponent,
    DcrConfigComponent
  ],
  imports: [
    CommonModule,
    DcrRoutingModule,
    SharedModule
  ]
})
export class DcrModule { }
