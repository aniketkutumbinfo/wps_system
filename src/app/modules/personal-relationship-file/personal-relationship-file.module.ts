import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRelationshipFileRoutingModule } from './personal-relationship-file-routing.module';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    PersonalRelationshipFileRoutingModule,
    SharedModule
  ]
})
export class PersonalRelationshipFileModule { }
