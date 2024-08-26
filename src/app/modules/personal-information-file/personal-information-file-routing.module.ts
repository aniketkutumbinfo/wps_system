import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { RfaListComponent } from './RFA/rfa-list/rfa-list.component';
import { RfaViewComponent } from './RFA/rfa-view/rfa-view.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'rfa-list', component: RfaListComponent },
  { path: 'rfa-view/:id', component: RfaViewComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' }  // Use relative path
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalInformationFileRoutingModule { }
