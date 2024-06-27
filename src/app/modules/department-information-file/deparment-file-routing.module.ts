import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { DifConfigComponent } from './dif-config/dif-config.component';
import { TransactionRecordsComponent } from './transaction-records/transaction-records.component';

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
