import { ModalController, NavController, Platform } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad'; 
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';



@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent {

  @ViewChild('signature')
  signaturePad: SignaturePadComponent | undefined;
  image: any;
  altura: number = 200;
  largura: number = 700;

 constructor(public modalController: ModalController, public nav: NavController, platform: Platform,
    private screenOrientation: ScreenOrientation
    ) {
   this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

   platform.ready().then(() => {
    this.largura =  platform.width()
     this.altura =  platform.height()

   })


  }
  public signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': this.largura,
    'canvasHeight': this.altura
  };
  ionViewDidLoad() {
    this.signaturePad?.set('minWidth', 2); // set szimek/signature_pad options at runtime
    //this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    this.image = this.signaturePad?.toDataURL();
  }

  drawStart() {
    this.image = this.signaturePad?.toDataURL();
  }

  limpar() {
    this.image = false
    this.signaturePad?.clear(); // invoke functions from szimek/signature_pad API
  }
  cancelar() {
    this.modalController.dismiss();
  }

  async salvar() {
    if (!this.signaturePad?.isEmpty()) {
      await this.modalController.dismiss(this.image);

    } else {
      alert('Assinatura Obrigatoria!');
    }
  }

}