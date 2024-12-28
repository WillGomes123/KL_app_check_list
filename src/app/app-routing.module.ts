import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'lojas',
    loadChildren: () => import('./kl/lojas/lojas.module').then( m => m.LojasPageModule)
  },
  {
    path: 'listacar',
    loadChildren: () => import('./kl/listacar/listacar.module').then( m => m.ListacarPageModule)
  },  {
    path: 'listarcarros-best',
    loadChildren: () => import('./kl/listarcarros-best/listarcarros-best.module').then( m => m.ListarcarrosBestPageModule)
  },
  {
    path: 'guincho',
    loadChildren: () => import('./kl/guincho/guincho.module').then( m => m.GuinchoPageModule)
  },
  {
    path: 'checklist-guincho',
    loadChildren: () => import('./kl/checklist-guincho/checklist-guincho.module').then( m => m.ChecklistGuinchoPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
