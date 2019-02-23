import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  config = {
    apiKey: 'AIzaSyDjsm9dyhKL1V3VXiB7ktRt5lUQiT7zFXc',
    authDomain: 'guidit-30049.firebaseapp.com',
    databaseURL: 'https://guidit-30049.firebaseio.com',
    projectId: 'guidit-30049',
    storageBucket: 'guidit-30049.appspot.com',
    messagingSenderId: '942305466052'
  };

  uiConfig = {
    signInSuccessUrl: 'confirm',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
  };

  confirmation: boolean = false;

  constructor() {
    // Initialize Firebase
    firebase.initializeApp(this.config);
  }

  loadAuthButtons() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', this.uiConfig);
  }

  trackLoginStatus() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let uid = user.uid;
        this.checkConfirmationAlert();
        user.getIdToken().then(accessToken => {
          document.getElementById('sign-in-status').textContent = `Logged in as ${displayName}`;
          document.getElementById('sign-in').textContent = 'Log out';
          console.log(JSON.stringify({
              displayName: displayName,
              email: email,
              emailVerified: emailVerified,
              uid: uid,
              accessToken: accessToken,
            }, null, '  '));
        });
      } else {
        // User is signed out.
        document.getElementById('sign-in-status').textContent = 'Logged out';
        document.getElementById('sign-in').textContent = 'Log in';
        console.log('logged out');
      }
    }, function(error) {
      console.log(error);
    });
  }

  checkConfirmationAlert() {
    let user = firebase.auth().currentUser;
    if (!user.emailVerified) {
        setTimeout(() => this.confirmation = true, 400);
    }
    else this.confirmation = false;
  }

}
