import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { DcrConfigComponent } from './dcr-config/dcr-config.component';
import { AckAckDetailComponent } from './ack-ack-detail/ack-ack-detail.component';
import { AckAckListComponent } from './ack-ack-list/ack-ack-list.component';
import { TransactionRecordsComponent } from './transactions/transaction-records/transaction-records.component';
import { UpdateTransactionComponent } from './transactions/update-transaction/update-transaction.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent, data: { headerTitle: 'DCR' }
  },
  {
    path: 'view/:id', component: ViewComponent, data: { headerTitle: 'DCR' }
  },
  {
    path: 'config', component: DcrConfigComponent, data: { headerTitle: 'DCR Config' }
  },
  {
    path: 'transaction', component: TransactionRecordsComponent, data: { headerTitle: 'DCR Transcation' }
  },
  {
    path: 'transaction/:id', component: UpdateTransactionComponent, data: { headerTitle: 'DCR Transcation' }
  },
  {
    path: 'ack-nck', component: AckAckListComponent, data: { headerTitle: 'DCR ACK NAK' }
  },
  {
    path: 'ack-nak/:id', component: AckAckDetailComponent, data: { headerTitle: 'DCR ACK NAK' }
  },
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DcrRoutingModule { }
