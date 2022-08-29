import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [UserComponent, AddEditUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
