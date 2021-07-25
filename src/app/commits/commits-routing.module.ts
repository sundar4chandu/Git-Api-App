import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommitsPage } from './commits.page';

const routes: Routes = [
  {
    path: '',
    component: CommitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitsPageRoutingModule {}
