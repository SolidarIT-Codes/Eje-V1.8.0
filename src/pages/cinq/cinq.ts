import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EchecPage } from '../echec/echec';
import { WinPage } from '../win/win';

/**
 * Generated class for the CinqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cinq',
  templateUrl: 'cinq.html',
})
export class CinqPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CinqPage');
  }

  oui()
  {
    this.navCtrl.setRoot(WinPage);
  }
  non()
  {
    this.navCtrl.setRoot(EchecPage);
  }

}
