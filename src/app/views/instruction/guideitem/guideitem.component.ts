import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-guideitem',
  templateUrl: './guideitem.component.html',
  styleUrls: ['./guideitem.component.css']
})
export class GuideitemComponent implements OnInit {

  @Input() id: string;
  guideTitle: string;
  author: string;
  rating: number;
  category: string;
  creationDate: number;

  constructor(private fbs: FirebaseService, private router: Router) { }

  ngOnInit() {
    let guidesRef = this.fbs.db.collection('guides');
    guidesRef.where('gid', '==', this.id).get()
      .then(querySnapshot => {
        let base = querySnapshot.docs[0].data();
        this.guideTitle = base.title;
        this.author = base.author;
        this.rating = base.totalRating;
        this.category = base.category;
        this.creationDate = base.creationDate;
      });
  }

}
