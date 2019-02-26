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

  constructor(private fbs: FirebaseService,
              private router: Router) { }

  ngOnInit() {
    this.fbs.trackLoginStatus();
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

}
