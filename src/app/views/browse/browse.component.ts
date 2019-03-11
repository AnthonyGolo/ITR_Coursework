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
  itemsCategory = [];
  currentCategory;
  selectedTab = 0;

  constructor(private fbs: FirebaseService) { }

  ngOnInit() {
    // @ts-ignore
    this.fbs.getFilteredList('creationDate', 99).then(items => this.itemsNew = items);
    // @ts-ignore
    this.fbs.getFilteredList('rating', 99).then(items => this.itemsBest = items);
  }

  showCategory(category){
    this.currentCategory = category;
    this.fbs.getFilteredList('category', 99, category).then(items => {
      // @ts-ignore
      this.itemsCategory = items;
      this.selectedTab = 2;
    });
  }

}
