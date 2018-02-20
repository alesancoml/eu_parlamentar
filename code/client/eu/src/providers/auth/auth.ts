import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthProvider {

  public user        : Observable<any>;

  constructor(
    public http: Http, 
    public googleplus:  GooglePlus,
    public storage: Storage) { }

  login(metodo: string) : Promise<any> {
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
          var a   : any;
          var b   : any;
          var c   : any;
          var d   : any;
          this.storage.get('uid').then((val) => {a = val});
          this.storage.get('displayName').then((val) => {b = val});
          this.storage.get('photoURL').then((val) => {c = val});
          this.storage.get('email').then((val) => {d = val});
          
          var flag: any;
          setInterval(function(){ 
            if (a!= null && flag==null){
              console.log("A: ", a);
              console.log("B: ", b);
              resolve ({'uid': a, 'displayName': b, 'photoURL': c, 'email': d});
              flag = 1;
            }
          }, 1000);
           
        }else{
          reject (false);
        }
      })
    })
  }
  teste(){
    var a   : string;
    var b   : string;

    this.storage.set('name', 'max');
    this.storage.set('uid', '0lIXMoZEZOSF6PqjFKCSR8EZtiI2');

    this.storage.get('name').then((val) => {
      console.log("o nome é ", val);
      a = val;
    })
    this.storage.get('uid').then((val) => {
      console.log("o uid é ", val);
      b = val;
    })
    var i = 0;
    var c: any;
    setInterval(function(){ 
      if (a!= null && c==null){
        console.log("A: ", a);
        console.log("B: ", b);
        c = 1;
      }
    }, 1000);
  }
}
