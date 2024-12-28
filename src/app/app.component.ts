
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

import { ApiKlService } from './services/api-kl.service';
import { ApiMerronitService } from './services/api-merronit.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    public nav: NavController,
    public apiKlService: ApiKlService,
    public apiMerronitService: ApiMerronitService) {
       this.ionViewDidEnter();
    }
    
    ionViewDidEnter(){
     this.carregarkl();
      //this.carregarMer();
      
    }

  carregarkl() {
    this.apiKlService.getStorageKL("check").then(user => {
      if (user !== null) {
       console.log(user);
       if(user['usuario']['id_per_usu']!=40){
        this.nav.navigateRoot('tabs/kl_locacao');
      }else{
        this.nav.navigateRoot('tabs/kl_guincho');
      }

      } else {
        this.nav.navigateRoot('/login');
      }
    });
  }
  carregarMer() {
    this.apiMerronitService.getStorageMERRONIT('check_merronit').then(value => {
      if (value !== null) {
         alert('m1');
        this.nav.navigateRoot('/tabs/merronit_home');
      } else {
         alert('m2');
        this.nav.navigateRoot('/login');
      }
    });
  }
}
