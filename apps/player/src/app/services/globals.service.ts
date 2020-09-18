import { Injectable, ElementRef } from '@angular/core';
import {
  VideoModel,
  ClientModel,
  SettingsModel,
} from '@seek-stream/core-entities';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalsService {
  clientName: string;
  clients: Array<ClientModel>;

  relatedVideos: Array<VideoModel> = [];
  feedVideos: Array<VideoModel> = [];
  playlistVideos: Array<VideoModel> = [];
  historyVideos: Array<VideoModel> = [];
  searchedVideos: Array<VideoModel>;

  currentState = -1;
  currentVideo: VideoModel;
  shareLink: string;
  currentPlaylistItem: number;
  modalPlaylistItem: number;

  categories: any;
  currentCategory = 'all';
  categoriesBlocked = ['19', '22', '25', '27', '29'];

  videoItemIDvalue: any;

  isLogged = false;
  loadingState = {
    feed: true,
    related: true,
    playlist: true,
    settings: true,
    player: true,
  };
  thumbnails = true;
  listGrid = false;
  repeatMode = true;
  isTempSessionActive = false;
  sessionValue: string;
  localStorageVersion = environment.storageVersion;

  regionCode: string;
  apiKey: string;
  numSearchRes: number;
  numRelatedRes: number;
  nextPageToken: string;

  settings: SettingsModel;
  player: any;
  myScrollContainer: ElementRef;

  constructor() {}

  isSameSesssion() {
    return (
      this.getCurrentSessionKeys().session ===
      this.getCurrentSessionKeys().tempSession
    );
  }

  getCurrentSessionKeys() {
    return {
      session: localStorage.getItem('session_key'),
      tempSession: this.sessionValue,
    };
  }
}
