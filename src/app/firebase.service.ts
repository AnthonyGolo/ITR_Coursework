import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

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

  db;
  confirmation: boolean = false;
  runConfirmationTimer: boolean = false;
  isConfirmationTimerRunning: Subject<boolean> = new Subject<boolean>();
  startTimerFrom: number = 60;
  emailLastResent: number = 0; // SHOULD BE A FIELD IN DB TO COMPARE
  fui;
  authUiLoaded: boolean = false;

  constructor(private router: Router) {
    // Initialize Firebase
    firebase.initializeApp(this.config);
    this.db = firebase.firestore();
    this.fui = new firebaseui.auth.AuthUI(firebase.auth());
    this.isConfirmationTimerRunning.subscribe((value) => {
      this.runConfirmationTimer = value;
    });
    this.trackLoginStatus();
  }

  checkConfirmationAlert(user) {
    this.confirmation = !user.emailVerified;
  }

  addUsertoDb(user) {
    let usersRef = this.db.collection('users');
    usersRef.where('email', '==', user.email)
      .get()
      .then(querySnapshot => {
        console.log('querysnapshot', querySnapshot);
        if (!querySnapshot.docs[0]) {
          usersRef.add({  // UNLESS UID IN DB
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            emailLastResent: this.emailLastResent,
            uid: user.uid,
            isBlocked: false,
            nightTheme: false,
            enableRussian: false
          }).then(function(docRef) {
            console.log('Document written with ID: ', docRef.id);
          });
        }
        else {
          console.log('user with such email already exists');
        }
      });
  }

  getEmailLastResent(user) {
    let usersRef = this.db.collection('users');
    console.log('USER INFO', user);
    usersRef.where('email', '==', user.email)
      .get()
      .then(querySnapshot => {
        console.log('maillastresent snapshot', querySnapshot);
        console.log('needed timestamp', querySnapshot.docs[0].emailLastResent);
        return querySnapshot.docs[0].emailLastResent;
      });
  }

  trackLoginStatus() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        user.getIdToken().then(accessToken => {
          document.getElementById('sign-in-status').textContent = `Logged in as ${user.displayName}`;
          document.getElementById('sign-in').textContent = 'Log out';
          this.checkConfirmationAlert(user);
          console.log('reached trackLoginStatus');
          if (this.confirmation) this.isResendShown(user, this.getEmailLastResent(user));
        });
      }
      else {
        // User is signed out.
        document.getElementById('sign-in-status').style.display = 'none';
        document.getElementById('sign-in').textContent = 'Log in';
        console.log('logged out');
      }
    }, function(error) {
      console.log(error);
    });
  }

  toggleConfirmationTimer(value: boolean) {
    this.isConfirmationTimerRunning.next(value);
  }

  isResendShown(user, lastResent) {
    let currentTime = new Date().getTime();
    console.log('difference = ', currentTime - lastResent);
    if ((currentTime - lastResent) > 60000) this.toggleConfirmationTimer(false);
    else {
      this.toggleConfirmationTimer(true);
      this.emailLastResent = currentTime;
      this.startTimerFrom = Math.floor(60 - ((currentTime - lastResent) / 1000));
      console.log('email last resent at', this.emailLastResent, 'start Timer from', this.startTimerFrom);
    }
  }

  openProfile(id = firebase.auth().currentUser.uid) {
    this.router.navigate(['profile/' + id]);
  }

}
