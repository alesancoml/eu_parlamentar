import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
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
import 'rxjs/add/operator/map';

import { DatePipe } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';

// Imports do tutorial de logout no side menu.
import { AuthProvider } from '../providers/auth/auth';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';

firebase.initializeApp(environment.firebase);

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
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{platforms: {
      ios: {
        backButtonText: ''
      }
    }}),
    AngularFireModule.initializeApp(environment.firebase)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatePipe,
    AuthProvider
  ]
})
export class AppModule {}
