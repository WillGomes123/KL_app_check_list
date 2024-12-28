import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocacaoPage } from './locacao.page';

const routes: Routes = [
  {
    path: '',
    component: LocacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocacaoPageRoutingModule {}
