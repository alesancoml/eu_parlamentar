import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import { Sobre } from '../pages/sobre/sobre';
import { Tutorial } from '../pages/tutorial/tutorial';
import { Perguntas } from '../pages/perguntas/perguntas';
import { Contato } from '../pages/contato/contato';
import { Resultados } from '../pages/resultados/resultados';
import { Detalhamento } from '../pages/detalhamento/detalhamento';
import { GooglePlus }         from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';
import { AdModService } from '../providers/ad-mod-service/ad-mod-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  rootPage:any = Login;

  private pages: Array<{title: string, component: any, icone_ios: string, icone_md: string}>;

  constructor(
    public platform:      Platform, 
    public statusBar:     StatusBar, 
    public splashScreen:  SplashScreen,
    public googleplus:    GooglePlus,
    public toastCtrl:     ToastController,
    private _AUTH:        AuthProvider,
    public admob:         AdModService) {

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
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;

      this.platform.registerBackButtonAction(() => {
        
        let view = this.nav.getActive();
         if (view.instance instanceof Login) {
          if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
              this.platform.exitApp(); //Exit from app
          } else {
            let toast = this.toastCtrl.create({
              message: 'Toque novamente para fechar a aplicação.',
              duration: 2000,
              position: 'bottom',
            });
            toast.present();     
            lastTimeBackPress = new Date().getTime();
          } 
        } else if (view.instance instanceof Tutorial) {
        } else if (view.instance instanceof Perguntas) {
          this.nav.setRoot(Login);
        } else if (view.instance instanceof Resultados || view.instance instanceof Detalhamento) {
          this.nav.pop();
        }
      });
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
    this.hideAds();
    if(page.title == 'Logout'){
      this._AUTH.logout()
        .then((data : any) => {
          this.googleplus.trySilentLogin({})
            .then(res => {
              this.googleplus.logout()
                .then(res => {
                  this.nav.setRoot(page.component);
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              this.googleplus.disconnect()
                .then(res => {
                  console.log("logout user")
                })
                .catch(err => {
                  console.log(err);
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
          console.log("erro");
        })
    }
    else {
      this.nav.setRoot(page.component);
    }
  }

  public hideAds(){
    this.admob.hideAds();
  }
}

