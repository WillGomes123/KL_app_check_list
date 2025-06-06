import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { LocacaoModel } from 'src/app/model/locacaoModel';
import { ApiKlService } from 'src/app/services/api-kl.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.page.html',
  styleUrls: ['./atendimento.page.scss'],
})
export class AtendimentoPage {

  public usuario: any;
  public placa_car: string = '';
  public km_carro: any;
  public km_anterior: any;
  public adesivo: any;
  public procedencia: string | undefined;
  public observacao: string = '';
  public locacao = new LocacaoModel();
  public listaCondutores: any;
  public diferencakm = 0;
  public dados: any;
  public pesquisado = false;

  constructor(public navCtrl: NavController, public loadingController: LoadingController,
    public apiKlService: ApiKlService, public toastService: ToastService) {
  }

  ionViewDidEnter() {
    this.apiKlService.getStorageKL('atendimento').then(result => {
      this.locacao = result;
      this.listaCondutores = result.condutores;
    });
    this.apiKlService.getStorageKL("check").then((user: any) => {
      this.usuario = user;
    });
  }

  pesquisarKM() {
    this.diferencakm = this.km_carro - this.locacao.oleo_km_car;
  }
  async pesquisarCarro() {
    if ((this.placa_car != undefined || this.placa_car != '') && this.placa_car.length > 6) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Por favor, espere...',
        duration: 2000,
        backdropDismiss: true
      });
      await loading.present();

      this.apiKlService.pesquisarLocacao(this.placa_car).subscribe(data => {
        if (data.status != false) {
          this.dados = data;
          console.log(JSON.stringify(data));
        } else {
          this.toastService.showError('Nada encontrado');
        }
        loading.dismiss();
      });
    } else {
      this.dados = false;
    }
  }

  async salvarAtendimento() {
    if (this.km_carro > this.locacao.oleo_km_car) {

      const loading = await this.loadingController.create({
        message: 'Por favor, espere...',
        duration: 2000,
        backdropDismiss: true
      });
      await loading.present();
      if ((this.locacao.placa_car != undefined || this.locacao.placa_car != '') && this.locacao.placa_car.length > 6) {
        if (this.diferencakm > 0) {
          if ((this.procedencia != undefined || this.procedencia != '')) {
            let params = {
              placa_car: this.locacao.placa_car,
              id_cliente: this.locacao.id_cli,
              id_usuario: this.usuario.id_usu,
              km_carro: this.km_carro,
              adesivo: this.adesivo,
              procedencia: this.procedencia,
              observacao: this.observacao
            }

            this.apiKlService.salvaAtendimento(params).subscribe(data => {
              if (data.status != false) {
                this.toastService.showSucess(data.message);
                this.navCtrl.navigateRoot('/tabs/kl_locacao');
                loading.dismiss();
              } else {
                loading.dismiss();
                this.toastService.showError(data.message);
              }

              loading.dismiss();
            });
          } else {
            this.toastService.showError('Prencha o procedimento');
          }
        } else {
          alert('Quilometragem acima do permetido, O veículo deve ser encaminhado imediatamente para a revisão.');
          loading.dismiss();
        }
      } else {
        this.toastService.showError('Prencha a placa');
      }
    } else {
      alert('Quilometragem atual não pode ser menor, que a quilometragem anterior.');
    }
  }

}
