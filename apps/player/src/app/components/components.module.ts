import { VideoItemEnhancedComponent } from './video-item/video-item-enhanced/video-item-enhanced.component';
import { VideoItemGridComponent } from './video-item/video-item-grid/video-item-grid.component';
import { VideoItemListComponent } from './video-item/video-item-list/video-item-list.component';
import { CategoryBadgeComponent } from './category/category-badge/category-badge.component';
import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { PlayerComponent } from './player/player.component';
import { ButtonsComponent } from './player/buttons/buttons.component';
import { PlayerMiniComponent } from './player-mini/player-mini.component';
import { RoomComponent } from './room/room.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { RelatedComponent } from './related/related.component';
import { VideoItemComponent } from './video-item/video-item.component';
import { YoutubeIframeComponent } from './youtube-iframe/youtube-iframe.component';
import { ModalComponent } from './modal/modal.component';
import { CategoryComponent } from './category/category.component';

import {
  SessionManagerService,
  YoutubeGetVideo,
  PlaylistControlService,
  SharedService,
  GlobalsService,
  ModalService,
} from '../services';

import {
  NguCarouselModule,
  NguCarouselConfig,
  NguCarousel,
} from '@ngu/carousel';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
		SearchComponent,
		CategoryComponent,
		PlayerComponent,
		PlaylistComponent,
		RelatedComponent,
		RoomComponent,
		YoutubeIframeComponent,
		ButtonsComponent,
		VideoItemComponent,
		CategoryBadgeComponent,
		ModalComponent,
		VideoItemEnhancedComponent,
		VideoItemGridComponent,
		VideoItemListComponent,
		PlayerMiniComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    NguCarouselModule,
    DragDropModule,
  ],
  providers: [
    SessionManagerService,
    PlayerComponent,
    PlaylistComponent,
    YoutubeGetVideo,
    PlaylistControlService,
    SharedService,
    GlobalsService,
    ModalService,
    ModalComponent,
    NguCarouselConfig,
    NguCarousel,
    ButtonsComponent,
    CategoryBadgeComponent,
  ],
  exports: [
    SearchComponent,
		CategoryComponent,
		PlayerComponent,
		PlaylistComponent,
		RelatedComponent,
		RoomComponent,
		YoutubeIframeComponent,
		ButtonsComponent,
		VideoItemComponent,
		CategoryBadgeComponent,
		ModalComponent,
		VideoItemEnhancedComponent,
		VideoItemGridComponent,
		VideoItemListComponent,
		PlayerMiniComponent,
  ],
})
export class ComponentsModule {}
