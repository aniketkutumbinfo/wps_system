import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalInformationFileRoutingModule } from './personal-information-file-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RfaListComponent } from './RFA/rfa-list/rfa-list.component';
import { RfaViewComponent } from './RFA/rfa-view/rfa-view.component';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    RfaListComponent,
    RfaViewComponent,
  ],
  imports: [
    CommonModule,
    PersonalInformationFileRoutingModule,
    SharedModule
  ]
})
export class PersonalInformationFileModule { }
