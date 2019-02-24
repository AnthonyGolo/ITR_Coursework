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
      console.log('verification email sent');
      firebase.auth().currentUser.sendEmailVerification();
    }, 500);
  }

}
