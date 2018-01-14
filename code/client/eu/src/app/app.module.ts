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
import { ServiceProvider } from '../providers/service-provider';

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
    Detalhamento
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
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
    Detalhamento
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
