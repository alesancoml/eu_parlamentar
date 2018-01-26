import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { Tutorial } from '../tutorial/tutorial';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  idUser: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    console.log("Tudo carregado")
    this.idUser = "47";
  }

  login(metodo: string){
    this.navCtrl.setRoot(Tutorial, {user: this.idUser});
  }

}
