import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  categories: Object = {fashion: 0, cuisine: 0, art: 0, tech: 0, lifestyle: 0, other: 0};
  categoryNames = Object.keys(this.categories);

  constructor(private fbs: FirebaseService) { }

  ngOnInit() {
    let capitalize = (string) => {
      return string[0].toUpperCase() + string.slice(1);
    };
    let guidesRef = this.fbs.db.collection('guides');
    for (let key of Object.keys(this.categories)) {
      guidesRef.where('category', '==', capitalize(key.toString())).get()
        .then(querySnapshot => {
          for (let match of querySnapshot.docs) this.categories[key] += 1;
        });
    }
    console.log(this.categories);
  }

}
