import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitsPageRoutingModule } from './commits-routing.module';

import { CommitsPage } from './commits.page';
import { SearchPipe } from '../pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitsPageRoutingModule
  ],
  declarations: [CommitsPage, SearchPipe]
})
export class CommitsPageModule {}
