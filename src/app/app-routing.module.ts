import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'common',
    loadChildren: () =>
      import('./common/common.module').then((m) => m.CommonLayoutModule),
  },
  {
    path: '**',
    redirectTo: 'common',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
