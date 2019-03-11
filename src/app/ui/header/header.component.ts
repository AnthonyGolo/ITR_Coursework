import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import algoliasearch from 'algoliasearch';
import {AlgoliaService} from '../../algolia.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  inputString: string = '';
  router; fbs;

  constructor(router: Router, fbs: FirebaseService) {
    this.fbs = fbs;
    this.router = router;
  }

  ngOnInit() {
  }

  toggleSignIn() {
    if (document.getElementById('sign-in').textContent == 'Log out') {
      firebase.auth().signOut().then(() => {
        this.router.navigate(['']);
        window.location.reload();
      })
    }
    else {
      this.router.navigate(['login']);
    }
  }

  updateInputString(event) {
    this.inputString = event;
  }

  // TODO toggleRussianLanguage(tf: boolean) {}

}
