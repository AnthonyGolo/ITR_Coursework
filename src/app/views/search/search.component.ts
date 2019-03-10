import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query;

  constructor(private router: Router, private fbs: FirebaseService) { }

  ngOnInit() {
    this.query = this.router.url.substring('/guide/'.length);
  }

}
