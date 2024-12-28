import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastController) { }
  showSucess(message: string) {
     this.show(message, 'success', 'sucesso');
  }

  showError(message: string) {
    this.show(message, 'danger', 'erro');
    }

  private async show(message: string, color: string, header: string ) {
    const toast = await this.toast.create({
      // header: header,
       message: message,
       color: color,
       position: 'middle',
       duration: 3000,
    });
    toast.present();
  }

}


