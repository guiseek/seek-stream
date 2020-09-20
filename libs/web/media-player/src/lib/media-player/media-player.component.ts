import { mediaPlayerIcons } from './media-player-icons';
import { MatSlider } from '@angular/material/slider';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
} from '@angular/core';
import { MediaTrack, MediaTrackService } from '@seek-stream/web-media';
import { DomSanitizer } from '@angular/platform-browser';

function isiOS() {
  const { platform, maxTouchPoints } = navigator;

  return (
    (/iPad|iPhone|iPod/.test(platform) ||
      (platform === 'MacIntel' && maxTouchPoints > 1)) &&
    !window.MSStream
  );
}

@Component({
  selector: 'seek-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnInit {
  // @ViewChild('mediaElement') private mediaElementRef: ElementRef<
  //   HTMLMediaElement
  // >;
  // private get mediaElement(): HTMLMediaElement {
  //   return this.mediaElementRef?.nativeElement;
  // }

  // audioPlayerService: MediaTrackService;
  constructor(
    public sanitizer: DomSanitizer,
    private audioPlayerService: MediaTrackService
  ) {
    // this.audioPlayerService = new MediaTrackService();
  }

  @Input()
  set playlist(playlist: MediaTrack[]) {
    this.audioPlayerService.setPlaylist(playlist);
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  displayedColumns: string[] = ['title', 'status'];
  dataSource = new MatTableDataSource<MediaTrack>();
  paginator: MatPaginator;

  timeLineDuration: MatSlider;

  tracks: MediaTrack[] = [];

  @Input() displayTitle = true;
  @Input() displayPlaylist = true;
  @Input() displayVolumeControls = true;
  @Input() pageSizeOptions = [10, 20, 30];
  @Input() expanded = true;
  @Input() autoPlay = false;
  @Input() disablePositionSlider = false;

  // Support for internationalization
  @Input() tableHeader = 'Playlist';
  @Input() columnHeader = 'Title';

  currentIndex = 0;

  @Output()
  trackEnded: Subject<string> = new Subject<string>();

  @ViewChild('audioPlayer', { static: true }) player: ElementRef;

  iOS = isiOS;

  svgIcon = mediaPlayerIcons;

  loaderDisplay = false;
  isPlaying = false;
  currentTime = 0;
  volume = 0.1;
  duration = 0.01;

  private startOffsetValue = 0;
  @Input()
  set startOffset(seconds: number) {
    this.startOffsetValue = seconds;
    this.player.nativeElement.currentTime = seconds;
  }
  get startOffset(): number {
    return this.startOffsetValue;
  }

  @Input()
  public endOffset = 0;

  currTimePosChanged(event) {
    this.player.nativeElement.currentTime = event.value;
  }

  getIcon(key: string) {
    return this.sanitizer.bypassSecurityTrustHtml(mediaPlayerIcons[key]);
  }

  bindPlayerEvent(): void {
    this.player.nativeElement.addEventListener('playing', () => {
      this.isPlaying = true;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });
    this.player.nativeElement.addEventListener('pause', () => {
      this.isPlaying = false;
    });
    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this.player.nativeElement.currentTime);
      // BUG: Commenting for `ended` event not firing #66
      // if (this.currentTime >= this.duration - this.endOffset) {
      //     this.player.nativeElement.pause();
      // }
    });
    this.player.nativeElement.addEventListener('volume', () => {
      this.volume = Math.floor(this.player.nativeElement.volume);
    });
    if (!this.iOS) {
      this.player.nativeElement.addEventListener('loadstart', () => {
        this.loaderDisplay = true;
      });
    }
    this.player.nativeElement.addEventListener('loadeddata', () => {
      this.loaderDisplay = false;
      this.duration = Math.floor(this.player.nativeElement.duration);
    });
    this.player.nativeElement.addEventListener('ended', () => {
      this.trackEnded.next('ended');
    });
  }

  playBtnHandler(): void {
    if (this.loaderDisplay) {
      return;
    }
    if (this.player.nativeElement.paused) {
      if (this.currentTime >= this.duration - this.endOffset) {
        this.player.nativeElement.currentTime = this.startOffset;
      } else {
        this.player.nativeElement.currentTime = this.currentTime;
      }

      this.player.nativeElement.play();
    } else {
      this.currentTime = this.player.nativeElement.currentTime;
      this.player.nativeElement.pause();
    }
  }

  play(track?: MediaTrack): void {
    if (track) {
      this.startOffset = track.startOffset || 0;
      this.endOffset = track.endOffset || 0;
    }

    setTimeout(() => {
      this.player.nativeElement.play();
    }, 50);
  }

  toggleVolume() {
    if (this.volume === 0) {
      this.setVolume(1.0);
    } else {
      this.setVolume(0);
    }
  }

  private setVolume(vol) {
    this.volume = vol;
    this.player.nativeElement.volume = this.volume;
  }

  ngOnInit() {
    this.bindPlayerEvent();

    // auto play next track
    this.player.nativeElement.addEventListener('ended', () => {
      if (this.checkIfSongHasStartedSinceAtleastTwoSeconds()) {
        this.nextSong();
      }
    });

    this.player.nativeElement.addEventListener('timeupdate', () => {
      this.audioPlayerService.setCurrentTime(
        this.player.nativeElement.currentTime
      );
    });

    // Subscribe to playlist observer from MediaTrackService and
    // update the playlist within MatAdvancedAudioPlayerComponent
    this.audioPlayerService.getPlaylist().subscribe((tracks) => {
      if (tracks !== null && tracks !== []) {
        this.tracks = tracks;
        this.initialize();
      }
    });
  }

  initialize() {
    // console.log(Object.values(mediaPlayerIcons.map(([key, svg]) => ({ [key]: svg }))));
    // populate indexs for the track and configure
    // material table data source and paginator
    this.setDataSourceAttributes();

    this.player.nativeElement.currentTime = this.startOffset;
    this.updateCurrentMediaTrack();

    if (this.autoPlay) {
      this.play();
    }
  }

  setDataSourceAttributes() {
    let index = 1;
    if (this.tracks) {
      this.tracks.forEach((track: MediaTrack) => {
        track.index = index++;
      });
      this.dataSource = new MatTableDataSource<MediaTrack>(this.tracks);
      this.dataSource.paginator = this.paginator;
    }
  }

  nextSong(): void {
    if (
      this.displayPlaylist === true &&
      ((this.currentIndex + 1) % this.paginator.pageSize === 0 ||
        this.currentIndex + 1 === this.paginator.length)
    ) {
      if (this.paginator.hasNextPage()) {
        this.paginator.nextPage();
      } else if (!this.paginator.hasNextPage()) {
        this.paginator.firstPage();
      }
    }
    this.currentTime = 0;
    this.duration = 0.01;
    if (this.currentIndex + 1 >= this.tracks.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.updateCurrentMediaTrack();
    this.play();
  }

  previousSong(): void {
    this.currentTime = 0;
    this.duration = 0.01;
    if (!this.checkIfSongHasStartedSinceAtleastTwoSeconds()) {
      if (
        this.displayPlaylist === true &&
        (this.currentIndex % this.paginator.pageSize === 0 ||
          this.currentIndex === 0)
      ) {
        if (this.paginator.hasPreviousPage()) {
          this.paginator.previousPage();
        } else if (!this.paginator.hasPreviousPage()) {
          this.paginator.lastPage();
        }
      }
      if (this.currentIndex - 1 < 0) {
        this.currentIndex = this.tracks.length - 1;
      } else {
        this.currentIndex--;
      }
    } else {
      this.resetSong();
    }
    this.updateCurrentMediaTrack();
    this.play();
  }

  resetSong(): void {
    this.player.nativeElement.src = this.tracks[this.currentIndex].link;
  }

  selectMediaTrack(index: number): void {
    this.currentIndex = index - 1;
    this.updateCurrentMediaTrack();
    this.play();
  }

  checkIfSongHasStartedSinceAtleastTwoSeconds(): boolean {
    return this.player.nativeElement.currentTime > 2;
  }

  updateCurrentMediaTrack() {
    this.audioPlayerService.setCurrentMediaTrack(
      this.tracks[this.currentIndex]
    );
  }
}
