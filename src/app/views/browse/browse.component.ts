import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  itemsNew = [];
  itemsBest = [];

  constructor(private fbs: FirebaseService) { }

  ngOnInit() {
    // @ts-ignore
    this.fbs.getFilteredList('creationDate', 99).then(items => this.itemsNew = items);
    // @ts-ignore
    this.fbs.getFilteredList('rating', 99).then(items => this.itemsBest = items);
  }



}
