import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { Validators, FormBuilder } from '@angular/forms';
import { Login } from '../login/login';
import { AdModService } from '../../providers/ad-mod-service/ad-mod-service';

@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class Contato implements OnInit {

  estado: string = "";
  email: string = "";
  Nome: string = "";
  mensagem: string = "";  
  cadastro: any = {}
  private loader;
  retorno: string = "";
  frase="Estado";
  recebido: boolean = false;

  constructor(
    public navCtrl:     NavController, 
    public navParams:   NavParams, 
    public service:     ServiceProvider, 
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public toastCtrl:   ToastController,
    public admob:       AdModService) { }

  ngOnInit(){
    this.loader = this.loadingCtrl.create({content: 'Enviando mensagem. Aguarde...'});
    this.cadastro = this.formBuilder.group({
      email:['', Validators.required],
      uf:['', Validators.required],
      nome:['', Validators.required],
      mensagem:['', Validators.required]
    });
    this.showBanner();
  }

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
  
  postDados(){
    this.loader.present();
    this.service.enviaMensagem(this.cadastro.value)
    .subscribe(
      data => {
        this.loader.dismiss();
        this.retorno = data.retorno;
        this.cadastro.reset();
        this.showToast('middle', "Mensagem enviada com Sucesso. Responderemos em breve.");
      },
      err => {
        this.loader.dismiss();
        this.showToast('middle','Servidor fora do ar! Tente mais tarde.');
        this.navCtrl.setRoot(Login);
      });
  }

}
