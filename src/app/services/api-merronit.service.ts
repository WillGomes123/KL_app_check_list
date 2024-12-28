import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic YWRtaW46MTIzNA=='
  })
};


@Injectable({
  providedIn: 'root'
})
export class ApiMerronitService {

  url: string = "https://merronit.com.br/sistema/api/";
  constructor(public http: HttpClient, public storage: Storage) {
    this.storage.create();
  }

  //storage banco offline
  setStorageMERRONIT(chave: string, valor: any) {
    this.storage.set(chave, valor);
  }

  getStorageMERRONIT(chave: string): Promise<any> {
    return this.storage.get(chave);
  }

  removeStorageMERRONIT(chave: string): Promise<boolean> {
    return this.storage.remove(chave).then(() => {
      return true;
    });
  }
  pesquisarLocacao(placa_car: any) {
    return this.http.get<any>(this.url + 'checklist/pesquisar_locacao?placa_car=' + placa_car, httpOptions);
  }

  locacaoDia() {
    return this.http.get<any>(this.url + 'checklist/locacao_dia', httpOptions);
  }

  pesquisarCondutores(numero_loc: any) {
    return this.http.get<any>(this.url + 'checklist/pesquisar_condutores?numero_loc=' + numero_loc, httpOptions);
  }

  enviarImagen(data: any) {
    return this.http.post<any>(this.url + 'arquivos/upload', data, httpOptions);
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

  atualizarChecklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/atualizar_checklist', data, httpOptions);
  }

  atualizarStatusChecklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/atualiza_status_checklist', data, httpOptions);
  }

  historico_checklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/historico_checklist', data, httpOptions);
  }
  salvaAtendimento(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'atendimento/salvar_atendimento', data, httpOptions);
  }
}

