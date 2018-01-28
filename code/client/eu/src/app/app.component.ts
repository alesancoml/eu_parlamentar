import { Component, ViewChild, trigger, state, style, transition, animate } from '@angular/core';
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
import { Contato } from '../pages/contato/contato';


@Component({
  templateUrl: 'app.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  rootPage:any = Login;
  
  pages: Array<{title: string, component: any, icone_ios: string, icone_md: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Login, icone_ios: 'ios-home', icone_md: 'md-home' },
      { title: 'Tutorial', component: Tutorial, icone_ios: 'ios-bulb', icone_md: 'md-bulb' },
      //{ title: 'Compartilhe', component: Sobre, icone_ios: 'ios-share', icone_md: 'md-share' },
      { title: 'Sobre', component: Sobre, icone_ios: 'ios-information-circle', icone_md: 'md-information-circle' },
      { title: 'Contato', component: Contato, icone_ios: 'ios-contact', icone_md: 'md-contact' },
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

