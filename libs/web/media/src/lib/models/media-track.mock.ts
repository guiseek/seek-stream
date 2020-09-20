import { MediaTrack } from './media-track';

const baseUrl = 'assets';
export const mockMediaTrack1: MediaTrack = new MediaTrack();
mockMediaTrack1.link = `${baseUrl}/Coke & Smoke.mp4`;
mockMediaTrack1.title = 'Coke & Smoke';

export const mockPlaylist: MediaTrack[] = [
  {
    title: 'Coke & Smoke',
    link: `${baseUrl}/Coke & Smoke.mp4`
  },
  {
    title: 'More Than This',
    link: `${baseUrl}/Cash In Flowers - More Than This.mp3`
  },

];
