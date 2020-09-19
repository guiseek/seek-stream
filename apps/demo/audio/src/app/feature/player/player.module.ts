import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../app.material';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';


@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
