import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FirebaseService} from '../../firebase.service';

class Guide {
  title: string;
  author: string;
  rating: number;
  creationDate: number;
  contents: Array<Object>;
  comments: Array<String>;
  constructor(title,
              author,
              contents,
              comments) {
    this.title = title;
    this.author = author;
    this.rating = null;
    this.creationDate = Math.round(new Date().getTime()/1000);
    this.contents = contents;
    this.comments = comments;
  }
}


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  selectedFile = null;
  steps: Array<Object> = [];
  images;

  constructor(private http: HttpClient,
              private fbs: FirebaseService) {
    this.images = fbs.storage.ref().child('images');
    this.addStep();
  }

  ngOnInit() {
  }

  addStep() {
    let i = this.steps.length;
    this.steps.push({
      title: 'Step ' + (i+1),
      text: '',
      images: []
    });
    console.log(this.steps, 'after addition');
  }

  removeStep(){
    this.steps.pop();
    console.log(this.steps, 'after removal');
  }

  onFileSelected(event, i){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onSubmit()  {
    // this.http.post('')
  }

}
