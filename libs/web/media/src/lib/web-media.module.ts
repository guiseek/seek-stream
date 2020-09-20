import { MediaTrackService } from './services/media-track.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  providers: [MediaTrackService]
})
export class WebMediaModule {}
