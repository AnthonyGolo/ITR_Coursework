import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FirebaseService} from '../../firebase.service';
import * as firebase from 'firebase';

class Guide {
  title: string;
  author: string;
  rating: number;
  creationDate: number;
  contents: Array<Object>;
  comments: Array<String>;
  constructor(title,
              author,
              contents) {
    this.title = title;
    this.author = author;
    this.rating = null;
    this.creationDate = Math.round(new Date().getTime()/1000);
    this.contents = contents;
    this.comments = [];
  }
}

class Step {
  title: string;
  text: string;
  editingText: boolean;
  images: string;
  constructor(title, text, images) {
    this.title = title;
    this.text = text;
    this.editingText = true;
    this.images = images;
  }
}


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  //uploadedImages: Array<Object> = [];
  title: string;
  steps: Array<Step> = [];
  imagesRef;
  renamingTitle = false;

  constructor(private http: HttpClient,
              private fbs: FirebaseService) {
    this.imagesRef = fbs.storage.ref().child('images');
    this.addStep();
    this.title = 'Title';
  }

  ngOnInit() {
  }

  addStep() {
    let i = this.steps.length;
    this.steps.push(new Step( 'Step ' + (i+1), '', [] ));
    console.log(this.steps, 'after addition');
  }

  removeStep(){
    this.steps.pop();
    console.log(this.steps, 'after removal');
  }

  editField(el, status: boolean) {

  }

  onFileSelected(event, i) {
    // @ts-ignore
    let title = document.getElementById('title').value;
    // UPLOAD TO STORAGE AND PUT LINKS TO ARRAY
    let imageRef = this.imagesRef.child('guide' + title + 'step' + i + '.jpg');
    imageRef.put(event.target.files[0]).then(() => {
      this.steps[i].images = imageRef.getDownloadURL();
      console.log(this.steps);
    });
  }

  onSubmit()  {
    // @ts-ignore
    let title = document.getElementById('title').value;
    let author = firebase.auth().currentUser.displayName;
    let submittedGuide = new Guide (title, author, this.steps);
  }

}
