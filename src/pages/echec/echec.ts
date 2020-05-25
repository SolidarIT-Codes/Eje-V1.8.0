import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { TestPage } from '../test/test';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-echec',
  templateUrl: 'echec.html',
})
export class EchecPage {
  tab1: any;
  constructor(public navCtrl: NavController,private storage: Storage) {
  }

  ok()
  {
    this.storage.get('session_storage').then((val) => {
      console.log('les donnees sont', val);
      this.tab1 = val;
    console.log(this.tab1['Statut']);

    if (this.tab1['Statut'] == "donneur") {
      this.navCtrl.setRoot(TestPage);
      setTimeout(() => {
        this.navCtrl.setRoot(TabsPage);
      }, 4000);
    }
    else{
      this.navCtrl.setRoot(TabsPage);
    }
  });
  }

}
