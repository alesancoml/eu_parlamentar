import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { Perguntas } from '../perguntas/perguntas';

@Component({
  selector: 'page-teste',
  templateUrl: 'teste.html',
})
export class Teste {

  cadastro: any = {}
  users: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:ServiceProvider) {
    this.getDados();
    }
  
  getDados(){
      this.service.getData().subscribe(
        data => this.users = data,
        err => console.log(err)
      )
  }
  
  proximaTela(){
    this.navCtrl.push(Perguntas);
  }
}
