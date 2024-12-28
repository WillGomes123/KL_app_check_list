import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarcarrosBestPage } from './listarcarros-best.page';

const routes: Routes = [
  {
    path: '',
    component: ListarcarrosBestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarcarrosBestPageRoutingModule {}
