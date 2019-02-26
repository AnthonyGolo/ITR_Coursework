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

  constructor(private fbs: FirebaseService, private router: Router) {
    this.timerSubscription = this.fbs.isConfirmationTimerRunning.subscribe((value) => {
      console.log('timer runs?', value);
      if (value) {
        setTimeout(() => this.startCountdownTimer(this.fbs.startTimerFrom), 200);
      }
    });
  }

  ngOnInit() {
  }

  startCountdownTimer(count) {
    this.timerSubscription.unsubscribe();
    this.fbs.toggleStartTimerFrom(60);
    this.fbs.toggleConfirmationTimer(true);
    this.timeleft = timer(0,1000).pipe(
      take(count),
      map(()=> --count),
      finalize(()=> this.fbs.toggleConfirmationTimer(false)));
  }

  resendEmail() {
    let usr = firebase.auth().currentUser;
    this.startCountdownTimer(this.fbs.startTimerFrom);
    usr.sendEmailVerification();
  }





}
