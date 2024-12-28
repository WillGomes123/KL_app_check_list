import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistGuinchoPage } from './checklist-guincho.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistGuinchoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistGuinchoPageRoutingModule {}
