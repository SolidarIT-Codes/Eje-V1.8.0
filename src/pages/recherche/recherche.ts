import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SosPage } from '../sos/sos';

@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html',
})
export class RecherchePage {
  groupe: string;
  badge: string;
  rh: string;
  numero: number;
  blads: any =[];
  blods: any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, private postPvdr: PostProviders,private iab: InAppBrowser,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad(){
   this.groupe ="";
   this.rh = "";
   
  }
  opensos(){
    {
      this.navCtrl.push(SosPage);
    }
  }




  search() {
    
    if(this.groupe != "" && this.rh != ""){
      
      console.log(this.groupe);
      let body = {
        groupe: this.groupe,
        rh: this.rh
      };
    
      this.postPvdr.postData(body, 'search.php').subscribe(data =>{
        if(data.result === ""){
          this.badge ="Sang Indisponible ";
          console.log('merde');
        }

        if(data.success == true){
          for(let blad of data.result){
            this.blads.push(blad);
          }
        }else if(data.success == false){
          this.badge ="Sang Indisponible ";
          console.log('merde');
          
        }
        
      });
      this.postPvdr.postData(body, 'serachH.php').subscribe(data =>{
        for(let blod of data.result){
          this.blods.push(blod);
        }
      });

      setTimeout(
        ()=>{
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }, 30000
      );

    }else {
 
      const toast = this.toastCtrl.create({
        message: 'Données erroné',
        duration: 3000
      });
      toast.present();

    }
    
  }

  openWebpage(){

    const confirm = this.alertCtrl.create({
      title: 'INFORMATION !',
      message: 'Vous serez rediriger sûr la platforme administrative EJE, oû vous allez devoir renseigner vos identifiants hôpital',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            console.log('Agree clicked');
            const options: InAppBrowserOptions = {
              zoom: 'no'
            }
            let groupe = this.groupe;
            let rh = this.rh;
     const browser = this.iab.create(`https://www.lumir.org/index.php/recherche/load?groupe=${groupe}&rhesus=${rh}`, '_system');
         browser.show();
    }
        }
      ]
    });
    confirm.present();
  
    
  
    
  }
  
}
