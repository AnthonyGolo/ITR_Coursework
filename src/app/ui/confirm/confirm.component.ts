import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
import {Observable, timer} from 'rxjs';
import {finalize, map, take} from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit {

  timeleft: Observable<number>;
  timerSubscription;
  fbs; router;

  constructor(fbs: FirebaseService, router: Router) {
    this.fbs = fbs;
    this.router = router;
    this.timerSubscription = this.fbs.isConfirmationTimerRunning.subscribe((value) => {
      if (value) {
        setTimeout(() => this.startCountdownTimer(60), 200);
      }
    });
  }

  ngOnInit() {
  }

  startCountdownTimer(count) {
    this.timerSubscription.unsubscribe();
    this.fbs.toggleConfirmationTimer(true);
    this.timeleft = timer(0,1000).pipe(
      take(count),
      map(()=> --count),
      finalize(()=> this.fbs.toggleConfirmationTimer(false)));
  }

  resendEmail() {
    let usr = firebase.auth().currentUser;
    this.startCountdownTimer(60);
    usr.sendEmailVerification();
  }





}
