import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuinchoPageRoutingModule } from './guincho-routing.module';

import { GuinchoPage } from './guincho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuinchoPageRoutingModule
  ],
  declarations: [GuinchoPage]
})
export class GuinchoPageModule {}
