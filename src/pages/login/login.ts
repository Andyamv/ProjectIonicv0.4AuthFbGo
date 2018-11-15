import { Component, Provider } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CreacionUsuarioPage } from '../creacion-usuario/creacion-usuario';
import { ContactenosPage } from '../contactenos/contactenos';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { async } from '../../../node_modules/rxjs/internal/scheduler/async';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})

export class LoginPage {

  displayName;
  //constructor(public navCtrl: NavController, public navParams: NavParams)
  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth, private fb: Facebook, private googlePlus: GooglePlus, private platform: Platform) {
    afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToPrincipal(){
    this.navCtrl.setRoot(HomePage);
  }
  goToCreacionUsuario(params){
    if (!params) params = {};
    this.navCtrl.push(CreacionUsuarioPage);  
  }
  
  goToContact(params){
    if (!params) params = {};
    this.navCtrl.push(ContactenosPage);  
  }
  
  goToConnectFB() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.navCtrl.setRoot(HomePage)
      });
  }
}
  goToConnectGoogle()/*: Promise<any>*/ {
    if (this.platform.is('cordova')) {
      return this.googlePlus.login(['email', 'public_profile']).then(res => {
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(googleCredential);
      })
    }
    else {
    return this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.navCtrl.setRoot(HomePage)
      });
  }

    /*return new Promise((resolve, reject) => { 
        this.googlePlus.login({
          'webClientId': '328485920525-90m2v35m0h64c2se0m52dggegvuom7pd.apps.googleusercontent.com',
          'offline': true
        }).then( res => {
                const googleCredential = firebase.auth.GoogleAuthProvider
                    .credential(res.idToken);
  
                firebase.auth().signInWithCredential(googleCredential)
              .then( response => {
                  console.log("Firebase success: " + JSON.stringify(response));
                  resolve(response)
              });
        }, err => {
            console.error("Error: ", err)
            reject(err);
        });
      });
      }*/
  }
}

