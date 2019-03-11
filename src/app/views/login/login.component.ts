import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uiConfig = {
    signInSuccessUrl: 'confirm',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
  };

  constructor(private fbs: FirebaseService) {
  }

  ngOnInit() {
    if (!this.fbs.authUiLoaded) {
      this.fbs.authUiLoaded = true;
    }
    this.fbs.fui.start('#firebaseui-auth-container', this.uiConfig);
  }

}
