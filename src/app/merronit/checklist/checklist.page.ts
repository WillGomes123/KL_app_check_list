import { ToastService } from './../../services/toast.service';
import { Component, ViewChild } from '@angular/core';
import {
  LoadingController,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { ArquivoModel } from 'src/app/model/arquivoModel';
import { ChecklistModel } from 'src/app/model/checklistModel';
import { ApiMerronitService } from 'src/app/services/api-merronit.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LocacaoModel } from 'src/app/model/locacaoModel';
import { SignatureComponent } from 'src/app/components/signature/signature.component';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage {
  @ViewChild('fixedContainer') fixedContainer: any;
  locacao = new LocacaoModel();
  image: any;
  image2: any = [];

  public photos: Array<ArquivoModel> = [];
  public id_checklist: any;
  public imagemFrente!: string;
  public imagemTraseira!: string;
  public imagemLateral1!: string;
  public imagemLateral2!: string;
  public imagemDocumento!: string;
  public imagemAvaria!: string;

  public imagemFrenteChecked: boolean = false;
  public imagemTraseiraChecked: boolean = false;
  public imagemLateral1Checked: boolean = false;
  public imagemLateral2Checked: boolean = false;
  public imagemDocumentoChecked: boolean = false;
  public imagemAvariaChecked: boolean = false;

  public checklist = new ChecklistModel();
  public cliente: any;
  public condutores: any;
  public idCliente!: number;
  public usuario: any;
  params = { id_locacao: 0, id_usuario: 0, tipo_check: "", id_carro: 0 };

  isSubmitted = false;

  constructor(
    public navCtrl: NavController,
    public apiMerronitService: ApiMerronitService,
    public toast: ToastService,
    public plt: Platform,
    public modalCtrl: ModalController,
    private iab: InAppBrowser,
    public loadingController: LoadingController
  ) { }

  ionViewDidEnter() {
    this.apiMerronitService.getStorageMERRONIT('check_merronit').then(user => {
      this.usuario = user.id_usu;
      console.log(this.usuario);
    });
    this.apiMerronitService.getStorageMERRONIT('dadosParams').then((dadosLoc) => {
      this.checklist.oleo_km_car = dadosLoc.locacao.oleo_km_car;
      this.checklist.tipo_car = dadosLoc.locacao.tipo_car;
      this.checklist.id_locacao = dadosLoc.locacao.id_Loc;
      this.checklist.id_carro = dadosLoc.locacao.id_car;
      this.checklist.tipo_check = dadosLoc.tipo_check;
      this.checklist.id_modelo_car = dadosLoc.locacao.id_modelo_car;
      //  this.id_modelo = dadosLoc.locacao.id_modelo_car;
      this.locacao.nome_cli = dadosLoc.locacao.nome_cli;
      this.locacao.id_cli = dadosLoc.locacao.id_cli;
      this.checklist.id_usuario = this.usuario;

      this.params.id_locacao = this.checklist.id_locacao;
      this.params.id_usuario = this.usuario;
      this.params.tipo_check = this.checklist.tipo_check;
      this.params.id_carro = this.checklist.id_carro;
      this.apiMerronitService.salvarChecklist(this.params).subscribe(data => {
        if (data.status == false) {
          this.toast.showError('Erro ao salvar o CheckList');
        } else {
          this.id_checklist = data.id_checklist;
          this.checklist.id_checklist = data.id_checklist;
        }
      }, error => {
        console.log(error);
      });
      this.apiMerronitService.pesquisarCondutores(this.checklist.id_locacao).subscribe((data) => {
        if (data.status != false) {
          this.condutores = data;
        } else {
          this.condutores = false;
        }
      });
      this.photos = [];
    });
    this.clear();
  }

  async takePhoto(tipo: string) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    let base64Image = "data:image/jpeg;base64," + image.base64String;
    let arquivo = new ArquivoModel();
    arquivo.imagem = base64Image;
    arquivo.nome_img = this.createFileName();
    arquivo.pasta_arquivo = "checklist_fotos";
    arquivo.formato = "jpeg";
    arquivo.momento_fotos = this.checklist.tipo_check;
    arquivo.descricao_fotos = tipo;
    //this.id_checklist 265
    arquivo.id_checklist = this.id_checklist;
    arquivo.id_car = this.checklist.id_carro;
    if (tipo == 'frente') {
      this.imagemFrente = 'assets/imgs/carregando.png';
      this.imagemFrenteChecked = false;
    } else if (tipo == 'traseira') {
      this.imagemTraseira = 'assets/imgs/carregando.png';
      this.imagemTraseiraChecked = false;
    } else if (tipo == 'lateral1') {
      this.imagemLateral1 = 'assets/imgs/carregando.png';
      this.imagemLateral1Checked = false;
    } else if (tipo == 'lateral2') {
      this.imagemLateral2 = 'assets/imgs/carregando.png';
      this.imagemLateral2Checked = false;
    } else if (tipo == 'documento') {
      this.imagemDocumento = 'assets/imgs/carregando.png';
      this.imagemDocumentoChecked = false;
    } else if (tipo == 'avaria') {
      this.imagemAvaria = 'assets/imgs/carregando.png';
      this.imagemAvariaChecked = false;
    }
    this.photos.push(arquivo);
    this.apiMerronitService.enviarImagen(arquivo).subscribe((data) => {
      if (data.status == false) {
        this.toast.showError('Aconteceu um erro ao enviar as fotos');
      } else {
        // this.presentToast('Foto salva');
        if (tipo == 'frente') {
          this.imagemFrente = base64Image;
          this.imagemFrenteChecked = true;
        } else if (tipo == 'traseira') {
          this.imagemTraseira = base64Image;
          this.imagemTraseiraChecked = true;
        } else if (tipo == 'lateral1') {
          this.imagemLateral1 = base64Image;
          this.imagemLateral1Checked = true;
        } else if (tipo == 'lateral2') {
          this.imagemLateral2 = base64Image;
          this.imagemLateral2Checked = true;
        } else if (tipo == 'documento') {
          this.imagemDocumento = base64Image;
          this.imagemDocumentoChecked = true;
        } else if (tipo == 'avaria') {
          this.imagemAvaria = base64Image;
          this.imagemAvariaChecked = true;
        }
      }
    });
  }

  async salvarChecklist() {
    this.isSubmitted = true;
    const loader = await this.loadingController.create({ backdropDismiss: true, duration: 2000, });
    await loader.present();
    if (this.checklist.km_check !== undefined && this.checklist.km_check !== null) {
      if (this.checklist.gasolina !== undefined && this.checklist.gasolina !== null) {
        //.length > 4
        if (this.photos) {
          if (this.image !== undefined || this.image2 !== undefined) {
            if (this.checklist.id_locacao > 0 && this.checklist.id_locacao !== undefined) {
              this.checklist.id_usuario = this.usuario;
              this.apiMerronitService.atualizarChecklist(this.checklist).subscribe((data: any) => {
                if (data.status == true) {
                  loader.dismiss();
                  this.enviarAssinaturaCliente();
                } else {
                  loader.dismiss();
                  this.toast.showError('Erro ao atualizar checklist');
                }
              });
            } else {
              this.toast.showError('O número de contrato de locação não pode ser vazio');
            }
          } else {
            loader.dismiss();
            this.toast.showError('Falta assinatura do cliente');
          }
        } else {
          loader.dismiss();
          this.toast.showError('Falta foto do veículo ');
        }
      } else {
        loader.dismiss();
        this.toast.showError('Falta porcentagem da gasolina');
      }
    } else {
      loader.dismiss();
      this.toast.showError('Falta quilometragem do veículo');
    }
  }

  enviarAssinaturaCliente() {
    if (this.image != undefined || this.image != '' || this.image != null) {
      var data2 = {
        imagem: this.image,
        nome_img: this.createFileNameAssinatura(),
        pasta_arquivo: 'assinaturas',
        formato: 'png',
        tipo_assinante: 'cliente',
        id_assinante: this.locacao.id_cli,
        momento_assinatura: this.checklist.tipo_check,
        id_checklist: this.id_checklist,
      };
      this.apiMerronitService.enviarImagen(data2).subscribe((data2) => {
        if (data2.status != true) {
          this.toast.showError('Aconteceu um erro ao salvar assinatura');
        } else {
          this.enviaAssinaturaCondutor();
          alert('checkList salvo com sucesso');
          this.navCtrl.navigateRoot('tabs/merronit_home');
        }
      });
    }
  }

  enviaAssinaturaCondutor() {
    //Salva assinatura dos condutores
    if (this.image2 != undefined || this.image2 != null) {
      this.image2.forEach((value: any, key: any) => {
        const data2 = {
          imagem: value,
          nome_img: this.createFileNameAssinatura(),
          pasta_arquivo: 'assinaturas',
          formato: 'png',
          tipo_assinante: 'condutor',
          id_assinante: key,
          momento_assinatura: this.checklist.tipo_check,
          id_checklist: this.id_checklist,
        };
        console.log(data2);
        this.apiMerronitService.enviarImagen(data2).subscribe((data2: any) => {
          if (data2.status != true) {
            this.toast.showError('Aconteceu um erro ao salvar assinatura');
          } else {
            this.toast.showSucess('Assinatura condutor Salva com Sucesso!');
          }
        });
      });
    }
    this.enviaEmail();
  }

  enviaEmail() {
    this.apiMerronitService.enviarEmail({ id_loc: this.checklist.id_locacao, id_checklist: this.id_checklist }).subscribe((data) => {
      if (data.status != true) {
        this.toast.showError('Erro ao enviar email para o Cliente');
      } else {
        // this.presentToast('Email enviado com sucesso!');
        // this.iab.create('https://klrentacar.com.br/sistemakl/documentos/checklist/' + this.locacao.locacao.id_Loc);
        this.navCtrl.navigateRoot('tabs/merronit_home');
      }
    });
  }

  verChecklist() {
    this.iab.create(
      this.apiMerronitService.url +
      '../documentos/checklist/' +
      this.checklist.id_locacao
    );
  }

  async assinaturaCliente(id: number) {
    const modal = await this.modalCtrl.create({
      component: SignatureComponent,
      componentProps: { id: id },
    });

    modal.onDidDismiss().then((data: any) => {
      this.image = data['data'];
      this.idCliente = id;
    });
    return await modal.present();
  }

  async assinaturaCondutor(id: string | number) {
    const modal = await this.modalCtrl.create({
      component: SignatureComponent,
      componentProps: { id: id },
    });
    modal.onDidDismiss().then((data: any) => {
      this.image2[id] = data['data'];
    });
    return await modal.present();
  }

  assinaturaFuncionario(id: any) {
    /*let profileModal = this.modalCtrl.create(AssinaturasPage, { id: id });
    profileModal.onDidDismiss(data => {
      this.image2[id] = data;
    });
    profileModal.present();
  }*/
  }
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpeg';
    return newFileName;
  }

  private createFileNameAssinatura() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + '.png';
    return newFileName;
  }
  clear() {
    this.checklist = new ChecklistModel();
    this.imagemFrente = '';
    this.imagemTraseira = '';
    this.imagemLateral1 = '';
    this.imagemLateral2 = '';
    this.imagemDocumento = '';
    this.imagemAvaria = '';
    this.image = '';
    this.image2 = [];
    this.imagemFrenteChecked = false;
    this.imagemTraseiraChecked = false;
    this.imagemLateral1Checked = false;
    this.imagemLateral2Checked = false;
    this.imagemDocumentoChecked = false;
    this.imagemAvariaChecked = false;
  }
}
