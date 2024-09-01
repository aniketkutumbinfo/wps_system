import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { DifConfigComponent } from './dif-config/dif-config.component';
import { TransactionRecordsComponent } from './transactions/transaction-records/transaction-records.component';
import { AckNckListComponent } from './ack-nck-list/ack-nck-list.component';
import { AckNckDetailComponent } from './ack-nck-detail/ack-nck-detail.component';
import { UpdateTransactionComponent } from './transactions/update-transaction/update-transaction.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent, data: { headerTitle: 'DIF' }
  },
  {
    path: 'view/:id', component: ViewComponent, data: { headerTitle: 'DIF' }
  },
  {
    path: 'config', component: DifConfigComponent, data: { headerTitle: 'DIF Config' }
  },
  {
    path: 'transaction', component: TransactionRecordsComponent, data: { headerTitle: 'DIF Transcation' }
  },
  {
    path: 'transaction/:id', component: UpdateTransactionComponent, data: { headerTitle: 'DIF Transcation' }
  },
  {
    path: 'ack-nck', component: AckNckListComponent, data: { headerTitle: 'DIF ACK NAK' }
  },
  {
    path: 'ack-nak/:id', component: AckNckDetailComponent, data: { headerTitle: 'DIF ACK NAK' }
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
export class DeparmentFileRoutingModule { }
