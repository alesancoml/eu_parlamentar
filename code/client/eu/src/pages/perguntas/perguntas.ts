import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { FormGroup, FormControl } from '@angular/forms';
import { Tutorial } from '../tutorial/tutorial';
import { Resultados } from '../resultados/resultados';

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
  frase="Informe um Estado?";
  private loader;

  constructor(
    public navCtrl:     NavController, 
    public navParams:   NavParams, 
    public service:     ServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl:   ToastController) {}
  
  ngOnInit(){
    this.usuario = this.navParams.get('user');
    this.loader = this.loadingCtrl.create({content: 'Buscando perguntas. Aguarde...'});
    this.getDados();
    this.langForm = new FormGroup({
      "langs": new FormControl()
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

  getDados(){
    //this.loader.present();
    this.service.getPerguntas().subscribe(
      data => {
        //this.loader.dismiss();
        this.perguntas = data},
      err => {
        //this.loader.dismiss();
        this.showToast('middle','Servidor fora do ar! Tente mais tarde.');
        this.navCtrl.setRoot(Tutorial);
      }
    )
  }

  doSubmit(resp,pergunta,resumo) {
    if (!this.coleta1.some(x => x === pergunta)){
      this.coleta1.push(pergunta);
      this.coleta2.push(resp);
      this.coleta3.push(resumo);
      console.log(this.coleta1);
      console.log(this.coleta2);
      console.log(this.coleta3);
      
    }else{
      this.indice = this.coleta1.indexOf(pergunta);
      this.coleta2[this.indice] = resp;
      console.log(this.coleta1);
      console.log(this.coleta2);
      console.log(this.coleta3);
    }
  }
  enviar(){
    if (!this.estado){
      this.showToast('middle','Favor, informar um Estado!');
    }
    else{
      if(this.coleta1.length==this.perguntas.length){
        this.navCtrl.push(Resultados,{Perguntas: this.coleta1, Respostas: this.coleta2, Usuario: this.usuario, Estado: this.estado, Resumos: this.coleta3});
      } else{
        this.showToast('middle','Favor, responder todas as questões!');
      }
    }
   
  }

}
