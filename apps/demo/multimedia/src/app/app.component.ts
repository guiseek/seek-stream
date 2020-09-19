import { Component } from '@angular/core';

@Component({
  selector: 'seek-stream-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'player';
  globals = {
    apiKey: '',
    regionCode: '',
    numSearchRes: '',
    numRelatedRes: '',
    thumbnails: '',
    listGrid: '',
    repeatMode: '',
  };
}
