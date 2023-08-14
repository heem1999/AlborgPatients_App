import { environment } from "./../../../environments/environment";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MapWithSalonPageRoutingModule } from "./map-with-salon-routing.module";

import { MapWithSalonPage } from "./map-with-salon.page";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapWithSalonPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.map_key,
    }),
  ],
  declarations: [MapWithSalonPage],
})
export class MapWithSalonPageModule {}
