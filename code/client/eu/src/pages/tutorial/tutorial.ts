import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { Estado } from '../estado/estado';
 
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class Tutorial {

  private _variavel;
  
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this._variavel = this.navParams.get('forma');
      //console.log(this._variavel);
    }
  
  proximaTela(){
      this.navCtrl.push(Estado);
    }

}
