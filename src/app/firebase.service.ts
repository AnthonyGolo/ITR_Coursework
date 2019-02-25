import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {Subject} from 'rxjs';

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

  db;

  confirmation: boolean = false;
  runConfirmationTimer: boolean = false;
  isConfirmationTimerRunning: Subject<boolean> = new Subject<boolean>();
  startTimerFrom: number = 60;
  emailLastResent: number = 0; // SHOULD BE A FIELD IN DB TO COMPARE


  constructor() {
    // Initialize Firebase
    firebase.initializeApp(this.config);
    this.isConfirmationTimerRunning.subscribe((value) => {
      this.runConfirmationTimer = value;
    });
    this.db = firebase.firestore();
  }

  toggleConfirmationTimer(value: boolean) {
    this.isConfirmationTimerRunning.next(value);
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

        console.log('reached trackLoginStatus');
        if (this.emailLastResent != 0) this.isResendShown(user, this.emailLastResent);
        else this.isResendShown(user);
        this.checkConfirmationAlert(user);

        user.getIdToken().then(accessToken => {
          document.getElementById('sign-in-status').textContent = `Logged in as ${displayName}`;
          document.getElementById('sign-in').textContent = 'Log out';

          this.db.collection("users").add({  // UNLESS UID IN DB
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            emailLastResent: this.emailLastResent,
            uid: user.uid,
            isBlocked: false,
            nightTheme: false,
            enableRussian: false
          })
            .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });

          /*console.log(JSON.stringify({
              displayName: displayName,
              email: email,
              emailVerified: emailVerified,
              uid: uid,
              accessToken: accessToken,
            }, null, '  '));*/
        });
      }
      else {
        // User is signed out.
        document.getElementById('sign-in-status').textContent = 'Logged out';
        document.getElementById('sign-in').textContent = 'Log in';
        console.log('logged out');
      }
    }, function(error) {
      console.log(error);
    });
  }

  isResendShown(user, lastResent = Date.parse(user.metadata.creationTime)) {
    let currentTime = new Date().getTime();
    console.log('reached isResendShown');
    console.log(currentTime, lastResent);
    if ((currentTime - lastResent) > 60000) this.toggleConfirmationTimer(false);
    else {
      this.toggleConfirmationTimer(true);
      this.emailLastResent = currentTime;
      this.startTimerFrom = Math.floor((currentTime - lastResent) / 1000);
      console.log('email last resent at, start Timer from', this.emailLastResent, this.startTimerFrom);
    }
  }

  checkConfirmationAlert(user) {
    console.log('reached checkConfirmationAlert');
    this.confirmation = !user.emailVerified;
  }

}
