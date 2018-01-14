import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detalhamento',
  templateUrl: 'detalhamento.html',
})
export class Detalhamento {
  
  public deputado;
  public opinioes;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.deputado = this.navParams.get('deputado');
    this.opinioes = this.navParams.get('opina');
    console.log(this.deputado);
    console.log(this.opinioes);
  }

  
}
