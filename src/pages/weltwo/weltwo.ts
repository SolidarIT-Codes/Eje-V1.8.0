import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { WelcomePage } from '../welcome/welcome';



@Component({
  selector: 'page-weltwo',
  templateUrl: 'weltwo.html',
})
export class WeltwoPage {
  badge: string;
  msges: any =[];

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,
    private postPvdr: PostProviders) {
  }

  ionViewDidLoad() {
  this.charge();
  }

  acceuil()
  {
    this.navCtrl.setRoot(WelcomePage);
  }

  charge() {
    let body ={
  
    };
  
    this.postPvdr.postData(body, 'text.php').subscribe(data =>{
      if (data.result != "") {
        for(let msge of data.result){
          this.msges.push(msge);
        }
      }else{
        
        this.badge ="Aucune Information Disponible ";
        console.log(this.badge);
      }
  
      
    });
  
    setTimeout(
      ()=>{
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }, 60000
    );
  
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
