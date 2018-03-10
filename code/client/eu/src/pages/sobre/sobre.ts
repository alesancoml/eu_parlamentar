import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdModService } from '../../providers/ad-mod-service/ad-mod-service';

@Component({
  selector: 'page-sobre',
  templateUrl: 'sobre.html',
})
export class Sobre {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public admob:       AdModService) { }

  ionViewDidLoad() {
    this.showAds;
  }

  public showAds(){
    this.admob.showAds();
  }
  
  public hideAds(){
    this.admob.hideAds();
  }
  
}
