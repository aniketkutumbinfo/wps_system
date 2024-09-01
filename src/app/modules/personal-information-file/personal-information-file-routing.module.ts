import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { RfaListComponent } from './RFA/rfa-list/rfa-list.component';
import { RfaViewComponent } from './RFA/rfa-view/rfa-view.component';

const routes: Routes = [
  { path: 'list', component: ListComponent, data: { headerTitle: 'PIF' } },
  { path: 'view/:id', component: ViewComponent, data: { headerTitle: 'PIF' } },
  { path: 'rfa-list', component: RfaListComponent, data: { headerTitle: 'RFA' } },
  { path: 'rfa-view/:id', component: RfaViewComponent, data: { headerTitle: 'RFA' } },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' }  // Use relative path
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalInformationFileRoutingModule { }
