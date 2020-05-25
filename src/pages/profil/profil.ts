import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PostProviders } from '../../providers/post-providers';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})

export class ProfilPage implements OnInit{
toni: any;
infos: any =[];
idos: any =[];
moyes: any =[];
moies: any =[];
dioso: any =[];
id: number ;
nom: any;
note:any;
pet: string;
prenom: any;
statut: any;
errortext: string;
scannedCode = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    public toastCtrl: ToastController,private storage: Storage, private postPvdr: PostProviders,public loadingCtrl: LoadingController,
     private barcodeScanner : BarcodeScanner) {
  }


  ngOnInit(){
    this.pet = 'sos';
    this.storage.get('session_storage').then((val) => {
      this.toni = val;     
      this.id = this.toni['id'];
  this.nom = this.toni['Nom'];
  this.prenom = this.toni['Prenoms'];
  this.statut = this.toni['Statut'];
  this.note = this.toni['Points'];
  this.info(this.id);

  
      /********* */
      let body ={
        auteur: this.nom,
      };
      this.postPvdr.postData(body, 'mysos.php').subscribe(data =>{
        if (data.result != "") {
          for(let info of data.result){
            this.infos.push(info);
          }
        }       
      });

      let elle ={
        auteur: this.nom,
      };
      this.postPvdr.postData(elle, 'sosoff.php').subscribe(data =>{
        if (data.result != "") {
          for(let dios of data.result){
            this.dioso.push(dios);
          }
        }       
      });
    
      let corp = {
        Index: this.id
      };
      this.postPvdr.postData(corp, 'moyenne.php').subscribe(data =>{
        for(let moye of data.result){
          this.moyes.push(moye);
        }
      });
    
      let bod = {
        Index: this.id
      };
      this.postPvdr.postData(bod, 'moyenne_tr.php').subscribe(data =>{
        for(let moie of data.result){
          this.moies.push(moie);
        }
      });


  });
  }

  

  off(index){
    const confirm = this.alertCtrl.create({
      title: 'SUPPRESSION ?',
      message: 'Vous êtes sur le point de supprimer votre SOS ',
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
            let body ={
              id : index
            };
            const loader = this.loadingCtrl.create({
              content: "Patientez...",
            });
            loader.present();
            this.postPvdr.postData(body, 'offsos.php').subscribe(data =>{
              if (data.success) {
                this.navCtrl.setRoot(this.navCtrl.getActive().component);
                loader.dismiss();
               console.log("cool");
              }
              
            });
          }
        }
      ]
    });
    confirm.present();
      
    }

    info(id){
      let body ={
        auteur: id,
        aksi: 'voir'
      };
      this.postPvdr.postData(body, 'agenda.php').subscribe(data =>{
        if (data.result != "") {
          for(let ido of data.result){
            this.idos.push(ido);
          }
        } else {
          this.errortext ="Aucune Information Disponible ";
          console.log(this.errortext);
          return false;
          }    
      });

      setTimeout(
        ()=>{
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }, 60000
      );
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
        
          this.postPvdr.postData(body, 'camp.php').subscribe(data =>{
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
