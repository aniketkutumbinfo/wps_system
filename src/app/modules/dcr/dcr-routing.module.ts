import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { TransactionRecordsComponent } from './transaction-records/transaction-records.component';
import { ViewComponent } from './view/view.component';
import { DcrConfigComponent } from './dcr-config/dcr-config.component';
import { AckAckDetailComponent } from './ack-ack-detail/ack-ack-detail.component';
import { AckAckListComponent } from './ack-ack-list/ack-ack-list.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent
  },
  {
    path: 'view/:id', component: ViewComponent
  },
  {
    path: 'config', component: DcrConfigComponent
  },
  {
    path: 'transaction', component: TransactionRecordsComponent
  },
  {
    path: 'ack-nck', component: AckAckListComponent
  },
  {
    path: 'ack-nak/:id', component: AckAckDetailComponent
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
