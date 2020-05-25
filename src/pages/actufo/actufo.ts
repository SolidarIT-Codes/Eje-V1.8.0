import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams , App, LoadingController, ToastController, AlertController} from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { TestPage } from '../test/test';
import { CallNumber } from '@ionic-native/call-number';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-actufo',
  templateUrl: 'actufo.html',
})
export class ActufoPage implements OnInit {
  badge: string;
  actus: any =[];
  infos: any =[];
  chatas: any =[];
  nom: string;
  toni: any;
  id:any;
  scannedCode = null;
  statut:any;
  note: number;
  swipe: number = 0;
  constructor(public toastCtrl: ToastController,public navCtrl: NavController,
    public loadingCtrl: LoadingController, public navParams: NavParams,public alertCtrl: AlertController,
     private postPvdr: PostProviders,private storage: Storage,private callNumber: CallNumber,
     public app: App,private barcodeScanner : BarcodeScanner) 
     {
  }
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    
    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      refresher.complete();
    }, 2000);
  }
    
  ngOnInit(){
    this.storage.get('session_storage').then((val) => {
      this.toni = val;
      this.statut = this.toni['Statut'];
  });
  this.boom();
  this.charge();
  this.aos();
  }
  
  call(numero)
  {
  console.log(numero);
    this.callNumber.callNumber(numero, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  aos() {
    let body ={
     
    };
    this.postPvdr.postData(body, 'sos_gene.php').subscribe(data =>{
      if (data.result != "") {
        for(let info of data.result){
          this.infos.push(info);
        }
      }       
    });
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

  boom() {
    let body ={
      stat : '0'
    };
  
    this.postPvdr.postData(body, 'alnew.php').subscribe(data =>{
      if (data.result != "") {
        for(let chata  of data.result){
          this.chatas.push(chata);
        }
      } else {
  console.log(this.badge);
      }
      
    });
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

    ajouter(idcamp,title,clock,town,heure,desc)
    {
      let copy ={
        auteur: this.toni['id'],
        camp: idcamp,
      };
      this.postPvdr.postData(copy, 'verifagenda.php').subscribe((data)=>
      {
        
          if(data.success){

            const toast = this.toastCtrl.create({
              message: 'Cette Campagne est déja dans l`agenda',
              duration: 4000
            });
            toast.present();
          }else{
      let body ={
        auteur: this.toni['id'],
        camp: idcamp,
        titre: title,
        moment: clock,
        ville: town,
        temps: heure,
        desc: desc,
        aksi: 'texto'
      };
      this.postPvdr.postData(body, 'agenda.php').subscribe(data =>{
        const toast = this.toastCtrl.create({
          message: 'Campagne ajouté à l`agenda',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(TestPage);
        
      });
          }
        });
    }

   scan()
    {
      this.storage.get('session_storage').then((val) => {
        this.toni = val;
        this.id = this.toni['id'];
  this.note = this.toni['Points'];
  console.log(this.note);
    });
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
        this.scannedCode = barcodeData.text;

        if (this.scannedCode ) {
          let body ={
            Nom: barcodeData.text,
            Note: this.note,
            Index: this.id
          };
        
          this.postPvdr.postData(body, 'don.php').subscribe(data =>{
            if (data.result != "") {
              this.postPvdr.postData(body, 'etoiles.php').subscribe((data)=>
              {
                  if(data.success){
                    const alert = this.alertCtrl.create({
                      title: 'Félicitation!',
                      subTitle: 'Vous venez de valider votre don de sang',
                      buttons: ['OK']
                    });
                    alert.present();

                  }else{
                    const toast = this.toastCtrl.create({
                      message: 'Une Erreur à eu lieu',
                      duration: 3000
                    });
                    toast.present();
                  }
              }); 
  
            } else {
            this.scannedCode ="Erreur de QR Code ";
            
            const toast = this.toastCtrl.create({
              message: 'Vous vous êtes tromper de QR Code',
              duration: 3000
            });
            toast.present();
            }
      
            
          });
        }
        const loader = this.loadingCtrl.create({
          content: "Patientez...",
          duration: 4000
        });
        loader.present();
        
       }).catch(err => {
           console.log('Error', err);
       });
    }




}
