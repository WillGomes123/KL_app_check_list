import { Component, OnInit } from '@angular/core';
import { ApiKlService } from 'src/app/services/api-kl.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { createWorker } from 'tesseract.js';
import { ArquivoModel } from 'src/app/model/arquivoModel';


@Component({
  selector: 'app-listacar',
  templateUrl: './listacar.page.html',
  styleUrls: ['./listacar.page.scss'],
})
export class ListacarPage implements OnInit {
  worker: Tesseract.Worker | undefined;
  workerReady = false;
  image: any;
  ocrResult?= '';
  captureProgress = 0;
  usuario: any;
  car: any;
  qtdCar: any
  placa: any;
  excluido: any;


  constructor(public apiKlService: ApiKlService, public loadingController: LoadingController, public toastService: ToastService,
    private router: Router, public alertController: AlertController
  ) { }

  ngOnInit() {
  }





  ionViewDidEnter() {

    this.apiKlService.getStorageKL("check").then((user: any) => {
      this.usuario = user.id_usu;
      console.log('usuario', this.usuario);
    });
    this.LoadingCarros();
    this.QtdCarros();

  }

  /* função listar carros por loja*/
  async LoadingCarros() {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    await this.apiKlService.contagemCarros(this.usuario).subscribe(async (data: any) => {
      if (data.status != false) {
        console.log("carros buscados");
      }
      this.car = data;
      console.log('carros', data);

    });
    this.QtdCarros();

  }
  async QtdCarros() {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    await this.apiKlService.contaCarros(this.usuario).subscribe(async (data: any) => {
      if (data.status != false) {
        this.qtdCar = data;
        console.log('Quantidade de carro na lsita', data);
      }
    })
  }
  async buscaCar() {

    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });

    await loading.present();
    this.apiKlService.buscaCarro(this.placa).subscribe((data: any) => {
      if (data.status != false) {
        this.car = data;
        console.log("carro encontrado", this.car)
      }
    })
  }

  async contaCar2(carros: { id_car: any; id_loj_esta: any; }) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Obeservação!',
      inputs: [
        {
          name: 'obs_cont',
          type: 'text',
          placeholder: 'Obs',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data: any) => {
            console.log('Confirm Cancel', data);
          },
        },
        {
          text: 'Contar',
          handler: async (data) => {
            const loading = await this.loadingController.create({
              message: 'Por favor, espere...',
              duration: 2000,
              backdropDismiss: true
            });
            await loading.present();
            console.log('dado sendo enviado', data);

            this.apiKlService.AtualizaCar2(carros.id_car, this.usuario, carros.id_loj_esta, data.obs_cont).subscribe((data: any) => {
              if (data.status != false) {
                this.toastService.showSucess(data.message);
              }
            });
            this.LoadingCarros();
            this.QtdCarros();
          },
        },
      ],
    });

    await alert.present();


  }

  async AtualizaCar(carros: { id_car: any; id_loj_esta: any; }) {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();

    this.apiKlService.AtualizaCar(carros.id_car, this.usuario, carros.id_loj_esta).subscribe(data => {
      console.log(data);
      this.excluido = data;

      console.log("carro excluid", this.excluido);
      if (data != false) {
        this.toastService.showSucess(data.message);
        this.LoadingCarros();
        this.QtdCarros();
      }
    })

  }

  voltar() {
    this.router.navigate(['lojas']);
  }

}
