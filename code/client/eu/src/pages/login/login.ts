import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Component }  from '@angular/core';
import { Tutorial }           from '../tutorial/tutorial';
import { GooglePlus }         from '@ionic-native/google-plus';
import { AuthProvider } from './../../providers/auth/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login  {

  public logado : boolean;
  public protecao : boolean = false;

  constructor(
    public googleplus:              GooglePlus,
    public navCtrl:                 NavController, 
    public navParams:               NavParams, 
    public toastCtrl:               ToastController,
    private _AUTH:                  AuthProvider) { }
  
  ionViewDidLoad(){
    this._AUTH.logged()
    .then(res => {
      this.logado = true;
    })
    .catch(() =>{
      this.logado = false;
    })
  }
  
  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
  }

  login(metodo : string): void {
    // let uid = 1;
    // let displayName = "Alesanco";
    // let photoURL = "foto";
    // let email = "alesancoml@gmail.com";
    // this.navCtrl.setRoot(Tutorial, {I: uid, N: displayName, F: photoURL, E: email});
    this.protecao = true;
    this._AUTH.logged()
      .then(res => {
        this.navCtrl.setRoot(Tutorial, {I: res.uid, N: res.displayName, F: res.photoURL, E: res.email});
      })
      .catch(() =>{
        this._AUTH.login(metodo)
        .then(res => {
          this.navCtrl.setRoot(Tutorial, {I: res.uid, N: res.displayName, F: res.photoURL, E: res.email});
        })
        .catch(err => {
          this.protecao = false;
        });
      })
  };  
}
