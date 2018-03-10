import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform, Navbar } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service-provider';
import { Detalhamento } from '../detalhamento/detalhamento';
import { Login } from '../login/login';
import { AdModService } from '../../providers/ad-mod-service/ad-mod-service';

@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html',
})
export class Resultados implements OnInit {

  public perguntas;
  public respostas;
  public usuario;
  public estado;
  public opinioes:any[];
  public deputados:any[];
  public scores:any[];
  public resumos:any[];
  private loader;
  @ViewChild(Navbar) navBar: Navbar;

  constructor(
    public platform:    Platform,
    public navCtrl:     NavController, 
    public navParams:   NavParams, 
    public service:     ServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl:   ToastController,
    public admob:       AdModService) { }
  
  ngOnInit(){
    this.loader = this.loadingCtrl.create({content: 'Calculando similaridade no servidor. Aguarde...'});
    this.perguntas = this.navParams.get('Perguntas');
    this.respostas = this.navParams.get('Respostas');
    this.usuario   = this.navParams.get('Usuario');
    this.resumos   = this.navParams.get('Resumos');
    this.estado    = this.navParams.get('Estado');
    this.postDados();
  }

  ionViewWillEnter(){
    this.hideAds();
  }

  showToast(position: string, mensagem: string) {
    let toast = this.toastCtrl.create({
      duration: 3000,
      message: mensagem,
      position: position
    });
    toast.present(toast);
  }

  public hideAds(){
    this.admob.hideAds();
  }

  postDados(){
    this.loader.present();
    this.service.postRespostas({"P": this.perguntas, "R": this.respostas, "U": this.usuario, "E": this.estado})
    .subscribe(
      data => {
        this.loader.dismiss();
        this.opinioes = data.opinioes;
        this.scores = data.pontuacao;
        this.showToast('bottom','Toque em um deputado para ver seus votos.');
      },
      err => {
        console.log(err);
        this.loader.dismiss();
        this.showToast('middle','Problemas no servidor ou em sua internet. Tente mais tarde.');
        this.navCtrl.setRoot(Login);
        this.navCtrl.pop();
      }
    );
  }
  detalhamento(linha: any[]){
    this.navCtrl.push(Detalhamento, {deputado: linha, opina: this.opinioes, resumos: this.resumos});
  }

  setBackButtonAction(){
    this.navCtrl.pop();
  }

}
