import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FirebaseService} from '../../firebase.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  selectedFile = null;
  steps = [];
  images;

  constructor(private http: HttpClient,
              private fbs: FirebaseService) {
    this.images = fbs.storage.ref().child('images');
  }

  ngOnInit() {
  }

  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onSubmit()  {
    // this.http.post('')
  }

}
