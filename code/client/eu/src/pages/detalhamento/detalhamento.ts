import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Platform } from 'ionic-angular';
import { AdModService } from '../../providers/ad-mod-service/ad-mod-service';

@Component({
  selector: 'page-detalhamento',
  templateUrl: 'detalhamento.html',
})
export class Detalhamento {
  
  public deputado;
  public votos;
  public opinioes;
  public resumos;
  @ViewChild(Navbar) navBar: Navbar;

  constructor(
    public navCtrl:                 NavController, 
    public navParams:               NavParams,
    public platform:                Platform,
    public admob:                   AdModService) {

      this.deputado = this.navParams.get('deputado');
      this.opinioes = this.navParams.get('opina');
      this.resumos  = this.navParams.get('resumos');
      this.votos    = this.deputado[5];
      this.ajusteVotos();
      this.showBanner();
    }

    ionViewDidLoad() {
      this.setBackButtonAction()
    }

    setBackButtonAction(){
      this.navBar.backButtonClick = () => {
        this.navCtrl.pop();
      }
    }
  
  public showBanner(){
    this.admob.prepareBanner();
    this.admob.showBanner();
  }
  
  public hideBanner(){
    this.admob.hideBanner();
    this.admob.removeBanner();
  }
  
  public Interstitial(){
    this.admob.prepareInterstitial();
    this.admob.showInterstitial();
  }
  
  ajusteVotos(){
    this.votos.forEach((item, index) => {
      if (item[1]=="Nao"){
        this.votos[index][1] = "Não"
      }
    });
    this.opinioes.forEach((item, index) => {
      if (item[1]=="Nao"){
        this.opinioes[index][1] = "Não"
      }
    });
  }

}
