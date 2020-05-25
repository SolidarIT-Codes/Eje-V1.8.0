import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController} from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {
  badge: string;
  msges: any =[];
  message: string='';
  toni: any = [];
  constructor(public toastCtrl: ToastController,
    public navCtrl: NavController,
    private postPvdr: PostProviders,
  public loadingCtrl: LoadingController,
    private storage: Storage){}

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      
      setTimeout(() => {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        refresher.complete();
      }, 2000);
    }

    ionViewDidLoad(){
      this.storage.get('session_storage').then((val) => {
        this.toni = val;
    console.log(this.toni['Nom']);
      });
      this.charge() ;
    }

          
      send(){
          if(this.message != "" ){
                  const toast = this.toastCtrl.create({
                    message: 'Envoi en cour...',
                    duration: 3000
                  });
                  toast.present();
                  let body ={
                    auteur: this.toni['Nom'],
                    message: this.message,
                    aksi: 'texto'
                  };
                  this.postPvdr.postData(body, 'forum.php').subscribe(data =>{
                    this.navCtrl.setRoot(this.navCtrl.getActive().component); 
                  });

          } else{
                    const toast = this.toastCtrl.create({
                      message: 'Veillez entrer un text...',
                      duration: 4000
                    });
                    toast.present();
          }
        
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

}
