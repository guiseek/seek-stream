import { BehaviorSubject, Observable } from 'rxjs';
import { MediaTrack } from './../models/media-track';
import { Injectable } from '@angular/core';

@Injectable()
export class MediaTrackService {
  tracks: MediaTrack[] = [];
  playlistSubject$: BehaviorSubject<MediaTrack[]> = new BehaviorSubject<
    MediaTrack[]
  >(this.tracks);

  // Get the current track
  currentMediaTrack: MediaTrack = null;
  currentMediaTrackSubject$: BehaviorSubject<MediaTrack> = new BehaviorSubject<
    MediaTrack
  >(this.currentMediaTrack);

  // Get the current time
  currentTime: any = null;
  currentTimeSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.currentTime
  );

  setPlaylist(tracks: MediaTrack[]) {
    this.tracks = tracks;
    this.playlistSubject$.next(this.tracks);
  }

  getPlaylist(): Observable<MediaTrack[]> {
    return this.playlistSubject$.asObservable();
  }

  setCurrentMediaTrack(currentMediaTrack: MediaTrack) {
    this.currentMediaTrack = currentMediaTrack;
    this.currentMediaTrackSubject$.next(this.currentMediaTrack);
  }

  getCurrentMediaTrack(): Observable<MediaTrack> {
    return this.currentMediaTrackSubject$.asObservable();
  }

  setCurrentTime(currentTime: any) {
    this.currentTime = currentTime;
    this.currentTimeSubject$.next(this.currentTime);
  }

  getCurrentTime(): Observable<any> {
    return this.currentTimeSubject$.asObservable();
  }
}
