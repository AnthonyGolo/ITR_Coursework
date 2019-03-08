import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guideitem',
  templateUrl: './guideitem.component.html',
  styleUrls: ['./guideitem.component.css']
})
export class GuideitemComponent implements OnInit {

  id: string;
  guideTitle: string;
  author: string;
  rating: number;
  category: string;
  creationDate: number;

  constructor(private fbs: FirebaseService, private router: Router) { }

  ngOnInit() {
    let guidesRef = this.fbs.db.collection('guides');
    this.id = 'dba67d7f25c57652'; // TODO: MECHANISM OF ACCESSING IDs
    console.log('achieving this id for guide item', this.id);
    guidesRef.where('gid', '==', this.id).get()
      .then(querySnapshot => {
        let base = querySnapshot.docs[0].data();
        this.guideTitle = base.title;
        this.author = base.author;
        this.rating = base.rating;
        this.category = base.category;
        this.creationDate = base.creationDate;
      });
  }

}
