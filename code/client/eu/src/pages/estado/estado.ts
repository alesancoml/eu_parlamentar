import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';
import { Perguntas } from '../perguntas/perguntas';
import { ServiceProvider } from '../../providers/service-provider';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-estado',
  templateUrl: 'estado.html',
})
export class Estado {

  estado: string = "";
  email: string = "";
  users: any[];
  cadastro: any = {}
  idUser: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:ServiceProvider, public formBuilder: FormBuilder) {
    this.cadastro = this.formBuilder.group({
      email:['', Validators.required],
      uf:['', Validators.required]
    })
  }

  postDados(){
    this.service.postData(this.cadastro.value)
    .subscribe(
      data => {
        console.log(data.mensage);
        this.idUser = data.idUser;
        this.proximaTela(this.idUser);
      },
      err => console.log(err)
    );
  }

  proximaTela(idUser){
    this.navCtrl.push(Perguntas, {user: idUser});
  }

}
