import { ToastService } from './../../services/toast.service';
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ApiMerronitService } from 'src/app/services/api-merronit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  locacoes: any = [];
  placa_car!: string;
  usuario: any;
  listaCondutores = [];
  constructor(
    public navCtrl: NavController,
    public apiMerronitService: ApiMerronitService,
    public toast: ToastService,
    private alertCtrl: AlertController, public loadingController: LoadingController,
    private iab: InAppBrowser) {
  }
  ionViewDidEnter() {
    this.pesquisarLocacao();
  }

  async pesquisarLocacao() {
    if (this.placa_car == undefined || this.placa_car == '') {
      this.locacaoDia();
    } else {
      const loading = await this.loadingController.create({
        message: 'Por favor, espere...',
        duration: 2000,
        backdropDismiss: true,
      });
      await loading.present();
      this.apiMerronitService.pesquisarLocacao(this.placa_car).subscribe((data: any) => {
        if (data.status != false) {
          loading.dismiss();
          this.locacoes = data;
          console.log(this.locacoes);
        } else {
          loading.dismiss();
          this.locacoes = [];
          this.toast.showError('Nada encontrado');
        }
      });
    }
  }

  locacaoDia() {
    this.apiMerronitService.locacaoDia().subscribe((data: any) => {
      if (data.status != false) {
        this.locacoes = data;
      } else {
        this.locacoes = []
        this.toast.showError('Nada encontrado');
      }
    }, error => console.log(error));
  }


  async fazerChecklist(locacao: { id_Loc: number; id_car: number; }, tipo_check: string) {
    const loading = await this.loadingController.create({
      duration: 5000,
      message: 'Agurade...',
      translucent: true,
      backdropDismiss: true
    });
    await loading.present();
    const dados = {
      locacao: locacao,
      tipo_check: tipo_check
    }
    this.apiMerronitService.pesquisaChecklist(locacao.id_Loc, locacao.id_car, tipo_check).subscribe(data => {
      if (data.status == false) {
        loading.dismiss();
        loading.dismiss();
        this.apiMerronitService.setStorageMERRONIT('dadosParams', dados);
        this.navCtrl.navigateRoot('tabs/merronit_checklist');
      } else {
        loading.dismiss();
        alert("CheckList Não Pode Ser Refeito!");
        // this.presentConfirm(dados, data);
      }
    });
  }


  //metodo para atualiza
  atualizas(refresher: { complete: () => void; }) {
    this.apiMerronitService.getStorageMERRONIT("check").then(val => {
      this.usuario = val;
      this.pesquisarLocacao();
      console.log('atualiza');
    });
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  atualiza() {
    this.pesquisarLocacao();
  }

  verChecklist(id_Loc: string) {
    this.iab.create(this.apiMerronitService.url + '../documentos/checklist/' + id_Loc);
  }


  verTodosChecklist(id_Loc: any) {
    this.apiMerronitService.setStorageMERRONIT('id_loc_check', id_Loc);
    this.navCtrl.navigateBack('tabs/merronit_historico');

  }

  atendimento(item: any) {
    this.apiMerronitService.setStorageMERRONIT('dados', item);
    this.navCtrl.navigateBack('tabs/merronit_atendimento');
  }
  sair() {
    this.apiMerronitService.removeStorageMERRONIT('check_merronit');
    this.navCtrl.navigateRoot('/login')
  }
}

