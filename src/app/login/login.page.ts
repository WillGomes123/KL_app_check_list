import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ChecklistModel } from '../model/checklistModel';
import { ApiKlService } from '../services/api-kl.service';
import { ApiMerronitService } from '../services/api-merronit.service';
import { ToastService } from '../services/toast.service';
import { ThemeService } from '../services/theme.service';

const themes: any = {
  autumn: {
    primary: '#28a745',
    light: '#f4f5f8',
    dark: '#000000'
  },
  neon: {
    primary: '#e46451',
    light: '#f4f5f8',
    dark: '#000000'
  }

};

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  tipoLogin = 'kl';
  usuario = new ChecklistModel();
  inputs = { login: '', senha: '' };
  isSubmitted = false;
  isLoggin = false;
  passwordtype = 'password';
  passeye = 'eye';

  constructor(
    public loadingController: LoadingController, public navCtrl: NavController,
    public theme: ThemeService, public apiKlService: ApiKlService, public apiMerronitService: ApiMerronitService, public toastService: ToastService) { }

  ngOnInit() {

  }
  async onSubmitKL() {
    this.isLoggin = true;
    const loading = await this.loadingController.create({
      message: 'KL RENT A CAR',
      duration: 1000,
      translucent: true,
      backdropDismiss: true,

    });
    await loading.present();
    this.isSubmitted = true;
    this.apiKlService.login(this.inputs).subscribe((data: any) => {
      if (data.status !== true) {
        this.toastService.showError(data.message);
        this.isLoggin = false;
      } else {
        this.apiKlService.setStorageKL('check', data.usuario);
        this.apiKlService.setStorageKL('tipo_login', this.tipoLogin);
        console.log('teste');
        console.log(data['usuario']['id_per_usu']);
        if(data['usuario']['id_per_usu']!=40){
        this.navCtrl.navigateRoot('tabs/kl_locacao');
      }else{
        this.navCtrl.navigateRoot('tabs/kl_guincho');
    }
        this.toastService.showSucess('Logado com sucesso');
      }
    }, error => {
      console.log(error);
      this.isLoggin = false;
    });
  }
  async onSubmitMerronit() {
    this.isLoggin = true;
    const loading = await this.loadingController.create({
      duration: 1000,
      translucent: true,
      backdropDismiss: true
    });
    await loading.present();
    this.isSubmitted = true;
    this.apiMerronitService.login(this.inputs).subscribe((data: any) => {
      if (data.status !== true) {
        this.toastService.showError(data.message);
        this.isLoggin = false;
      } else {
        this.toastService.showSucess('Logado com sucesso');
        this.apiMerronitService.setStorageMERRONIT('check_merronit', data.usuario);
        this.apiMerronitService.setStorageMERRONIT('tipo_login', this.tipoLogin);
        this.navCtrl.navigateRoot('tabs/merronit_home');

      }
    }, error => {
      console.log(error);
      this.isLoggin = false;
    });
  }
  managePassword() {
    if (this.passwordtype === 'password') {
      this.passwordtype = 'text';
      this.passeye = 'eye-off';
    } else {
      this.passwordtype = 'password';
      this.passeye = 'eye';
    }
  }

  changeTheme(name: string | number) {
    this.theme.setTheme(themes[name]);
  }
}
