import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { WeltwoPage } from '../weltwo/weltwo';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  badge: string;
  actus: any =[];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,public alertCtrl: AlertController,
    private postPvdr: PostProviders) {
  }

  ionViewDidLoad() {
    this.charge();
  }

  charge() {
    let body ={
  
    };
    const loader = this.loadingCtrl.create({
      content: "Patientez...",
      duration: 300   
    });
    loader.present();

    this.postPvdr.postData(body, 'actu.php').subscribe(data =>{
      if (data.result != "") {
       
        for(let actu of data.result){
          this.actus.push(actu);
        }
        return true;
      } else {
      this.badge ="Aucune Information Disponible ";
      console.log(this.badge);
      return false;
      }

      
    });
  }

  forum()
  {
    //this.navCtrl.push();
    this.navCtrl.setRoot(WeltwoPage);
  }

  msg()
  {
    const alert = this.alertCtrl.create({
      title: 'Attention!',
      subTitle: 'Pour effectuer une action vous devrez crée un compte !',
      buttons: ['OK']
    });
    alert.present();
  
  }

}
