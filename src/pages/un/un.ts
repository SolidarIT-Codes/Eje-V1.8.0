import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DeuxPage } from '../deux/deux';
import { DeuxfPage } from '../deuxf/deuxf';

/**
 * Generated class for the UnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-un',
  templateUrl: 'un.html',
})
export class UnPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
homme()
{
  this.navCtrl.setRoot(DeuxPage);
}
femme()
{
  this.navCtrl.setRoot(DeuxfPage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad UnPage');
  }

}
