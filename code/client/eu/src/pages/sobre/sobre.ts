import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class Sobre {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sobre');
  }


}
