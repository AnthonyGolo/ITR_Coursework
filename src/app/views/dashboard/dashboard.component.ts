import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  itemsNew: Array<string> = [];
  itemsBest: Array<string> = [];

  constructor(private fbs: FirebaseService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.fbs.getFilteredList('creationDate', 3).then(items => this.itemsNew = items);
    // @ts-ignore
    this.fbs.getFilteredList('rating', 3).then(items => this.itemsBest = items);
  }

  ngOnDestroy() {

  }


}
