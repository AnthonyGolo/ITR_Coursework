import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import * as admin from 'firebase-admin';

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

  db; fui; storage; guidesRef;
  functionality: boolean = false;
  authUiLoaded: boolean = false;
  confirmation: boolean = false;
  runConfirmationTimer: boolean = true;
  isConfirmationTimerRunning: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {
    firebase.initializeApp(this.config);  // Firebase Connection
    this.db = firebase.firestore(); // Cloudstore
    this.fui = new firebaseui.auth.AuthUI(firebase.auth()); // Firebase UI
    this.storage = firebase.storage(); // Storage
    this.guidesRef = this.db.collection('guides');
    this.isConfirmationTimerRunning.subscribe(value => this.runConfirmationTimer = value);

    this.trackLoginStatus();
  }

  trackLoginStatus() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(accessToken => {
          document.getElementById('sign-in-status').textContent = `Logged in as ${user.displayName}`;
          document.getElementById('sign-in').textContent = 'Log out';
          if (user.emailVerified) {
            this.functionality = true;
          }
          setTimeout(() => {
            if (this.isConfirmation(user)) {
              this.toggleConfirmationTimer(true);
            } else {
              let usersRef = this.db.collection('users');
              usersRef.where("uid", "==", user.uid).get().then(querySnapshot => {
                  usersRef.doc(querySnapshot.docs[0].id).update({ emailVerified: true });
                  });
            }
          }, 400);
        });
      }
      else {
        document.getElementById('sign-in-status').style.display = 'none';
        document.getElementById('sign-in').textContent = 'Log in';
      }
    });
  }

  isConfirmation(user) {
    this.confirmation = !user.emailVerified;
    return this.confirmation;
  }

  toggleConfirmationTimer(value: boolean) {
    this.isConfirmationTimerRunning.next(value);
  }

  addUsertoDb(user) {
    return new Promise((resolve, reject) => {
      let usersRef = this.db.collection('users');
      usersRef.where('uid', '==', user.uid)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.docs[0]) {
            usersRef.add({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              role: 'user',
              isBlocked: false,
              nightTheme: false,
              enableRussian: false
            }).then(function(docRef) {
              resolve();
            });
          }
          else {
            reject();
          }
        });
    })
  }

  openProfile(id = firebase.auth().currentUser.uid) {
    this.router.navigate(['profile/' + id]);
  }

  openGuide(id) {
    this.router.navigate(['guide/' + id]);
  }

  getFilteredList(filterBy: string, amountShown: number, category: string = null) {
    return new Promise(((resolve, reject) => {
      let ref = this.guidesRef;
      if (category != null) ref = ref.where(filterBy, '>=', category).where(filterBy, '<', category + '~');
      ref.orderBy(filterBy, 'desc').get()
        .then(querySnapshot => {
          let guides = [];
          querySnapshot.docs.forEach(doc => {
            if (guides.length < amountShown) guides.push(doc.data().gid);
          });
          resolve(guides);
        });
    }))
  }

}
