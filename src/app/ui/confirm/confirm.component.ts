import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private fbs: FirebaseService) { }

  ngOnInit() {
  }

}
