import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { Perguntas } from '../perguntas/perguntas';
 
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class Tutorial {

  private usuario;
  
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.usuario = this.navParams.get('user');
    }
  
  proximaTela(){
      this.navCtrl.push(Perguntas, {user: this.usuario});
    }

}
