import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { PostProviders } from '../providers/post-providers';
import { TabsPage } from '../pages/tabs/tabs';
import { ActufoPage } from '../pages/actufo/actufo';
import { LoginPage } from '../pages/login/login';
import { ProfilPage } from '../pages/profil/profil';
import { ForumPage } from '../pages/forum/forum';
import { NotificationPage } from '../pages/notification/notification';
import { RecherchePage } from '../pages/recherche/recherche';
import { TestPage } from '../pages/test/test';
import { UnPage } from '../pages/un/un';
import { DeuxPage } from '../pages/deux/deux';
import { TroisPage } from '../pages/trois/trois';
import { QuatrePage } from '../pages/quatre/quatre';
import { CinqPage } from '../pages/cinq/cinq';
import { EchecPage } from '../pages/echec/echec';
import { DeuxfPage } from '../pages/deuxf/deuxf';
import { WinPage } from '../pages/win/win';
import { InformationsPage } from '../pages/informations/informations';
import { Push } from '@ionic-native/push';
import { Network } from '@ionic-native/network';
import { InscriptionPage } from '../pages/inscription/inscription';
import { NgxQRCodeModule} from 'ngx-qrcode2';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SosPage } from '../pages/sos/sos';
import { AgmCoreModule } from '@agm/core';
import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AproposPage } from '../pages/apropos/apropos';
import { WelcomePage } from '../pages/welcome/welcome';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MentionsPage } from '../pages/mentions/mentions';
import { WeltwoPage } from '../pages/weltwo/weltwo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ForumPage,
    NotificationPage,
    RecherchePage,
    TestPage,
    ActufoPage,
    LoginPage,
    InscriptionPage,
    ProfilPage,
    UnPage,
    DeuxPage,
    TroisPage,
    QuatrePage,
    CinqPage,
    EchecPage,
    DeuxfPage,
    WinPage,
    InformationsPage,
    SosPage,
    MapPage,
    AproposPage,
    WelcomePage,
    MentionsPage,
    WeltwoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxQRCodeModule,
    HttpModule,
   AgmCoreModule.forRoot( {
     apiKey :"AIzaSyAtzBvtIwVG4jdf6hVmr0O-HwAbYawQ3co"
  }),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InscriptionPage,
    TabsPage,
    ForumPage,
    NotificationPage,
    RecherchePage,
    TestPage,
    ActufoPage,
    LoginPage,
    ProfilPage,
    UnPage,
    DeuxPage,
    TroisPage,
    QuatrePage,
    CinqPage,
    EchecPage,
    DeuxfPage,
    WinPage,
    InformationsPage,
    SosPage,
    MapPage,
    AproposPage,
    WelcomePage,
    MentionsPage,
    WeltwoPage
  ],
  providers: [
    StatusBar,
    Geolocation,
    SocialSharing,
    PostProviders,
    BarcodeScanner,
    SplashScreen,
    Network,
    InAppBrowser,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    Push
  ]
})
export class AppModule {}
