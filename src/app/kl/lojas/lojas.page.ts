import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { ArquivoModel } from 'src/app/model/arquivoModel';
import { ChecklistModel } from 'src/app/model/checklistModel';
import { LocacaoModel } from 'src/app/model/locacaoModel';
import { ApiKlService } from 'src/app/services/api-kl.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.page.html',
  styleUrls: ['./lojas.page.scss'],
})
export class LojasPage implements OnInit {
  public usuario: any;
  public car: any = [];
  public car2: any = [];
  public carros: [] = [];
  public id: any;
  id_car: any;
  public placa_car!: string;
  public id_carro!: number;
  public modelo_car!: string;
  public cor_car!: string;
  public nome_loj_esta!: string;
  public listaCarBest: any = [];

  constructor(
    public nav: NavController, public loadingController: LoadingController,
    public apiKlService: ApiKlService, public toastService: ToastService,
    public plt: Platform, public modalController: ModalController,
    public alertCtrl: AlertController, private navCtrl: NavController, private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.apiKlService.getStorageKL("check").then((user: any) => {
      this.usuario = user.id_usu;
      console.log('usuario', this.usuario);
    });
    this.LoadingCarros();
    //this.LoadingCarrosBest();
  }

  async LoadingCarros() {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    console.log('usuario sendo enviado', this.usuario);
    await this.apiKlService.contagemCarros(this.usuario).subscribe(async (data: any) => {
      //this.toastService.showError(data.message);
      if (data.status == false) {
        console.log('ocorreu erro');
        console.log('mensagem de erro', data.message);
      } else {
        await this.apiKlService.setStorageKL('dados', data);
        this.car = data;
        console.log('carros praça 14', this.car)
      }

    })

  }

  async LoadingCarros2() {
    await this.apiKlService.setStorageKL('dados', this.car);
    this.navCtrl.navigateBack('listacar', this.car);
  }
  async LoadingCarrosBest2() {
    await this.apiKlService.setStorageKL('dadosBest', this.car2);
    this.navCtrl.navigateBack('listarcarros-best', this.car2);
  }

  voltar() {
    this.router.navigate(['locacao'])
  }


  async LoadingCarrosBest() {
    const loading = await this.loadingController.create({
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    await this.apiKlService.buscaCarroBest(this.usuario).subscribe((data) => {
      this.listaCarBest = data;
      console.log("carros da best", this.listaCarBest)
    })
  }

}
