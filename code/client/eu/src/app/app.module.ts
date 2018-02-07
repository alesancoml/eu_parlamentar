import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Tutorial } from '../pages/tutorial/tutorial';
import { Estado } from '../pages/estado/estado';
import { Sobre } from '../pages/sobre/sobre';
import { Detalhamento } from '../pages/detalhamento/detalhamento';
import { Perguntas } from '../pages/perguntas/perguntas';
import { Resultados } from '../pages/resultados/resultados';
import { Contato } from '../pages/contato/contato';
import { ServiceProvider } from '../providers/service-provider';

import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyAsnWrP6g9-XKwFiSeqW4UeSx2hsUsCRoA",
  authDomain: "euparlamentar2018-02.firebaseapp.com",
  databaseURL: "https://euparlamentar2018-02.firebaseio.com",
  projectId: "euparlamentar2018-02",
  storageBucket: "euparlamentar2018-02.appspot.com",
  messagingSenderId: "629457841992"
};
firebase.initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Tutorial,
    Estado,
    Sobre,
    Perguntas,
    Resultados,
    Detalhamento,
    Contato
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{platforms: {
      ios: {
        backButtonText: ''
      }
    }}),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Tutorial,
    Estado,
    Sobre,
    Perguntas,
    Resultados,
    Detalhamento,
    Contato
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    ServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
