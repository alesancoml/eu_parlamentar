import { Component, ViewChild, trigger, state, OnInit } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
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
import { GooglePlus }         from '@ionic-native/google-plus';
import firebase               from 'firebase';
import { AuthProvider } from './../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  rootPage:any = Login;

  private pages: Array<{title: string, component: any, icone_ios: string, icone_md: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public googleplus:  GooglePlus,
    public toastCtrl:   ToastController,
    private _AUTH        : AuthProvider) {

    this.pages = [
      // { title: 'Home',      component: Login,     icone_ios: 'ios-home',                icone_md: 'md-home' },
      { title: 'Tutorial',  component: Tutorial,  icone_ios: 'ios-bulb',                icone_md: 'md-bulb' },
      { title: 'Sobre',     component: Sobre,     icone_ios: 'ios-information-circle',  icone_md: 'md-information-circle' },
      { title: 'Contato',   component: Contato,   icone_ios: 'ios-contact',             icone_md: 'md-contact' },
      { title: 'Logout',    component: Login,     icone_ios: 'ios-log-out',             icone_md: 'md-log-out' },
    ];
  
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
  }
    
  openPage(page: any) {
    if(page.title == 'Logout'){
      this._AUTH.logout()
        .then((data : any) => {
          this.googleplus.trySilentLogin({})
            .then(res => {
              this.googleplus.logout()
                .then(res => {
                  this.nav.setRoot(page.component);
                })
                .catch(error => {
                  alert(error);
                });
            })
            .catch(error => {
              this.googleplus.disconnect()
                .then(res => {
                  console.log("logout user")
                })
                .catch(error => {
                  alert(error);
                });
            });
          this.nav.setRoot(page.component);   
        })
        .catch((err : any) => {
          console.log(err)
        });
    }
    if(page.title == 'Tutorial'){
      this._AUTH.logged()
        .then(res => {
          this.nav.setRoot(Tutorial, {I: res.uid, N: res.displayName, F: res.photoURL, E: res.email});
        })
        .catch(() =>{
          alert("Erro");
        })
    }
    else {
      this.nav.setRoot(page.component);
    }
  }
}

