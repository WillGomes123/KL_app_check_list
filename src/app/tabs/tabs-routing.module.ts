import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'kl_locacao',
        loadChildren: () => import('../kl/locacao/locacao.module').then( m => m.LocacaoPageModule)
      },
      {
        path: 'kl_guincho',
        loadChildren: () => import('../kl/guincho/guincho.module').then( m => m.GuinchoPageModule)
      },
      
      {
        path: 'kl_historico',
       loadChildren: () => import('../kl/historico/historico.module').then( m => m.HistoricoPageModule)
      },
      {
        path: 'kl_atendimento',
        loadChildren: () => import('../kl/atendimento/atendimento.module').then( m => m.AtendimentoPageModule)
      },

      {
        path: 'kl_checklist',
        loadChildren: () => import('../kl/checklist/checklist.module').then( m => m.ChecklistPageModule)
      },{
      path: 'kl_checklist_guincho',
      loadChildren: () => import('../kl/checklist-guincho/checklist-guincho.module').then( m => m.ChecklistGuinchoPageModule)
    },
      /*aqui sao do merronit */
      {
        path: 'merronit_home',
        loadChildren: () => import('../merronit/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'merronit_checklist',
        loadChildren: () => import('../merronit/checklist/checklist.module').then( m => m.ChecklistPageModule)
      },
      {
        path: 'merronit_atendimento',
        loadChildren: () => import('../merronit/atendimento/atendimento.module').then( m => m.AtendimentoPageModule)
      },
      {
        path: 'merronit_historico',
        loadChildren: () => import('../merronit/historico/historico.module').then( m => m.HistoricoPageModule)
      },

    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
