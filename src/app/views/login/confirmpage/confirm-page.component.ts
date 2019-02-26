import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-confirmpage',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent implements OnInit {

  constructor(private fbs: FirebaseService) {}

  ngOnInit() {
    this.fbs.toggleConfirmationTimer(true);
    setTimeout(() => {
      let usr = firebase.auth().currentUser;
      usr.sendEmailVerification().then(() => {
        this.fbs.emailLastResent = new Date().getTime();
        this.fbs.addUsertoDb(usr);
        console.log('verification email sent to', usr.email, 'at', this.fbs.emailLastResent);
      });
    }, 500);
  }

}
