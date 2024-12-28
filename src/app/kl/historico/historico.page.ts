import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ApiKlService } from 'src/app/services/api-kl.service';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  id: any;
  checklists: any;

  constructor(public apiKlService: ApiKlService, private iab: InAppBrowser) { }

  ngOnInit() {
    this.apiKlService.getStorageKL('id_loc_check').then(value => {
      this.id = value;
      let checklist = { id_loc: this.id };
      this.apiKlService.historico_checklist(checklist).subscribe(data => {
        if (data.status == false) {
          this.checklists = false;
        } else {
          this.checklists = data;
          console.log('checklists', this.checklists);
        }
        console.log(this.checklists);
      });
    }, error => {
      console.log(error);
    });
  }

  verChecklist(id_check: string) {
    this.iab.create(this.apiKlService.url + '../documentos/ver_checklist_id/' + id_check);
  }
}
