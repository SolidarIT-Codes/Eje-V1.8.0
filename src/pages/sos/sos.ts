import { Component } from '@angular/core';
import { NavController,  ToastController } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-sos',
  templateUrl: 'sos.html',
})
export class SosPage {

  blads : any=[];
  toni: any = [];
  groupe: string;
  rh: string;
  num: string;
  hosto: string;
  auteur: string;
  constructor(public navCtrl: NavController,private postPvdr: PostProviders,public toastCtrl: ToastController,
    private storage: Storage) {
  }

  ionViewDidLoad() {
       this.log();
       this.groupe ="";
       this.rh = "";
       this.hosto = "";
       this.num = "";
      this.storage.get('session_storage').then((val) => {
         this.toni = val;
      console.log(this.toni['Nom']);
                                                     });
   
  }


  log() {
    
    
      let body = {
      };
    
      this.postPvdr.postData(body, 'log.php').subscribe(data =>{
        if(data.success == true){
          for(let blad of data.result){
            this.blads.push(blad);
          }
        }else if(data.success == false){
          console.log('error');
        }
        
      });
    }


   send()
   {
     console.log(this.groupe);
     if(this.groupe != "" && this.rh != "" && this.hosto != "" && this.num != ""){
      const toast = this.toastCtrl.create({
        message: 'Envoie en cour...',
        duration: 3000
      });
      toast.present();
      let body ={
        groupe: this.groupe,
        rh: this.rh,
        hosto: this.hosto,
        numero: this.num,
        auteur: this.toni['Nom'],
        aksi: 'texto'
      };
      this.postPvdr.postData(body, 'sos.php').subscribe(data =>{
        this.navCtrl.setRoot(this.navCtrl.getActive().component); 
      });  
      }else{
        const toast = this.toastCtrl.create({
          message: 'Veillez entrer les informations',
          duration: 4000
        });
        toast.present();
      }
    
  }
}
