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

  constructor() { }

  ngOnInit() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', this.uiConfig);
  }

}
