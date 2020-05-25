import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EchecPage } from '../echec/echec';
import { TroisPage } from '../trois/trois';

/**
 * Generated class for the DeuxfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-deuxf',
  templateUrl: 'deuxf.html',
})
export class DeuxfPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeuxfPage');
  }

  oui()
  {
    this.navCtrl.setRoot(EchecPage);
  }
  non()
  {
    this.navCtrl.setRoot(TroisPage);
  }

}
