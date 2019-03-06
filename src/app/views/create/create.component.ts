import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

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

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  title: string;
  author: string;
  steps: Array<object> = [];
  imagesRef;

  constructor(private fbs: FirebaseService, private router: Router) {
    this.imagesRef = fbs.storage.ref().child('images');
    this.addStep();
    this.title = null;
    this.author = firebase.auth().currentUser.displayName;
  }

  ngOnInit() {
  }

  addStep() {
    let i = this.steps.length;
    this.steps.push({
      title: 'Step ' + (i+1),
      text: '',
      images: [''],
    });
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
      // @ts-ignore
      this.steps[i].text = text;
    }
    else {
      let i = id.replace('title', '');
      // @ts-ignore
      this.steps[i].title = text;
    }
  }

  onFileSelected(event, i, fileIndex) {
    // @ts-ignore
    let title = document.getElementById('headline').innerText.replace(' ', '');
    // @ts-ignore
    let n = this.steps[i].images.length;
    let author = this.author.replace(' ', '');
    let image = event.target.files[0];
    let imageRef = this.imagesRef.child(author + title + i + n + '.jpg');
    imageRef.put(image).then(() => {
      imageRef.getDownloadURL().then(link => {
        // @ts-ignore
        this.steps[i].images[fileIndex+1] = link;
        // @ts-ignore
        console.log(this.steps[i].images);
      });
    });
  }

  onSubmit()  {
    for (let step of this.steps) {
      // @ts-ignore
      step.images = step.images.slice(1);
    }
    // @ts-ignore
    let submittedGuide = new Guide (this.title, this.author, this.steps);
    console.log(submittedGuide);
    this.fbs.db.collection('guides').add({
      title: submittedGuide.title,
      author: submittedGuide.author,
      rating: submittedGuide.rating,
      creationDate: submittedGuide.creationDate,
      contents: submittedGuide.contents,
      comments: submittedGuide.comments,
    }).then(docRef => {
      this.router.navigate(['guide/' + docRef.id]);
    });
  }

  // TODO guide upload to db (mapping), list of guides: browse, new, best

}
