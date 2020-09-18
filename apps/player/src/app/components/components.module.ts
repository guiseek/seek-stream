import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './player/player.component';
import { ButtonsComponent } from './player/buttons/buttons.component';
import { PlayerMiniComponent } from './player-mini/player-mini.component';
import { RoomComponent } from './room/room.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RelatedComponent } from './related/related.component';
import { SettingsComponent } from './settings/settings.component';
import { VideoItemComponent } from './video-item/video-item.component';
import { YoutubeIframeComponent } from './youtube-iframe/youtube-iframe.component';
import { ModalComponent } from './modal/modal.component';
import { CategoryComponent } from './category/category.component';



@NgModule({
  declarations: [SearchComponent, PlayerComponent, ButtonsComponent, PlayerMiniComponent, RoomComponent, PlaylistComponent, RelatedComponent, SettingsComponent, VideoItemComponent, YoutubeIframeComponent, ModalComponent, CategoryComponent],
  imports: [
    CommonModule
  ],
  exports: [SearchComponent, PlayerComponent, ButtonsComponent, PlayerMiniComponent, RoomComponent, PlaylistComponent, RelatedComponent, SettingsComponent, VideoItemComponent, YoutubeIframeComponent, ModalComponent, CategoryComponent]
})
export class ComponentsModule { }
