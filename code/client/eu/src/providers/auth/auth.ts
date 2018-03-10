import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  public user   : Observable<any>;
  public coisa   : any = 0;

  constructor(
    public http:        Http, 
    public googleplus:  GooglePlus,
    public storage:     Storage) { }

  login(metodo: string) : Promise<any> {
    if(metodo=="google"){
      return new Promise((resolve, reject) => {
        this.googleplus.login({
          'webClientId':'629457841992-3b81psoutt76to1n8qnfquap6vkudgvj.apps.googleusercontent.com',
          'offline': true
        })
        .then(res => {
          return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then((user: firebase.User) => {
            this.storage.set('uid', user.uid);
            this.storage.set('displayName',user.displayName);
            this.storage.set('photoURL',user.photoURL);
            this.storage.set('email',user.email);
            this.storage.set('logged',true);
            resolve({'uid': user.uid, 'displayName': user.displayName, 'photoURL': user.photoURL, 'email': user.email});
          })
        })
        .catch((err) => {
          reject(err);
        });
      });
    }
    if(metodo=="facebook"){
      return new Promise((resolve, reject) => {
        var user: any;
        var provider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithRedirect(provider).then(()=>{ //testar com o res aqui
          firebase.auth().getRedirectResult()
            .then(res => {
              user  = res.user; //quando coloco a função do banco local aqui, não reconhece.
              this.bancoLocal(user.uid,user.displayName,user.photoURL,user.email);
              resolve({'uid': user.uid, 'displayName': user.displayName, 'photoURL': user.photoURL, 'email': user.email}); 
            })
            .catch(err => {
              var errorMessage = err.message;
              alert(errorMessage);
              reject(err);
            });
            
            
        })
      })
    }
  }
  bancoLocal(uid, displayName, photoURL, email){
    this.storage.set('uid', uid);
    this.storage.set('displayName',displayName);
    this.storage.set('photoURL',photoURL);
    this.storage.set('email',email);
    this.storage.set('logged',true);
  }

  logout():Promise<any> {
    return new Promise((resolve,reject)=>{ 
      var user = firebase.auth().currentUser;
      if (user) {
        this.storage.remove('uid');
        this.storage.remove('displayName');
        this.storage.remove('photoURL');
        this.storage.remove('email');
        this.storage.set('logged',false);
        return user.delete().then(function() {
          resolve({success :true}); 
        }).catch(function(error) {
          reject(error); 
        });
      }
      else {
        reject("Usuário já removido!"); 
      }
     
    }
  )};

  logged():Promise<any>{
    return new Promise((resolve,reject)=>{ 
    this.storage.get('logged')
      .then(res => {
        if (res){
          let uid           : any;
          var displayName   : any;
          var photoURL      : any;
          var email         : any;

          this.storage.get('uid').then((val) => {uid = val});
          this.storage.get('displayName').then((val) => {displayName = val});
          this.storage.get('photoURL').then((val) => {photoURL = val});
          this.storage.get('email').then((val) => {email = val});

          let sinal = this.coisa;
          var intervalo = setInterval(function(){ 
            if (uid!= null && sinal==0){
              sinal = 1;
              clearTimeout(intervalo);
              resolve ({'uid': uid, 'displayName': displayName, 'photoURL': photoURL, 'email': email});
            }
          }, 1000);
        }else{
          reject (false);
        }
      })
    })
  }
}


