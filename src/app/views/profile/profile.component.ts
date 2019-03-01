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

  name: string;
  mail: string;
  id: string;
  updatePassword: boolean = false;

  constructor(private fbs: FirebaseService,
              private router: Router) { }

  ngOnInit() {
    let usersRef = this.fbs.db.collection('users');
    this.id = this.router.url.substring('/profile/'.length);
    console.log('achieving this from url', this.id);
    usersRef.where('uid', '==', this.id)
      .get()
      .then(querySnapshot => {
        this.name = querySnapshot.docs[0].data().name;
        this.mail = querySnapshot.docs[0].data().email;
        console.log('profile!', querySnapshot.docs);
        console.log(this.name, this.mail, this.id);
      });
  }

  updateField(field: string, value: string) {
    console.log('value is', value);
    let user = firebase.auth().currentUser;
    let usersRef = this.fbs.db.collection('users');
    user.getIdToken().then(token => {
      if (field == 'password') {
        user.updatePassword(value).then(() =>
          console.log('password changed'));
      }
      if (field == 'name') {
        user.updateProfile({
          displayName: value,
          photoURL: null,
        }).then(() => {
          usersRef.where('uid', '==', user.uid).get().then(querySnapshot => {
              console.log(usersRef.doc(querySnapshot.docs[0].id));
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
