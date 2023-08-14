import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectionPageRoutingModule } from './direction-routing.module';

import { DirectionPage } from './direction.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';  


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectionPageRoutingModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCb9lhLYxUnRjSp1oIGl6aAsXLODc3o-f4'}),
    AgmDirectionModule
  ],
  declarations: [DirectionPage]
})
export class DirectionPageModule {}
