import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActufoPage } from '../actufo/actufo';
import { Storage } from '@ionic/storage';
import { ProfilPage } from '../profil/profil';
import { ForumPage } from '../forum/forum';
import { TestPage } from '../test/test';
import { NotificationPage } from '../notification/notification';
import { RecherchePage } from '../recherche/recherche';
import { InformationsPage } from '../informations/informations';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1: any;
  tab2: any;
  titre = "Statut";
  icon = "ios-refresh-circle";
  forum = ForumPage;
  option: any;
  actufo = ActufoPage;
  profil = ProfilPage
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    

  }
  


  ionViewDidLoad(){
    this.storage.get('session_storage').then((val) => {
      console.log('les donnees sont', val);
      this.tab1 = val;
    console.log(this.tab1['Statut']);

    if (this.tab1['Statut'] == "donneur") {
      this.option = TestPage;
      this.titre = "Test";
      this.icon = "ios-water"
      console.log(this.titre);
    }else if(this.tab1['Statut'] == "transporteur")
    {this.option = NotificationPage;
      this.titre = "Alertes";
      this.icon = "ios-notifications"}
    else if(this.tab1['Statut'] == "medecin"){
      this.option = RecherchePage;
      this.titre = "Recherche";
      this.icon = "ios-search"
    }else if(this.tab1['Statut'] == "individu"){
      this.option = InformationsPage;
      this.titre = "Statut";
      this.icon = "ios-refresh-circle"
    }

    });
    

  }
  

}
