import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EchecPage } from '../echec/echec';
import { QuatrePage } from '../quatre/quatre';


@Component({
  selector: 'page-trois',
  templateUrl: 'trois.html',
})
export class TroisPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TroisPage');
  }

  oui()
  {
    this.navCtrl.setRoot(EchecPage);
  }
  non()
  {
    this.navCtrl.setRoot(QuatrePage);
  }

}
