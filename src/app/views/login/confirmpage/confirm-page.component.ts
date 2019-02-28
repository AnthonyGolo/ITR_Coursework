import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseService} from '../../../firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmpage',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent implements OnInit {

  text = false;

  constructor(private fbs: FirebaseService,
              private router: Router) {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.fbs.addUsertoDb(user)
        .then(() => {
          this.text = true;
          user.sendEmailVerification();})
        .catch(() => {
          this.router.navigate(['']);});
    });
  }

}
