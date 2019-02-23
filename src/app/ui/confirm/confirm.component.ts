import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private fbs: FirebaseService,
              private router: Router) { }

  ngOnInit() {
  }

  resendEmail() {
    this.router.navigate(['confirm']);
  }

}
