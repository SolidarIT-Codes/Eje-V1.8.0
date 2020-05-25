import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { PostProviders } from '../../providers/post-providers';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {
  Statut: string = "";
  Nom: string = "";
  Prenoms: string = "";
  Datnais: string = "";
  Email: string = "";
  Num: string = "";
  Password: string = "";
  remdp: string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, private postPvdr: PostProviders,
    public alertCtrl: AlertController,public loadingCtrl: LoadingController) {
  }

  Ajouter(){
    if(this.Statut == ""){
        const toast = this.toastCtrl.create({
          message: 'Le Statut est requis',
          duration: 3000
        });
        toast.present();
    }else if(this.Nom == ""){
      const toast = this.toastCtrl.create({
        message: 'Le nom est requis',
        duration: 3000
      });
      toast.present();
    }else if(this.Prenoms == ""){
      const toast = this.toastCtrl.create({
        message: 'Le prenom est requis',
        duration: 3000
      });
      toast.present();
    }
    else if(this.Datnais == ""){
      const toast = this.toastCtrl.create({
        message: 'La date est requise',
        duration: 3000
      });
      toast.present();
    }else if (this.Datnais != "" && this.Datnais >= '2001-00-00' ) {
      const toast = this.toastCtrl.create({
        message: 'Votre âge ne vous permet pas de vous inscrire sûr cette application!',
        duration: 3000
      });
      toast.present();
    } 
    else if(this.Email == ""){
      const toast = this.toastCtrl.create({
        message: 'Le mail est requis',
        duration: 3000
      });
      toast.present();
    }else if(this.Num == ""){
      const toast = this.toastCtrl.create({
        message: 'Le numero est requis',
        duration: 3000
      });
      toast.present();
    }else if(this.Password == ""){
      const toast = this.toastCtrl.create({
        message: 'Le mot de Passe est requis',
        duration: 3000
      });
      toast.present();
    }if (this.Password != "" && this.Password.length < 7) {
      const toast = this.toastCtrl.create({
        message: 'Mot de Passe trop court',
        duration: 3000
      });
      toast.present();
    }  else if(this.Password != this.remdp){
      const toast = this.toastCtrl.create({
        message: 'Erreur de correspondance du Mot de Passe',
        duration: 3000
      });
      toast.present();

    }else{
      
      //insertion dans la bdd

      let body = {
        Statut: this.Statut,
        Nom: this.Nom,
        Prenoms: this.Prenoms,
        Datnais: this.Datnais,
        Email: this.Email,
        Num: this.Num,
        Password: this.Password,
        remdp: this.remdp,
        aski: 'ajout_etudiant'
      };
      
      const loader = this.loadingCtrl.create({
        content: "Patientez...",
        
      });
      loader.present();

      this.postPvdr.postData(body, 'verifmail.php').subscribe((data)=>
      {
        
          if(data.success){
            const toast = this.toastCtrl.create({
              message: 'Cette adresse mail existe déja',
              duration: 4000
            });
            loader.dismiss();
            toast.present();
          }else{
            //---//
            this.postPvdr.postData(body, 'file_rek.php').subscribe((data)=>
            {
                var alertpesan = data.msg;
                if(data.success){
                  this.navCtrl.push(LoginPage);
                  const toast = this.toastCtrl.create({
                    message: 'Enregistrement effectué',
                    duration: 3000
                  });
                  loader.dismiss();
                  toast.present();
                }else if(data.success == false){
                  loader.dismiss();
                }else{
                  loader.dismiss();
                  const toast = this.toastCtrl.create({
                    message: alertpesan,
                    duration: 3000
                  });
                  toast.present();
                }
            }); 

            //---//
          }
      });




    }
  }

}
