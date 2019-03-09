import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

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
  comments: Array<String> = [];

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
      });
    this.trackComments();
  }

  addComment() {
    let user = firebase.auth().currentUser.displayName;
    // @ts-ignore
    let text = document.getElementById('ownComment').value;
    let time = new Date().getTime();
    this.fbs.guidesRef.where('gid', '==', this.id).get()
      .then(querySnapshot => {
        this.fbs.guidesRef.doc(querySnapshot.docs[0].id).update({
          comments: firebase.firestore.FieldValue.arrayUnion({
            author: user,
            text: text,
            timestamp: time
          })
        });
        console.log('success!');
      });
  }

  trackComments() {
    this.fbs.guidesRef.where('gid', '==', this.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") { // 'modified' 'removed'
            this.comments = change.doc.data().comments; // TODO observable!
          }
        });
      });
  }

}
