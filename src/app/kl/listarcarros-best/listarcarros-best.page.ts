import { Component, OnInit } from '@angular/core';
import { ApiKlService } from 'src/app/services/api-kl.service';
import { LoadingController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { createWorker } from 'tesseract.js';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ArquivoModel } from 'src/app/model/arquivoModel';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-listarcarros-best',
  templateUrl: './listarcarros-best.page.html',
  styleUrls: ['./listarcarros-best.page.scss'],
})
export class ListarcarrosBestPage implements OnInit {
  usuario: any;
  listaCarrosBest: any = [];
  qtdTotal: any;
  placa: any;
  obs_cont: any;


  constructor(private router: Router, public loadingController: LoadingController, public apiKlService: ApiKlService,
    public toastService: ToastService, public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  voltar() {
    this.router.navigate(['lojas']);
  }


  ionViewDidEnter() {

    this.apiKlService.getStorageKL("check").then((user: any) => {
      this.usuario = user.id_usu;
      console.log('usuario', this.usuario);
    });

    this.LoadingCarrosBest();

  }


  async LoadingCarrosBest() {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    console.log("usuario enviado", this.usuario);
    if (this.usuario != undefined || this.usuario != null) {
      await this.apiKlService.buscaCarroBest(this.usuario).subscribe(async (data: any) => {
        this.listaCarrosBest = data;
        console.log("carros loja bestCar", this.listaCarrosBest);
      });
      await this.QtdTotal();
    } else {

    }
  }

  async QtdTotal() {
    await this.apiKlService.totalCarBest(this.usuario).subscribe(data => {
      this.qtdTotal = data;
      console.log("quantidade total de carros best", this.qtdTotal)
    })
  }

  async contaCar(carros: { id_car: any; id_loj: any; }) {
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

            this.apiKlService.AtualizaCarBest2(carros.id_car, this.usuario, carros.id_loj, data.obs_cont).subscribe((data: any) => {
              if (data.status != false) {
                this.toastService.showSucess(data.message);
              }
            });
            await this.LoadingCarrosBest();
            await this.QtdTotal();
          },
        },
      ],
    });

    await alert.present();


  }

  async AtualizaCar(carros: { id_car: any; id_loj: any; }) {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    await this.apiKlService.AtualizaCarBest(carros.id_car, this.usuario, carros.id_loj).subscribe(async (data) => {
      if (data != false) {
        this.toastService.showSucess(data.message);
        await this.LoadingCarrosBest();
      }
      console.log("carro contado", data);
    })
    this.LoadingCarrosBest();
    this.QtdTotal();
  }

  async buscarCarro() {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    this.apiKlService.buscaCarroBestPlaca(this.placa).subscribe((data) => {
     if (data.status != false) {
        this.toastService.showSucess('carro encontrado');
        console.log("carro encontrado");
        this.listaCarrosBest = data;
      }else if(data.status == false){
        this.toastService.showError('carro não encontrado');
      }else{
        this.LoadingCarrosBest();

      }

    })
  }
}
