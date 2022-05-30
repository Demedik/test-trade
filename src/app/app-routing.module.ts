import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'history',
    pathMatch: 'full'
  },
  {
    path: 'history',
    loadChildren: () => import('./feature/history').then(({HistoryPageModule}) => HistoryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
