import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [{ path: '', component: ProfileComponent , data: { headerTitle: 'Profile' }},
  { path: 'change-password', component: ChangePasswordComponent, data: { headerTitle: 'Change Password' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
