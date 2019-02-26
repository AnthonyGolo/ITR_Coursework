import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../../firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;
  mail: string;
  id: string;

  constructor(private fbs: FirebaseService,
              private router: Router) { }

  ngOnInit() {
    let userRef = this.fbs.db.collection('users');
    this.id = this.router.url.substring('/profile/'.length);
    console.log('achieving this from url', this.id);
    userRef.where('uid', '==', this.id)
      .get()
      .then(querySnapshot => {
        /*this.name = querySnapshot.docs[0].name;
        this.mail = querySnapshot.docs[0].email;*/
        console.log('profile!', querySnapshot.docs);
        console.log(this.name, this.mail, this.id);
      });
  }



}
