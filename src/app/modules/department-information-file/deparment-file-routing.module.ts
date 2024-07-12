import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { DifConfigComponent } from './dif-config/dif-config.component';
import { TransactionRecordsComponent } from './transaction-records/transaction-records.component';
import { AckNckListComponent } from './ack-nck-list/ack-nck-list.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent
  },
  {
    path: 'view/:id', component: ViewComponent
  },
  {
    path: 'config', component: DifConfigComponent
  },
  {
    path: 'transaction', component: TransactionRecordsComponent
  },
  {
    path: 'ack-nck', component: AckNckListComponent
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
