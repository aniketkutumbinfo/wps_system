import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ViewAhrAtrComponent } from './view-ahr-atr/view-ahr-atr.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'all', pathMatch:'full'
  },
  {
    path: 'all',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    ViewAhrAtrComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DatePipe
  ]
})
export class AckNckModule { }
