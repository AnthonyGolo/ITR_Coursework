import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  selectedFile = null;
  steps = [];
  myWidget;

  constructor(private http: HttpClient) {
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
