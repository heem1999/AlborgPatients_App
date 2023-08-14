import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.page.html',
  styleUrls: ['./direction.page.scss'],
})
export class DirectionPage implements OnInit {
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 24.799448;
  lng: number = 120.979021;

  origin = { lat: 24.799448, lng: 120.979021 };
  destination = { lat: 24.799524, lng: 120.975017 };

  public renderOptions = {
    suppressMarkers: true,
  }

  markerOptions = {
    origin: {
        icon: '../../../assets/svg_icon/people-pin.svg',
    },
    destination: {
        icon: '../../../assets/svg_icon/shope-pin.svg'
    },
}
  constructor() { }

  ngOnInit() {
  }

}
