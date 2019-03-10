import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private fbs: FirebaseService) { }

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

  // TODO search(input: string) {}

  // TODO toggleNightTheme(tf: boolean) {}

  // TODO toggleRussianLanguage(tf: boolean) {}

}
