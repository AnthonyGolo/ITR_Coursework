import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myItems = [];
  name: string;
  mail: string;
  id: string;
  updatePassword: boolean = false;

  constructor(private fbs: FirebaseService,
              private router: Router) { }

  ngOnInit() {
    let usersRef = this.fbs.db.collection('users');
    let user = firebase.auth().currentUser.displayName;
    this.id = this.router.url.substring('/profile/'.length);
    usersRef.where('uid', '==', this.id)
      .get()
      .then(querySnapshot => {
        this.name = querySnapshot.docs[0].data().name;
        this.mail = querySnapshot.docs[0].data().email;
      });
    // @ts-ignore
    this.fbs.getFilteredList('author', 99, user).then(items => this.myItems = items);
  }

  updateField(field: string, value: string) {
    let user = firebase.auth().currentUser;
    let usersRef = this.fbs.db.collection('users');
    user.getIdToken().then(token => {
      if (field == 'password') {
        user.updatePassword(value);
      }
      if (field == 'name') {
        user.updateProfile({
          displayName: value,
          photoURL: null,
        }).then(() => {
          usersRef.where('uid', '==', user.uid).get().then(querySnapshot => {
              usersRef.doc(querySnapshot.docs[0].id).update({
                name: value
              });
            });
          this.name = value;
          document.getElementById('sign-in-status').textContent = `Logged in as ${user.displayName}`
        });
      }
      if (field == 'email') {
        user.updateEmail(value).then(() => {
          usersRef.where('uid', '==', user.uid).get().then(querySnapshot => {
            usersRef.doc(querySnapshot.docs[0].id).update({
              email: value
            });
            this.mail = value;
          });
          this.fbs.isConfirmation(user)
        });
      }
    });
  }

}
