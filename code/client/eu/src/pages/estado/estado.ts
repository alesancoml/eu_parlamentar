import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Perguntas } from '../perguntas/perguntas';
import { Tutorial } from '../tutorial/tutorial';
import { ServiceProvider } from '../../providers/service-provider';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-estado',
  templateUrl: 'estado.html',
})
export class Estado implements OnInit {

  estado: string = "";
  email: string = "";
  users: any[];
  cadastro: any = {}
  idUser: string = "";
  private loader;
  

  constructor(
    public navCtrl:     NavController, 
    public navParams:   NavParams, 
    public service:     ServiceProvider, 
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl:   AlertController,
    public toastCtrl:   ToastController ) {
      
    }
  
  ngOnInit(){
    this.cadastro = this.formBuilder.group({
      email:['', Validators.required],
      uf:['', Validators.required]
    });
    this.loader = this.loadingCtrl.create({
      content: 'Cadastrando usuário. Aguarde...'
    });
  }
  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
  }

  postDados(){
    this.loader.present();
    this.service.postData(this.cadastro.value)
    .subscribe(
      data => {
        this.loader.dismiss();
        this.idUser = data.idUser;
        this.proximaTela(this.idUser);
      },
      err => {
        this.loader.dismiss();
        this.showToast('bottom','Servidor fora do ar! Tente mais tarde.')
        this.navCtrl.setRoot(Tutorial);
      });
  }
  proximaTela(idUser){
    this.navCtrl.setRoot(Perguntas, {user: idUser});
  }

}
