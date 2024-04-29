import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SifListComponent } from './sif-list/sif-list.component';
import { SifDetailsComponent } from './sif-details/sif-details.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  },
  {
    path: 'list', component: ListComponent
  },
  {
    path: 'files', component: SifListComponent
  },
  {
    path: 'details/:fileName', component: SifDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryInfoFileRoutingModule { }
