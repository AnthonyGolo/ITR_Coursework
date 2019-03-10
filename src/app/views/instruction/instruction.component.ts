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

  ratingFirstEvaluation: boolean = true;
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
        this.rating = base.totalRating;
        this.category = base.category;
        this.creationDate = base.creationDate;
        this.contents = base.contents;
        this.comments = base.comments;
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
      timestamp: time,
      likedBy: []
    };
    this.fbs.guidesRef.where('gid', '==', this.id).get()
      .then(querySnapshot => {
        this.fbs.guidesRef.doc(querySnapshot.docs[0].id).update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment)
        });
        this.commentsSubject.next(querySnapshot.docs[0].data().comments);
        console.log('success!');
      });
    // @ts-ignore
    document.getElementById('ownComment').value = '';
  }

  trackComments() {
    this.fbs.guidesRef.where('gid', '==', this.id)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          this.commentsSubject.next(doc.data().comments)
        })
      });
  }

  assessGuide(event) {
    if (this.ratingFirstEvaluation) this.ratingFirstEvaluation = false;
    else {
      let mark = event.rating;
      console.log('MARK', mark);
      let user = firebase.auth().currentUser.displayName;
      let entry = {
        user: user,
        rating: mark
      };
      console.log('entry', entry);
      this.fbs.guidesRef.where('gid', '==', this.id).get()
        .then(querySnapshot => {
          let userPresence = false;
          let marks = [];
          for (let i of querySnapshot.docs[0].data().rating) {
            marks.push(i.rating);
            if (i.user == user) userPresence = true;
          }
          if (!userPresence) {
            marks.push(mark);
            this.fbs.guidesRef.doc(querySnapshot.docs[0].id).update({
              rating: firebase.firestore.FieldValue.arrayUnion(entry)
            });
          }
          const reducer = (accumulator, currentValue) => (accumulator + currentValue) / 2;
          this.rating = marks.reduce(reducer);
          console.log('new rating', this.rating)
        });
      setTimeout(() => {
        this.fbs.guidesRef.where('gid', '==', this.id).get()
          .then(querySnapshot => {
            this.fbs.guidesRef.doc(querySnapshot.docs[0].id).update({
              totalRating: this.rating
            });
          }, 500);
      });
    }
  }

  // TODO toggleLikeComment(tf: boolean) {}

  // TODO FORBIDCOMMENTS, RATINGS for unconfirmed folks

}
