import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ApiMerronitService } from 'src/app/services/api-merronit.service';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage {

  id_loc: any;
  checklists: any;

  constructor(
    public apiMerronitService: ApiMerronitService,
    private iab: InAppBrowser
  ) { }

  ionViewDidEnter() {
    this.apiMerronitService.getStorageMERRONIT('id_loc_check').then(value => {
      this.id_loc = value;
      let checklist = { id_loc: this.id_loc };
      this.apiMerronitService.historico_checklist(checklist).subscribe(data => {
        if (data.status == false) {
          this.checklists = false;
        } else {
          this.checklists = data;
        }
      }, error => {
        console.log(error);
      });
    });
  }

  verChecklist(id_check: string) {
    this.iab.create(this.apiMerronitService.url + '../documentos/ver_checklist_id/' + id_check);
  }

}
