import { Platform } from 'ionic-angular/';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

interface AdMobType {
  banner: string,
  interstitial: string
  }

@Injectable()
export class AdModService {

  private admobid: AdMobType;
  private bannerPrepared: boolean = false;
  private interstitialPrepared: boolean = false;

  constructor(
    public http: HttpClient, 
    private adMob: AdMobFree,
    private _platform: Platform) {
    
    this._platform.ready().then(() => {
        if( _platform.is('android') ) {
            this.admobid = {
            banner: 'ca-app-pub-8206886605835078/2480346777',
            interstitial: 'ca-app-pub-8206886605835078/5365885632'
            };
        } 
        else if(_platform.is('ios')) {
            // this.admobid = {
            //   banner: 'ca-app-pub-xxx/xxx',
            //   interstitial: 'ca-app-pub-xxx/xxx'
            // };
        } else {
            // this.admobid = {
            //   banner: 'ca-app-pub-xxx/xxx',
            //   interstitial: 'ca-app-pub-xxx/xxx'
            // };
        };
    })
  }

  prepareBanner() {
    const bannerConfig: AdMobFreeBannerConfig = {
        id: this.admobid.banner, 
        size: 'SMART_BANNER', 
        autoShow: true,
        isTesting: false,
        bannerAtTop: false,
        overlap: false,
        offsetTopBar: false
    }
    this.adMob.banner.config(bannerConfig);
    this.adMob.banner.prepare().then(() => {
        this.bannerPrepared = true;  
    }).catch((err) => {
       throw new Error(err);
    });
  }
  showBanner() {
      if (this.bannerPrepared) {
          this.adMob.banner.show().then(() => {
              this.bannerPrepared = false;
          }).catch((err) => {
              throw new Error(err);
          });
      }
  }
  hideBanner() {
      this.adMob.banner.hide().then(() => {
          this.bannerPrepared = true;
      }).catch((err) => {
          throw new Error(err);
      });
  }
  removeBanner() {
      this.adMob.banner.remove().then(() => {
          this.bannerPrepared = false;
      }).catch((err) => {
          throw new Error(err);
      });
  }
  prepareInterstitial() {
      const interstitialConfig: AdMobFreeInterstitialConfig = {
          id: this.admobid.interstitial,
          isTesting: false,
          autoShow: true
      };
      this.adMob.interstitial.config(interstitialConfig);
      this.adMob.interstitial.prepare().then(() => {
          this.interstitialPrepared = true;
      }).catch((err) => {
          throw new Error(err);
      })
  }
  showInterstitial() {
      if(this.interstitialPrepared) {
          this.adMob.interstitial.show().then(() => {
              this.interstitialPrepared = false;   
          }).catch((err) => {
              throw new Error(err);
          });
      }
  }
}
