import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RfrListComponent } from './rfr-list/rfr-list.component';
import { EditRfrComponent } from './edit-rfr/edit-rfr.component';
import { RfrDetailsComponent } from './rfr-details/rfr-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'list', pathMatch: 'full'
  },
  {
    path: 'list', component: ListComponent, data: { headerTitle: 'RFR' }
  },
  {
    path: 'files', component: RfrListComponent, data: { headerTitle: 'RFR' }
  },
  {
    path: 'details/:fileName', component: RfrDetailsComponent, data: { headerTitle: 'RFR' }
  },
  {
    path: 'ack-nck',
    loadChildren: () => import('./ack-nck/ack-nck.module').then(m => m.AckNckModule)
  },
];

@NgModule({
  declarations: [
    ListComponent,
    RfrListComponent,
    EditRfrComponent,
    RfrDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class RequestForRefundModule { }
