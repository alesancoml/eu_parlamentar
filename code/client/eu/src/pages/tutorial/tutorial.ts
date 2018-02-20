import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { Perguntas } from '../perguntas/perguntas';
import { Storage } from '@ionic/storage';
 
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
    public navCtrl:     NavController, 
    public navParams:   NavParams,
    public service:     ServiceProvider,
    public toastCtrl:   ToastController,
    public loadingCtrl: LoadingController) {}

  ngOnInit(){
    this.nome       = this.navParams.get('N');
    this.foto       = this.navParams.get('F');
    this.email      = this.navParams.get('E');
    this.iden       = this.navParams.get('I');
    this._loader    = this.loadingCtrl.create();
    this.cadastraUser();
  }

  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
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
        this.showToast('middle',err);
      }
    );
  }

  proximaTela(){
    this.navCtrl.setRoot(Perguntas, {user: this.idUsuario});
  }

}
