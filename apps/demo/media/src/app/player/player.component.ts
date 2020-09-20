import { Component, OnInit } from '@angular/core';
import { MediaTrack } from '@seek-stream/web-media';

@Component({
  selector: 'demo-media-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  trackList: MediaTrack[] = [
    { title: 'Coke & Smoke', link: 'assets/Coke & Smoke.mp4' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
