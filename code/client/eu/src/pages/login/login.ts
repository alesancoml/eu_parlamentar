import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Tutorial } from '../tutorial/tutorial';
import { ServiceProvider } from '../../providers/service-provider';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  idUser: string = "";
  nome: string = "";
  foto: string = "";
  email: string = "";
  iden: string = "";
  campo: string = "";
  logado: boolean = false;
  private loader;

  constructor(
    public googleplus:  GooglePlus,
    public navCtrl:     NavController, 
    public navParams:   NavParams, 
    public service:     ServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl:   ToastController) {}

  ngOnInit() {
    console.log("Tudo carregado")
    this.idUser = "1";
    this.nome = "nome";
    this.foto = "foto";
    this.email = "email";
    this.iden = "id";
    this.loader = this.loadingCtrl.create({});
    //this.campo = "campo";
  }

  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
  }

  login(metodo: string){
    if(metodo=="google" && this.logado==false){
      //this.cadastraUser();
      this.googleplus.login({
        'webClientId':'629457841992-3b81psoutt76to1n8qnfquap6vkudgvj.apps.googleusercontent.com',
        'offline': true
      })
      .then(res => {
        return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then((user: firebase.User) =>{
          this.nome = user.displayName;
          this.foto = user.photoURL;
          this.email = user.email;
          this.iden = user.uid;
          this.cadastraUser();
        })
      })
      .catch(err => {
        console.log(err);
        this.nome = err;
        //this.campo = err;
      });
    }
    if(metodo=="facebook"){
      console.log(metodo);
      //this.navCtrl.setRoot(Tutorial, {user: this.idUser});
    }
  }

  logout(){
    this.googleplus.logout().then(data =>{
      console.log(data);
    }).catch(err => {
      alert(err.message);
    })
  }

  cadastraUser(){
    this.loader.present();
    this.service.postData({"I": this.iden, "N": this.nome, "F": this.foto, "E": this.email})
    .subscribe(
      data => {
        this.loader.dismiss();
        console.log(data);
        //this.logado = true;
        this.navCtrl.setRoot(Tutorial, {user: this.idUser});
      },
      err => {
        //this.campo = err;
        console.log(err);
        this.loader.dismiss();
        this.showToast('middle','Problemas no servidor ou em sua internet.');
        //this.navCtrl.pop();
      }
    );
    
  }

}
