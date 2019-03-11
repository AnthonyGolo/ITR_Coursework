import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../firebase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];

  constructor(private fbs: FirebaseService) {
    let usersRef = this.fbs.db.collection('users');
    usersRef.where("name", ">", "")
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.users.push(doc.data());
        });
      });
  }

  ngOnInit() {
  }

}
