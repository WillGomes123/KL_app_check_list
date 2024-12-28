import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuinchoPage } from './guincho.page';

const routes: Routes = [
  {
    path: '',
    component: GuinchoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuinchoPageRoutingModule {}
export class  GuinchoPageModule {}
