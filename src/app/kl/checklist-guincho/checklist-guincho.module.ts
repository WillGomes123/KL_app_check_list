import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistGuinchoPageRoutingModule } from './checklist-guincho-routing.module';

import { ChecklistGuinchoPage } from './checklist-guincho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistGuinchoPageRoutingModule
  ],
  declarations: [ChecklistGuinchoPage]
})
export class ChecklistGuinchoPageModule {}
