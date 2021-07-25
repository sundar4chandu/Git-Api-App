import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitsPageRoutingModule } from './commits-routing.module';

import { CommitsPage } from './commits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitsPageRoutingModule
  ],
  declarations: [CommitsPage]
})
export class CommitsPageModule {}
