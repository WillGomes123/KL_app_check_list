import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListacarPageRoutingModule } from './listacar-routing.module';

import { ListacarPage } from './listacar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListacarPageRoutingModule
  ],
  declarations: [ListacarPage]
})
export class ListacarPageModule {}
