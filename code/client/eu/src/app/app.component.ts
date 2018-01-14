import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import { Sobre } from '../pages/sobre/sobre';
import { Estado } from '../pages/estado/estado';
import { Tutorial } from '../pages/tutorial/tutorial';
import { HomePage } from '../pages/home/home';
import { Perguntas } from '../pages/perguntas/perguntas';
import { Detalhamento } from '../pages/detalhamento/detalhamento';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  rootPage:any = Login;
  
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tutorial', component: Tutorial},
      { title: 'Compartilhe', component: Sobre },
      { title: 'Sobre', component: Sobre },
    ];
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page){
    this.nav.setRoot(page.component);
    
    

  }
}

