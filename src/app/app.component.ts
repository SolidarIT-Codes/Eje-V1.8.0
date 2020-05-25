import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav, LoadingController, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { PostProviders } from '../providers/post-providers';
import { AproposPage } from '../pages/apropos/apropos';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { MentionsPage } from '../pages/mentions/mentions';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  message: string = "Trouver et donner du Sang est desormais facile avec l'application EJE. Je t`invite à la telecharger et l`utiliser comme moi.";
  file: string = null;
  link: string;
  subject: string = null;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private socialSharing: SocialSharing,
    private postPvdr: PostProviders,public loadingCtrl: LoadingController,private app: App,private iab: InAppBrowser,
    private storage: Storage,public menu: MenuController, public toastCtrl: ToastController) {
    this.initializeApp();
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
     
        });
        }  

        initializeApp() {
          this.storage.get('session_storage').then((res)=>{
            if(res == null){

              this.rootPage = HomePage;
              
            } else {
              this.rootPage = TabsPage;
            }
          });}

          


          logout() {
            this.storage.get('session_storage').then((res)=>{
              if(res == null){
                this.nav.setRoot(HomePage);
                this.menu.close();
                
              } else {

                const loader = this.loadingCtrl.create({
                  content: "Patientez...",
                  duration: 4000
                });
                this.menu.enable(false);
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


              }
            });


            
            
          }
        
          apropos(){
           this.nav.push(AproposPage);
           this.menu.close();
          }
          home(){
            this.storage.get('session_storage').then((res)=>{
              if(res == null){
                this.nav.setRoot(HomePage);
                this.menu.close();
                
              } else {
                this.nav.setRoot(TabsPage);
                this.menu.close();
              }
            });
            
            //this.menu.close();
          }

          openmention()
          {
            this.nav.push(MentionsPage);
            this.menu.close();
          }

          
        share(){
          this.socialSharing.share(this.message , this.subject, this.file, this.link).then(()=>{

          }).catch(()=>{

          });
        }

        openwhatsapp(){
          const options: InAppBrowserOptions = {
            zoom: 'no'
          }
   const browser = this.iab.create('https://wa.me/22967341587?text=Bonjour%20EJE%20!', '_system');
       browser.show();
        }
     } 
