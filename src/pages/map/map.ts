import { Component, OnInit } from '@angular/core';
import {  ViewController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit {

    latitude : number;
    longitude: number;

    marker: {
      latitude : number,
      longitude: number,
      draggable: true
            };

            marker2: {
              latitude : number,
              longitude: number,
              draggable: true
                    };

  constructor(private viewCtrl: ViewController, private geolocation: Geolocation,
     private toast: ToastController, private load: LoadingController,public navParams: NavParams) {
  }

  ngOnInit(){
    
    this.latitude = 6.36;
    this.longitude = 2.43;
    this.marker2 = {
      latitude : this.navParams.get('lat'),
      longitude: this.navParams.get('long'),
      draggable: true
            };
  }

  close(){
    this.viewCtrl.dismiss();
  }

  onlocateme(){
    let loader = this.load.create({
      content:"Recherche de position.."
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((
      (resp)=> {
        loader.dismiss();
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.marker = {
          latitude : resp.coords.latitude,
          longitude : resp.coords.longitude,
          draggable: true
        };
      }
    )
    ).catch((error)=>{
      loader.dismiss();
      this.toast.create({
        message: error,
        duration: 4000,
        position: 'bottom'
      }).present();
    });
  }

  onMapCliked($event){ 
    
    this.marker = {
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true
    };
  }

}
