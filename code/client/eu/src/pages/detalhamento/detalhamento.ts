import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalhamento',
  templateUrl: 'detalhamento.html',
})
export class Detalhamento {
  
  public deputado;
  public votos;
  public opinioes;
  public resumos;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.deputado = this.navParams.get('deputado');
    this.opinioes = this.navParams.get('opina');
    this.resumos = this.navParams.get('resumos');
    this.votos = this.deputado[5];
    this.ajuste();
  }
  ajuste(){
    this.votos.forEach((item, index) => {
      if (item[1]=="Nao"){
        this.votos[index][1] = "Não"
      }
    });
    this.opinioes.forEach((item, index) => {
      if (item[1]=="Nao"){
        this.opinioes[index][1] = "Não"
      }
    });
  }

  
}
