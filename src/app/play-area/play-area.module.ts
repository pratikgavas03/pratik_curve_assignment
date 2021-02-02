import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayAreaPageRoutingModule } from './play-area-routing.module';

import { PlayAreaPage } from './play-area.page';
import { PlayControlsComponent } from '../play-controls/play-controls.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PlayAreaPageRoutingModule
  ],
  declarations: [PlayAreaPage, PlayControlsComponent]
})
export class PlayAreaPageModule {}
