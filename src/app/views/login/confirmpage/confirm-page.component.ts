import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-confirmpage',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent implements OnInit {

  constructor(private fbs: FirebaseService) {
    firebase.auth().onAuthStateChanged(user => { this.fbs.addUsertoDb(user); });
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.sendEmailVerification().then(() => {
          this.fbs.emailLastResent = new Date().getTime();
          console.log('verification email sent to', user.email, 'at', this.fbs.emailLastResent);
          });
      }
      this.fbs.toggleConfirmationTimer(true);
    });
  }

}
