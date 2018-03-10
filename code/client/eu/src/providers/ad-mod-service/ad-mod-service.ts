import { Platform } from 'ionic-angular/';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

interface AdMobType {
  banner: string,
  interstitial: string,
  video: string
  }

@Injectable()
export class AdModService {

    private admobid: AdMobType;
    private bannerPrepared: boolean = false;
    private interstitialPrepared: boolean = false;
    private videoPrepared: boolean = false;
    private controleExibicao: number = 1;

    constructor(
    public http: HttpClient, 
    private adMob: AdMobFree,
    private _platform: Platform) {

        this._platform.ready().then(() => {
            if( _platform.is('android') ) {
                this.admobid = {
                banner: 'ca-app-pub-8206886605835078/2480346777',
                interstitial: 'ca-app-pub-8206886605835078/5365885632',
                video: 'ca-app-pub-8206886605835078/5941714099'
                };
            } 
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
            this.removeBanner();
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
            this.showInterstitial();
        }).catch((err) => {
            throw new Error(err);
        })
       
    }

    showInterstitial() {
        this.adMob.interstitial.show().then(() => {
            this.interstitialPrepared = false;   
        }).catch((err) => {
            throw new Error(err);
        });
    }

    prepareVideoRewards() {
        if (this.controleExibicao % 4 === 0){
            this.controleExibicao = 1;
            const videoRewardsConfig: AdMobFreeRewardVideoConfig  = {
                id: this.admobid.video,
                isTesting: false,
                autoShow: true
            };
            this.adMob.rewardVideo.config(videoRewardsConfig);
            this.adMob.rewardVideo.prepare().then(() => {
                this.videoPrepared = true;
            }).catch((err) => {
                throw new Error(err);
            })
            this.showVideoRewards()
        }
        else{
            this.controleExibicao = this.controleExibicao + 1;
        }
    }
    
    showVideoRewards() {
        if(this.videoPrepared) {
            this.adMob.rewardVideo.show().then(() => {
                this.videoPrepared = false;   
            }).catch((err) => {
                throw new Error(err);
            });
        }
    }

    showAds(){
        if (this.controleExibicao % 4 === 0){
            this.controleExibicao = 1;
            this.prepareInterstitial();
            this.showInterstitial();
        }
        else{
            this.controleExibicao = this.controleExibicao + 1;
            this.prepareBanner();
            this.showBanner();
        }
    }
    hideAds(){
        this.hideBanner();
        this.removeBanner();
    }

}
