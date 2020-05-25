import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnPage } from '../un/un';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  test(){
    this.navCtrl.push(UnPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

}
