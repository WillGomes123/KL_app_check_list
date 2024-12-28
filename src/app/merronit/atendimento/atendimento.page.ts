import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { LocacaoModel } from 'src/app/model/locacaoModel';
import { ApiMerronitService } from 'src/app/services/api-merronit.service';

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

  constructor(
    public navCtrl: NavController, public loadingController: LoadingController,
    public apiMerronitService: ApiMerronitService, public toast: ToastService) {
  }

  ionViewDidEnter() {
    this.apiMerronitService.getStorageMERRONIT('check_merronit').then(value => {
      if (value != null) {
        this.usuario = value;
      }
    });

    this.apiMerronitService.getStorageMERRONIT('dados').then(result => {

      if (result != null) {
        this.locacao = result;
        this.listaCondutores = result.condutores;
      }

    });
  }

  pesquisarKM() {
    this.diferencakm = this.km_carro - this.locacao.oleo_km_car;
  }
  async pesquisarCarro() {
    if ((this.placa_car != undefined || this.placa_car != '') && this.placa_car.length > 6) {
      const loading = await this.loadingController.create({
        duration: 500,
        message: 'Buscando...',
        translucent: true,
        backdropDismiss: true
      });
      await loading.present();
      this.apiMerronitService.pesquisarLocacao(this.placa_car).subscribe(data => {
        if (data.status != false) {
          this.dados = data;
          console.log(JSON.stringify(data));
        } else {
          this.toast.showError('Nada encontrado');
        }
        loading.dismiss();
      });
    } else {
      this.dados = false;
    }
  }
  async salvarAtendimento() {
    if (this.km_carro > this.locacao.oleo_km_car) {
      let loader = await this.loadingController.create({
        message: 'Salvando dados. . Aguarde ...',
        backdropDismiss: true
      });
      loader.present();
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

            this.apiMerronitService.salvaAtendimento(params).subscribe((data: any) => {
              if (data.status != false) {
                loader.dismiss();
                this.toast.showSucess(data.message);
                this.navCtrl.navigateRoot('/tabs/merronit_home');
              } else {
                loader.dismiss();
                this.toast.showError(data.message);
              }

            });
          } else {
            this.toast.showError('Prencha o procedimento');
          }
        } else {
          alert('Quilometragem acima do permetido, O veículo deve ser encaminhado imediatamente para a revisão.');
          loader.dismiss();
        }
      } else {
        this.toast.showError('Prencha a placa');
      }
    } else {
      alert('Quilometragem atual não pode ser menor, que a quilometragem anterior.');
    }
  }

}

