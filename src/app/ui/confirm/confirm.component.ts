import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
import {Observable, timer} from 'rxjs';
import {finalize, map, take} from 'rxjs/operators';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit {

  //confirmationTimer: boolean = false;

  constructor(private fbs: FirebaseService,
              private router: Router) {
    //this.confirmationTimer = fbs.runConfirmationTimer;
    this.fbs.isConfirmationTimerRunning.subscribe((value) => {
      console.log('timer runs?', value);
      if (value) this.startCountdownTimer(this.fbs.startTimerFrom);
    });
  }

  ngOnInit() {
    //if (this.confirmationTimer) this.startCountdownTimer(this.fbs.startTimerFrom);
  }

  resendEmail() {
    this.fbs.toggleConfirmationTimer(true);
    this.router.navigate(['confirm']);
  }

  timeleft: Observable<number>;

  startCountdownTimer(count) {
    this.timeleft = timer(0,1000).pipe(
      take(count),
      map(()=> --count),
      finalize(()=> this.fbs.toggleConfirmationTimer(false)));
  }

}
