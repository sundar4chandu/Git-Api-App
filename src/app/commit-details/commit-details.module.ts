import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitDetailsPageRoutingModule } from './commit-details-routing.module';

import { CommitDetailsPage } from './commit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitDetailsPageRoutingModule
  ],
  declarations: [CommitDetailsPage]
})
export class CommitDetailsPageModule {}
