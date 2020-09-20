import { WebAudioModule } from '@seek-stream/web-audio';
import { WebMediaModule } from '@seek-stream/web-media';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '@seek-stream/shared-material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { SecondsToMinutesPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    WebAudioModule,
    WebMediaModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],
  declarations: [MediaPlayerComponent, SecondsToMinutesPipe],
  exports: [MediaPlayerComponent, SecondsToMinutesPipe],
})
export class WebMediaPlayerModule {}
