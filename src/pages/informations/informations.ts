import { Component } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController, App } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-informations',
  templateUrl: 'informations.html',
})
export class InformationsPage {
  

  pet: string;
  badge: string;
  nom: string;
  id: string;
  statut: string;
  toni: string;
  infos: any =[];
  histos: any =[];
  constructor(public navCtrl: NavController,private app: App,private postPvdr: PostProviders,
   public alertCtrl: AlertController,private storage: Storage,
  public toastCtrl: ToastController,public loadingCtrl: LoadingController) {}

  changestat()
  {
    this.storage.get('session_storage').then((val) => {
      this.toni = val;
      this.id = this.toni['id'];
  this.nom = this.toni['Nom'];
  //------//

  let body ={
    Index : this.id,
    name : this.nom,
   
  };
  this.postPvdr.postData(body, 'changstat.php').subscribe(data =>{
    if (data.success) {
      const confirm = this.alertCtrl.create({
        title: '☻ Félicitation !',
        message: 'Votre staut à eté changer avec success. Vous devez vous re-connecter afin d`observer les changements effectuer',
        buttons: [
          {
            text: 'Plus tard',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Accepter',
            handler: () => {
              const loader = this.loadingCtrl.create({
                content: "Patientez...",
                duration: 4000
              });
              loader.present();
              let body = {
                aksi: 'out'
              };
              this.postPvdr.postData(body,'logout.php').subscribe((data)=>{
              this.storage.set('session_storage', data.result);
              this.storage.get('session_storage').then((val) => {
                console.log('data', val);
              });
            });
            setTimeout(
              ()=>{
            this.app.getRootNav().setRoot(HomePage);
            this.storage.get('session_storage').then((val) => {
              console.log('data', val);
            });
              }, 3000
            );
              console.log('Agree clicked');
            }
          }
        ]
      });
      confirm.present();
    }
    
  });
    
  });
  }





}
