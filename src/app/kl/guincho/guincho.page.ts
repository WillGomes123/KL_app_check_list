
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiKlService } from 'src/app/services/api-kl.service';

@Component({
  selector: 'app-guincho',
  templateUrl: './guincho.page.html',
  styleUrls: ['./guincho.page.scss'],
})
export class GuinchoPage  {
  locacoes: any = [];
  placa_car: string | undefined;
  usuario: any;
  nome_usu:any;
  listaCondutores = [];
  id: any;

  ativo = false;
  constructor(
    private navCtrl: NavController, public loadingController: LoadingController,
    private apiKlService: ApiKlService) { }

  ionViewDidEnter() {
    this.pesquisarLocacao();
    this.apiKlService.getStorageKL("check").then((user: any) => {
      this.usuario = user.id_usu;
      this.nome_usu=user.nome_usu;

      console.log('usuario', this.usuario);
    });

  }

  contar() {
    this.navCtrl.navigateBack('lojas');
  }


  async pesquisarLocacao() {
    if (this.placa_car === undefined || this.placa_car === '') {
      //desativado para teste
     this.locacaoDia();
    } else {
      const loading = await this.loadingController.create({
        message: 'Carregando...',
        duration: 2000
      });
      await loading.present();
      this.apiKlService.pesquisarLocacao(this.placa_car).subscribe((data: any) => {
        if (data.status !== false) {
          loading.dismiss();
          this.locacoes = data;
          console.log(this.locacoes);
          this.ativo = true;
        } else {
          loading.dismiss();
          this.locacoes = [];
          this.ativo = false;
        }
      });
    }
  }
  async locacaoDia() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 1000,
      translucent: true,
      backdropDismiss: true,
    });
    loading.present();
    // this.locacoes = [];
    //desativado para teste
    this.apiKlService.locacaoDia(this.usuario).subscribe((data: any) => {
      if (data.status !== false) {
        loading.dismiss();
        this.locacoes = data;
        console.log(this.locacoes);
        this.ativo = true;

      } else {
        loading.dismiss();
        this.locacoes = [];
        this.ativo = false;
      }
    }, error => console.log(error));
  }


  async fazerChecklist(locacao: { id_Loc: number; id_car: number; }, tipo_check: string) {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      duration: 1000,
      translucent: true,
      backdropDismiss: true
    });
    await loading.present();
    let dados = {
      locacao: locacao,
      tipo_check: tipo_check
    };
    this.apiKlService.pesquisaChecklist_guincho(locacao.id_Loc, locacao.id_car, tipo_check).subscribe((data: any) => {
      if (data.status === false) {
        loading.dismiss();
        this.apiKlService.setStorageKL('dadosParams', dados);
        this.navCtrl.navigateRoot('tabs/kl_checklist_guincho');

      } else {
        loading.dismiss();
        alert('CheckList Não Pode Ser Refeito!');
        // this.presentConfirm(dados, data);
      }
    });
  }

  atendimento(item: any) {
    this.apiKlService.setStorageKL('atendimento', item);
    this.navCtrl.navigateBack('/tabs/kl_atendimento');
  }


  verTodosChecklist(id_Loc: any) {
    this.apiKlService.setStorageKL('id_loc_check', id_Loc);
    this.navCtrl.navigateBack('tabs/kl_historico');

  }
  atualiza() {
    this.pesquisarLocacao();
  }
  sair() {
    this.apiKlService.removeStorageKL('check');
    this.navCtrl.navigateRoot('/login');
  }
}


