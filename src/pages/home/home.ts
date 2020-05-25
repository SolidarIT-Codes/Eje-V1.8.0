import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { PostProviders } from '../../providers/post-providers';
import { InscriptionPage } from '../inscription/inscription';
import { AproposPage } from '../apropos/apropos';
import { WelcomePage } from '../welcome/welcome';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Email: string;
  Password: string;
  constructor (public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController, private postPvdr: PostProviders,
    public storage: Storage,public alertCtrl: AlertController,public loadingCtrl: LoadingController) {

  }

/* methode appelant la page inscrip*/
  onGotoinscription(){
    this.navCtrl.push(InscriptionPage);
  }
  
  onGoto(){
    this.navCtrl.push(AproposPage);
  }

/* méthode pour la connexion*/
  login() {
    console.log(this.Email);
        if(this.Email != "" && this.Password == ""){
          const toast = this.toastCtrl.create({
            message: 'Entrer le Mot de Passe',
            duration: 3000
          });
          toast.present();
        }
        if(this.Email == "" && this.Password != ""){
          const toast = this.toastCtrl.create({
            message: 'Entrer le mail',
            duration: 3000
          });
          toast.present();
        } 
        if(this.Email == "" && this.Password == ""){
          const toast = this.toastCtrl.create({
            message: 'Aucune entrée',
            duration: 3000
          });
          toast.present();
        }
         if(this.Email != "" && this.Password != ""){
          this.validate();
        }
  }

  welcome()
  {
    //this.navCtrl.push();
    this.navCtrl.setRoot(WelcomePage);
  }

  validate(){
    
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    let body = {
      Email: this.Email,
      Password: this.Password,
      aski: 'connect'
    };
  
    this.postPvdr.postData(body, 'file_rek.php').subscribe((data)=>
    {
        var alertpesan = data.msg;
        if(data.success){
          this.storage.set('session_storage', data.result);
          this.navCtrl.setRoot(TabsPage);
          this.storage.get('session_storage').then((val) => {
            console.log('data', val);
          });
          const toast = this.toastCtrl.create({
            message: 'Connexion effectué!',
            duration: 3000
          });
          toast.present();
        }else{
          const toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
        }
    });
  }
  
}
 
 
  