import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EchecPage } from '../echec/echec';
import { CinqPage } from '../cinq/cinq';

/**
 * Generated class for the QuatrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-quatre',
  templateUrl: 'quatre.html',
})
export class QuatrePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuatrePage');
  }
  oui()
  {
    this.navCtrl.setRoot(EchecPage);
  }
  non()
  {
    this.navCtrl.setRoot(CinqPage);
  }

}
