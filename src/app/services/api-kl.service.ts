import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};
const httpOptionsGeral = {
  headers: new HttpHeaders({
    Authorization: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};

interface LocalFile {
  name: any;
  path: any;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiKlService {
  public imagens: any = [];
  private IMAGE_DIR = 'stored-images';

  url: string = "https://factoringelshaday.com.br/sistema/api/";
  constructor(public http: HttpClient, public storage: Storage, private loadingCtrl: LoadingController,
    private plt: Platform,
  ) {
    this.storage.create();
  }

  //storage banco offline
  setStorageKL(chave: string, valor: any) {
    this.storage.set(chave, valor);
  }

  getStorageKL(chave: string): Promise<any> {
    return this.storage.get(chave);
  }

  removeStorageKL(chave: string): Promise<boolean> {
    return this.storage.remove(chave).then(() => {
      return true
    });
  }
  pesquisarLocacao(placa_car: any) {
    return this.http.get<any>(this.url + 'checklist/pesquisar_locacao?placa_car=' + placa_car, httpOptions);
  }

  locacaoDia(usuario: any) {
    return this.http.get<any>(this.url + 'checklist/locacao_dia_usuario?id='+ usuario, httpOptions);
  }

  pesquisarCondutores(numero_loc: any) {
    return this.http.get<any>(this.url + 'checklist/pesquisar_condutores?numero_loc=' + numero_loc, httpOptions);
  }

  enviarImagen(data: any) {
    return this.http.post<any>(this.url + 'arquivos/upload', data, httpOptions);
  }

  async enviarImagemNovo(formData: FormData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();

    // Use your own API!
    const url = this.url + 'arquivos/upload_novo';

    return this.http.post(url, formData, httpOptionsGeral)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      );
  }

  salvarChecklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/salvar_checklist', data, httpOptions);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.url + 'checklist/login', data, httpOptions);
  }

  enviarEmail(data: any) {
    return this.http.post<any>(this.url + 'checklist/enviar_email', data, httpOptions);
  }

  pesquisaChecklist(id_loc: number, id_car: number, tipo_check: string) {
    return this.http.get<any>(this.url + 'checklist/pesquisa_checklist?id_loc=' + id_loc + '&id_car=' + id_car + '&tipo_check=' + tipo_check, httpOptions);
  }

  pesquisaChecklist_guincho(id_loc: number, id_car: number, tipo_check: string) {
    return this.http.get<any>(this.url + 'checklist/pesquisa_checklist_guincho?id_loc=' + id_loc + '&id_car=' + id_car + '&tipo_check=' + tipo_check, httpOptions);
  }

  atualizarChecklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/atualizar_checklist', data, httpOptions);
  }

  atualizarStatusChecklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/atualiza_status_checklist', data, httpOptions);
  }
   
  liberacaoLocacao(data: any): Observable<any> {
    return this.http.post<any>(
      this.url + 'checklist/liberacao_locacao', // ajuste conforme o endpoint real
      data,
      httpOptions
    );
  }
  

  historico_checklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/historico_checklist', data, httpOptions);
  }
  buscar_avaria(id_modelo: any) {
    return this.http.get<any>(this.url + 'checklist/buscar_avarias?id_modelo=' + id_modelo, httpOptions);
  }
  salvaAtendimento(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'atendimento/salvar_atendimento', data, httpOptions);
  }
  contagemCarros(id: any) {
    return this.http.get<any>(this.url + 'checklist/buscarcarro?id=' + id, httpOptions);
  }
  AtualizaCar(id: any, id_usu: any, id_loja: any) {
    return this.http.get<any>(this.url + 'checklist/atualizar_carro?id=' + id + '&id_usu=' + id_usu + '&id_loja=' + id_loja, httpOptions);
  }
  AtualizaCar2(id: any, id_usu: any, id_loja: any, obs_cont: any) {
    return this.http.get<any>(this.url + 'checklist/atualizar_carro?id=' + id + '&id_usu=' + id_usu + '&id_loja=' + id_loja + '&obs_cont=' + obs_cont, httpOptions);
  }
  buscaCarro(placa: any) {
    return this.http.get<any>(this.url + 'checklist/buscarcarro?placa=' + placa, httpOptions);
  }
  contaCarros(id: any) {
    return this.http.get<any>(this.url + 'checklist/buscarcarrocount?id=' + id, httpOptions);
  }
  buscaCarroBest(id: any) {
    return this.http.get<any>(this.url + 'checklist/buscarcarrobest?id=' + id, httpOptions)
  }
  AtualizaCarBest(id: any, id_usu: any, id_loja: any) {
    return this.http.get<any>(this.url + 'checklist/atualizar_carro_best?id=' + id + '&id_usu=' + id_usu + '&id_loja=' + id_loja, httpOptions);
  }
  buscaCarroBestPlaca(placa: any) {
    return this.http.get<any>(this.url + 'checklist/buscarcarrobest?placa=' + placa, httpOptions)
  }
  totalCarBest(id: any) {
    return this.http.get<any>(this.url + 'checklist/buscarcarrobestcont?id=' + id, httpOptions);

  }
  AtualizaCarBest2(id: any, id_usu: any, id_loja: any, obs_cont: any) {
    return this.http.get<any>(this.url + 'checklist/atualizar_carro_best?id=' + id + '&id_usu=' + id_usu + '&id_loja=' + id_loja + '&obs_cont=' + obs_cont, httpOptions);
  }

  async carregandoArquivos() {

    this.imagens = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: this.IMAGE_DIR,
      directory: Directory.Data,
    }).then(async (result: { files: any[]; }) => {
      await this.carregaListaArquivos(result.files);
    },
      async (): Promise<void> => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: this.IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then((_: any) => {
      loading.dismiss();
    });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async carregaListaArquivos(fileNames: any[]) {
    for (let f of fileNames) {
      const filePath = `${this.IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });

      this.imagens.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }

  async carregarUmArquivo(fileName: string) {

    const filePath = `${this.IMAGE_DIR}/${fileName}`;

    const readFile = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data,
    });

    let imagem = {
      name: fileName,
      path: filePath,
      data: `data:image/jpeg;base64,${readFile.data}`,
    };
    return imagem;
  }

  async tirarPhoto(): Promise<any> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera // Camera, Photos or Prompt!
    });

    if (image) {
      return this.saveImage(image)
    }
    return;
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${this.IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
      recursive: true
    });
    return fileName;
  }

  private async readAsBase64(photo: any) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  definirCaminhoFotos(caminho: string) {
    this.IMAGE_DIR = caminho;
  }

  async pegarFotoFormData(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    return formData;
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
  }



}

