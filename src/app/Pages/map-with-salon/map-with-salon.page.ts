import { UtilService } from "./../../services/util.service";
import { ApiService } from "./../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
@Component({
  selector: "app-map-with-salon",
  templateUrl: "./map-with-salon.page.html",
  styleUrls: ["./map-with-salon.page.scss"],
})
export class MapWithSalonPage implements OnInit {
  // google maps zoom level
  zoom: number = 8;
  data: any = [];
  err: any;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  markers = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: "A",
      draggable: true,
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: "B",
      draggable: false,
    },
    {
      lat: 51.923858,
      lng: 7.895982,
      label: "C",
    },
  ];
  public styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];

  salonList: any = [
    {
      title: "Addictive Beauty",
      address: "West minister Business Road, UK",
      distance: 1,
      type: "WOMEN ONLY",
      image: "../../../assets/Images/13e317bceaec87ea47dacfff7386d606.png",
    },
    {
      title: "Barbarella Salon",
      address: "West minister Business Road, UK",
      distance: 1,
      image: "../../../assets/Images/3b09f1f04df3bbe9bf96f1c737a91781.png",
    },
    {
      title: "Barbarella Salon",
      address: "West minister Business Road, UK",
      distance: 1,
      image: "../../../assets/Images/3b09f1f04df3bbe9bf96f1c737a91781.png",
    },
  ];

  constructor(
    private navCtrl: NavController,
    private nativeGeocoder: NativeGeocoder,
    private api: ApiService,
    private util: UtilService,
    private geolocation: Geolocation
  ) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
   /* this.util.startLoad();
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.api
          .getDataWithToken("category/" + this.api.id + "/branch")
          .subscribe(
            (res: any) => {
              if (res.success) {
                this.data = res.data;
                this.data.forEach(async (element) => {
                  this.lat = resp.coords.latitude;
                  this.lng = resp.coords.longitude;
                  await this.nativeGeocoder
                    .forwardGeocode(element.address, options)
                    .then(async (result: NativeGeocoderResult[]) => {
                      element.lat = await result[0].latitude;
                      element.lng = await result[0].longitude;
                      element.distance = await Number(
                        this.distance(
                          resp.coords.latitude,
                          resp.coords.longitude,
                          element.lat,
                          element.lng,
                          "K"
                        ).toFixed(2)
                      );

                      this.util.dismissLoader();
                    })
                    .catch((error: any) => console.log("error", error));
                });
              }
            },
            (err) => {
              this.util.dismissLoader();
              this.err = err.error.errors;
            }
          );
      })
      .catch((error) => {
        this.util.dismissLoader();
        console.log("Error getting location", error);
      });*/
  }

  ngOnInit() {}

  closePage() {
    this.navCtrl.navigateBack('/payment');
  }
  

  viewDetail(id) {
    this.api.id = id;
    this.navCtrl.navigateForward("/salon-detail");
  }
  distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      let radlat1 = (Math.PI * lat1) / 180;
      let radlat2 = (Math.PI * lat2) / 180;
      let theta = lon1 - lon2;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }
}
