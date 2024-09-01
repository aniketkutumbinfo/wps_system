import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [ 
  {
    path: 'list', component: ListComponent, data: { headerTitle: 'PRF' }
  },
  {
    path: 'view/:id', component: ViewComponent, data: { headerTitle: 'PRF' }
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
export class PersonalRelationshipFileRoutingModule { }
