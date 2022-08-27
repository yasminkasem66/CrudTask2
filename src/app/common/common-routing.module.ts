import { CommonindexComponent } from './commonindex.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [
  {
    path: '',
    component: CommonindexComponent,
    children: [
      { path: '', component: MainContentComponent },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then(
            (m) => m.UserModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonLayoutRoutingModule { }
