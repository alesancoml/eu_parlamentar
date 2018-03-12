import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { FormGroup, FormControl } from '@angular/forms';
import { Login } from '../login/login';
import { Resultados } from '../resultados/resultados';
import { AdModService } from '../../providers/ad-mod-service/ad-mod-service';

@Component({
  selector: 'page-perguntas',
  templateUrl: 'perguntas.html',
})
export class Perguntas implements OnInit {

  cadastro: any = {};
  perguntas: any[];
  langs;
  langForm;
  respostas = ["Sim","Não","Abs"];
  coleta1=[];
  coleta2=[];
  coleta3=[];
  indice;
  private usuario;
  private estado: string = "";
  frase="Informe um Estado:";
  private loader;

  constructor(
    public platform:    Platform,
    public navCtrl:     NavController, 
    public navParams:   NavParams, 
    public service:     ServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl:   ToastController,
    public admob:       AdModService) { }
  
  ngOnInit(){
    this.usuario = this.navParams.get('user');
    this.loader = this.loadingCtrl.create({content: 'Buscando perguntas. Aguarde...'});
    this.getDados();
    this.langForm = new FormGroup({
      "langs": new FormControl()
    });
  }
  // ionViewWillEnter(){
  //   this.hideAds();
  // }

  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
  }

  // public hideAds(){
  //   this.admob.hideAds();
  // }

  getDados(){
    this.loader.present();
    this.service.getPerguntas().subscribe(
      data => {
        this.loader.dismiss();
        this.perguntas = data},
      err => {
        this.loader.dismiss();
        this.showToast('middle','Servidor fora do ar! Tente mais tarde.');
        this.navCtrl.setRoot(Login);
      }
    )
  }

  doSubmit(resp,pergunta,resumo) {
    if (!this.coleta1.some(x => x === pergunta)){
      this.coleta1.push(pergunta);
      this.coleta2.push(resp);
      this.coleta3.push(resumo);    
    }else{
      this.indice = this.coleta1.indexOf(pergunta);
      this.coleta2[this.indice] = resp;
    }
  }
  enviar(){
    if (!this.estado){
      this.showToast('middle','Favor, informar um Estado (campo amarelo no topo da tela).');
    }
    else{
      if(this.coleta1.length==this.perguntas.length){
        this.navCtrl.push(Resultados,{Perguntas: this.coleta1, Respostas: this.coleta2, Usuario: this.usuario, Estado: this.estado, Resumos: this.coleta3});
      } else {
        this.showToast('middle','Favor, responder todas as questões!');
      }
    }
   
  }

}
