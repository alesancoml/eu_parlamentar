import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public admob:       AdModService) {

      this.deputado = this.navParams.get('deputado');
      this.opinioes = this.navParams.get('opina');
      this.resumos = this.navParams.get('resumos');
      this.votos = this.deputado[5];
      this.ajuste();
      this.hideBanner();
      this.Interstitial();
    }

  public hideBanner(){
    this.admob.hideBanner();
    this.admob.removeBanner();
  }
  
  public Interstitial(){
    this.admob.prepareInterstitial();
    this.admob.showInterstitial();
  }
  
  ajuste(){
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
