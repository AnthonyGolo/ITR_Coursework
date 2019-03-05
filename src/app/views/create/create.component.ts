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
  images: Array<object>;
  constructor(title, text, images) {
    this.title = title;
    this.text = text;
    this.images = images;
  }
}


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  title: string;
  author: string;
  steps: Array<Step> = [];
  imagesRef;

  constructor(private http: HttpClient,
              private fbs: FirebaseService) {
    this.imagesRef = fbs.storage.ref().child('images');
    this.addStep();
    this.title = '';
    this.author = firebase.auth().currentUser.displayName;
  }

  ngOnInit() {
  }

  addStep() {
    let i = this.steps.length;
    this.steps.push(new Step( 'Step ' + (i+1), '', [undefined] ));
    console.log(this.steps, 'after addition');
  }

  removeStep(){
    this.steps.pop();
    console.log(this.steps, 'after removal');
  }

  editField(event) {
    let text = event.srcElement.innerText;
    let id = event.srcElement.id;
    if (id == 'headline') this.title = text;
    else if (id.includes('text')) {
      let i = id.replace('text', '');
      this.steps[i].text = text;
    }
    else {
      let i = id.replace('title', '');
      this.steps[i].title = text;
    }
  }

  onFileSelected(event, i, fileIndex) {
    // @ts-ignore
    let title = document.getElementById('headline').innerText.replace(' ', '');
    let n = this.steps[i].images.length;
    let image = event.target.files[0];
    let imageRef = this.imagesRef.child(title + 'step' + i + 'pic' + n + '.jpg');
    imageRef.put(image).then(() => {
      imageRef.getDownloadURL().then(link => {
        this.steps[i].images[fileIndex+1] = link;
        console.log(this.steps[i].images);
      });
    });
  }

  onSubmit()  {
    // @ts-ignore
    let submittedGuide = new Guide (this.title, this.author, this.steps);
    console.log(submittedGuide);
  }

  // TODO guide upload to db (mapping), list of guides: browse, new, best

}
