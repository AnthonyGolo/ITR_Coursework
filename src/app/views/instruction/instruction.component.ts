import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  id: string;
  guideTitle: string;
  author: string;
  rating: number;
  category: string;
  creationDate: number;
  contents: Array<Object>;
  comments: Array<String>;

  constructor(private fbs: FirebaseService, private router: Router) { }

  ngOnInit() {
    let guidesRef = this.fbs.db.collection('guides');
    this.id = this.router.url.substring('/guide/'.length);
    console.log('achieving this from url', this.id);
    guidesRef.where('gid', '==', this.id).get()
      .then(querySnapshot => {
        let base = querySnapshot.docs[0].data();
        this.guideTitle = base.title;
        this.author = base.author;
        this.rating = base.rating;
        this.category = base.category;
        this.creationDate = base.creationDate;
        this.contents = base.contents;
        this.comments = base.comments;
      });
  }

}
