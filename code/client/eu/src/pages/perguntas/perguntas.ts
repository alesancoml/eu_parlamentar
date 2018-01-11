import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { FormGroup, FormControl} from '@angular/forms';
import { Teste2 } from '../teste2/teste2';
import { Resultados } from '../resultados/resultados';

@Component({
  selector: 'page-perguntas',
  templateUrl: 'perguntas.html',
})
export class Perguntas {

  cadastro: any = {};
  perguntas: any[];
  langs;
  langForm;
  respostas = ["Sim","Não","Abs"];
  coleta1=[];
  coleta2=[];
  indice;
  private usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:ServiceProvider) {
    this.usuario = this.navParams.get('user');
    this.getDados();
    this.langForm = new FormGroup({
      "langs": new FormControl()
    });
  }
  
  getDados(){
      this.service.getPerguntas().subscribe(
        data => this.perguntas = data,
        err => console.log(err)
      )
  }

  doSubmit(resp,pergunta) {
    if (!this.coleta1.some(x => x === pergunta)){
      this.coleta1.push(pergunta);
      this.coleta2.push(resp);
      
    }else{
      this.indice = this.coleta1.indexOf(pergunta);
      this.coleta2[this.indice] = resp;
    }
  }
  enviar(){
    if(this.coleta1.length==this.perguntas.length){
      this.navCtrl.push(Resultados,{Perguntas: this.coleta1, Respostas: this.coleta2, Usuario: this.usuario});
    } else{
      console.log("Ainda falta responder alguma questão!");
    }
  }

}
