import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { Tutorial } from '../tutorial/tutorial';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    
  }

  ngOnInit() {
    console.log("Tudo carregado")
  }

  login(metodo: string){
    //console.log(metodo)
    this.navCtrl.setRoot(Tutorial, {forma: metodo});
  }

}
