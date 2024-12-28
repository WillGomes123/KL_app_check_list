import { Component } from '@angular/core';
import { ApiKlService } from '../services/api-kl.service';
import { ApiMerronitService } from '../services/api-merronit.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
tipoLogin: any;
  constructor(public apiKlService: ApiKlService, public apiMerronitService: ApiMerronitService) {}
ionViewDidEnter(){
  this.apiKlService.getStorageKL('tipo_login').then(value => {
   if(value != null) {
    this.tipoLogin = value;
    console.log(this.tipoLogin)
   }
  });
  this.apiMerronitService.getStorageMERRONIT('tipo_login').then(value => {
    if(value != null) {
     this.tipoLogin = value;
     console.log(this.tipoLogin)
    }
   });
}
}
