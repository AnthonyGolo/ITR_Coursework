import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  @Output() showCategory = new EventEmitter<string>();

  categories: Object = {Fashion: 0, Cuisine: 0, Art: 0, Tech: 0, Lifestyle: 0, Other: 0};
  categoryNames = Object.keys(this.categories);


  constructor(private fbs: FirebaseService) { }

  ngOnInit() {
    let guidesRef = this.fbs.db.collection('guides');
    for (let key of Object.keys(this.categories)) {
      guidesRef.where('category', '==', key.toString()).get()
        .then(querySnapshot => {
          for (let match of querySnapshot.docs) this.categories[key] += 1;
        });
    }
  }

  browseCategory(category: string){
    console.log('category', category);
    this.showCategory.emit(category);
    console.log('event', this.showCategory);
  }

}
