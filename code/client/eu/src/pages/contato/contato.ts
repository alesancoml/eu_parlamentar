import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { Validators, FormBuilder } from '@angular/forms';

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
    public toastCtrl:   ToastController ) {
  }

  ngOnInit(){
    this.loader = this.loadingCtrl.create({content: 'Enviando mensagem. Aguarde...'});
    this.cadastro = this.formBuilder.group({
      email:['', Validators.required],
      uf:['', Validators.required],
      nome:['', Validators.required],
      mensagem:['', Validators.required]
    });
  }

  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 5000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
  }

  postDados(){
    this.loader.present();
    this.service.enviaMensagem(this.cadastro.value)
    .subscribe(
      data => {
        this.loader.dismiss();
        this.retorno = data.retorno;
        this.cadastro.reset();
        this.showToast('middle', "Mensagem enviada com sucesso. Responderemos em breve.");
      },
      err => {
        this.loader.dismiss();
        this.showToast('middle','Servidor fora do ar! Tente mais tarde.')
      });
  }

}