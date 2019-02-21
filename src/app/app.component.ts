import { Component } from '@angular/core';
import {StitchService} from './stitch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Guidit';

  constructor(private stitchService: StitchService) {}

}
