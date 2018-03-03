import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { Perguntas } from '../perguntas/perguntas';
import { Login } from '../login/login';
import { AdModService } from '../../providers/ad-mod-service/ad-mod-service';
 
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class Tutorial implements OnInit {

  public nome;
  public foto;
  public email;
  public iden;
  public idUsuario;
  private _loader;

  constructor(
    public platform:                Platform,
    public navCtrl:                 NavController, 
    public navParams:               NavParams,
    public service:                 ServiceProvider,
    public toastCtrl:               ToastController,
    public loadingCtrl:             LoadingController,
    public admob:                   AdModService) { }

  ngOnInit(){
    this.nome       = this.navParams.get('N');
    this.foto       = this.navParams.get('F');
    this.email      = this.navParams.get('E');
    this.iden       = this.navParams.get('I');
    this._loader    = this.loadingCtrl.create();
    this.showBanner();
    this.cadastraUser();
  }

  public volta(){ }
  
  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
  }

  public showBanner(){
    this.admob.prepareBanner();
    this.admob.showBanner();
  }
  
  public hideBanner(){
    this.admob.hideBanner();
    this.admob.removeBanner();
  }

  cadastraUser(){
    this._loader.present();
    this.service.postData({"I": this.iden, "N": this.nome, "F": this.foto, "E": this.email})
    .subscribe(
      data => {
        this._loader.dismiss();
        this.idUsuario = data.idUser;
      },
      err => {
        this._loader.dismiss();
        this.showToast('middle','Servidor fora do ar! Tente mais tarde.');
        this.navCtrl.setRoot(Login);
      }
    );
  }

  proximaTela(){
    this.hideBanner();
    this.navCtrl.setRoot(Perguntas, {user: this.idUsuario});
  }

}
