import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';

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
  comments: Array<object> = [];
  commentsSubject: Subject<Array<object>> = new Subject<Array<object>>();

  constructor(private fbs: FirebaseService, private router: Router) {
  }

  ngOnInit() {
    this.id = this.router.url.substring('/guide/'.length);
    this.fbs.guidesRef.where('gid', '==', this.id).get()
      .then(querySnapshot => {
        let base = querySnapshot.docs[0].data();
        this.guideTitle = base.title;
        this.author = base.author;
        this.rating = base.rating;
        this.category = base.category;
        this.creationDate = base.creationDate;
        this.contents = base.contents;
        this.comments = base.comments;
        console.log(this.contents, 'contents');
      });
    this.trackComments();
    this.commentsSubject.subscribe(value => this.comments.push(value));
  }

  addComment() {
    let user = firebase.auth().currentUser.displayName;
    // @ts-ignore
    let text = document.getElementById('ownComment').value;
    let time = new Date().getTime();
    let comment = {
      author: user,
      text: text,
      timestamp: time
    };
    this.fbs.guidesRef.where('gid', '==', this.id).get()
      .then(querySnapshot => {
        this.fbs.guidesRef.doc(querySnapshot.docs[0].id).update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment)
        });
        this.commentsSubject.next(querySnapshot.docs[0].data().comments);
        console.log('success!');
      });
  }

  trackComments() {
    this.fbs.guidesRef.where('gid', '==', this.id)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data().comments);
          this.commentsSubject.next(doc.data().comments)
        })
      });
  }

}
