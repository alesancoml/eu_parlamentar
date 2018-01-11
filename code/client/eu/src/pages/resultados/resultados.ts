import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';

@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class Resultados {

  public perguntas;
  public respostas;
  public usuario;
  public estado;
  public opinioes:any[];
  public deputados:any[];
  public scores:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:ServiceProvider) {
    this.perguntas = navParams.get('Perguntas');
    this.respostas = navParams.get('Respostas');
    this.usuario = navParams.get('Usuario');
    this.postDados();
  }

  postDados(){
    this.service.postRespostas({"P": this.perguntas, "R": this.respostas, "U": this.usuario})
    .subscribe(
      data => {
        this.estado = data.estado;
        this.opinioes = data.opinioes;
        this.scores = data.pontuacao;
        console.log(this.scores)
      },
      err => console.log(err)
    );
  }

  

}
