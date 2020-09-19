import { of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AudioService, StreamState } from './audio-player.service';

@Component({
  selector: 'demo-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  files: Array<any> = [
    // tslint:disable-next-line: max-line-length
    {
      artist: 'Raimundos',
      name: 'Baily Funk',
      album: 'Lapadas do povo',
      url: '/assets/musics/Raimundos-Baily_Funk.mp3',
    },
    {
      artist: 'Chasing Ghosts',
      name: 'Fallen From Grace',
      album: 'Chasing Ghosts',
      url: 'assets/musics/Chasing_Ghosts-Fallen_From_Grace.mp3',
    },
    {
      artist: 'Sepultura',
      name: 'Refuse/Resist',
      album: 'Chaos A.D.',
      url: 'assets/musics/Sepultura-Refuse_Resist.mp3',
    },
    {
      url:
        'http://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3',
      name: 'Perfect',
      artist: ' Ed Sheeran',
    },
  ];

  state: StreamState;
  currentFile: any = {};

  getFiles() {
    return of(this.files);
  }

  constructor(
    private audioService: AudioService // cloudService: CloudService
  ) // public auth: AuthService
  {
    this.getFiles().subscribe((files) => {
      this.files = files;
    });

    // get media files
    // cloudService.getFiles().subscribe((files) => {
    //   this.files = files;
    // });

    // listen to stream state
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe((events) => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}
