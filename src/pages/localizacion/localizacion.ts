import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import {GoogleMaps, GoogleMap, Environment } from '@ionic-native/google-maps';

/**
 * Generated class for the LocalizacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-localizacion',
  templateUrl: 'localizacion.html',
})
export class LocalizacionPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }
  
  ionViewDidLoad() {
    console.log("ingresé a localización")
    this.geolocation.getCurrentPosition().then((resp) => {
      debugger
      console.log(resp)
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log(data)
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
    console.log('ionViewDidLoad LocalizacionPage');

    this.loadMap();
  }

  loadMap()
  {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE':'','API_KEY_FOR_BROWSER_DEBUG':''
    });  
  this.map = GoogleMaps.create('map_canvas');
  }
}
