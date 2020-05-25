import { Component } from '@angular/core';
import { NavController, App, AlertController, Platform, ToastController, ModalController } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';
import { MapPage } from '../map/map';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  cle: number;
  pet: string;
  badge: string;
  cadge: string;
  dadge: string;
  nom: string;
  id: string;
  statut: string;
  toni: string;
  infos: any =[];
  histos: any =[];
  loads: any =[];


  constructor(public toastCtrl: ToastController, public navCtrl: NavController, private plt: Platform,
     private postPvdr: PostProviders, private mdlCtrl: ModalController,private localNotifications: LocalNotifications,
    public app: App, public alertCtrl: AlertController,private push: Push, private storage: Storage)
     {
      this.plt.ready().then((rdy) => {
     
     this.pushSetup();
          });
    }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      refresher.complete();
    }, 2000);
  }

      ionViewDidLoad() {
        this.pet = 'holi';
        this.charge();
        this.lod();
        this.cod();
      }


      take(key){
        this.storage.get('session_storage').then((val) => {
          this.toni = val;
          this.id = this.toni['id'];
      this.nom = this.toni['Nom'];
      this.statut = this.toni['Statut'];
      //------//

      let body ={
        cle: key,
        aid : this.id,
        Index : this.id,
        name : this.nom,
        aksi: 'texto'
      };
      this.postPvdr.postData(body, 'alvalid.php').subscribe(data =>{
        if (data.success) {
          this.postPvdr.postData(body, 'etoiles.php').subscribe((data)=>
          {
              if(data.success){
                const toast = this.toastCtrl.create({
                  message: 'Vellez vous rendre urgement à l`hôpital indiquer',
                  duration: 5000
                });
                toast.present()

              }else{
                const toast = this.toastCtrl.create({
                  message: 'Une Erreur à eu lieu',
                  duration: 3000
                });
                toast.present();
              }
          }); 
        }
        this.navCtrl.setRoot(this.navCtrl.getActive().component); 
      });
        });
        

      }

      charge() {
        let body ={
          stat : '0'
        };
      
        this.postPvdr.postData(body, 'alnew.php').subscribe(data =>{
          if (data.result != "") {
            for(let info  of data.result){
              this.infos.push(info);
            }
          } else {
              
      this.badge ="Aucune Alerte Disponible ";
      console.log(this.badge);
          }
          
        });
        setTimeout(
          ()=>{
            this.navCtrl.setRoot(NotificationPage);
          }, 6000
        );
      }

      //------//


      lod() {
        this.storage.get('session_storage').then((val) => {
          this.toni = val;
          this.id = this.toni['id'];
      this.nom = this.toni['Nom'];
      this.statut = this.toni['Statut'];
      
      //------//
      let body ={
       nom : this.nom
      };
    
      this.postPvdr.postData(body, 'alinf.php').subscribe(data =>{
        if(data.result != ''){
          for(let histo  of data.result){
            this.histos.push(histo);
          }
        }else{
          this.cadge ="Aucune Historique Disponible ";
      console.log(this.cadge);
        }
        
      });
      
        });
        
        
      }


      cod() {
        this.storage.get('session_storage').then((val) => {
          this.toni = val;
          this.id = this.toni['id'];
      this.nom = this.toni['Nom'];
      this.statut = this.toni['Statut'];
      
      //------//
      let body ={
       nom : this.nom
      };
    
      this.postPvdr.postData(body, 'alcour.php').subscribe(data =>{
        if (data.result != "") {
          for(let load  of data.result){
            this.loads.push(load);
          }
        } else {
            
    this.dadge ="Aucune Course en Coure ";
    console.log(this.dadge);
        }
        
      });
      
        });
        
        
      }


openmap(lati,longi){
  let modal = this.mdlCtrl.create(MapPage,{
    lat: lati,
    long: longi
  });
  modal.present();
}


notif(){
  this.plt.ready().then(() => {
    this.localNotifications.schedule({
      title: 'Local ILocalNotification Example',
      text: 'test 1'
   });
  });
}

              pushSetup(){
                // to check if we have permission
        this.push.hasPermission()
        .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

        });

        // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
        this.push.createChannel({
        id: "testchannel1",
        description: "My first test channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
        }).then(() => console.log('Channel created'));

        // Delete a channel (Android O and above)
        this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

        // Return a list of currently configured channels
        this.push.listChannels().then((channels) => console.log('List of channels', channels))

        // to initialize push notifications

        const options: PushOptions = {
        android: {
        senderID: '119693643428'
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        }
        };

        const pushObject: PushObject = this.push.init(options);


        pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

        pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
        }


}
