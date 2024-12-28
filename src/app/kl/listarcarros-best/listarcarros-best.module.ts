import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarcarrosBestPageRoutingModule } from './listarcarros-best-routing.module';

import { ListarcarrosBestPage } from './listarcarros-best.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarcarrosBestPageRoutingModule
  ],
  declarations: [ListarcarrosBestPage]
})
export class ListarcarrosBestPageModule {}
