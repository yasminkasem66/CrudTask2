import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path:'', component: UserComponent},
  { path:'add', component: AddEditUserComponent},
  { path:'edit/:id', component: AddEditUserComponent},
  { path:'**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
