import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {
//   SessionManagerService,
//   YoutubeGetVideo,
//   PlaylistControlService,
//   SharedService,
//   GlobalsService,
//   ModalService,
// } from './services';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: environment.serverURL,
  options: {},
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    // SessionManagerService,
    // YoutubeGetVideo,
    // PlaylistControlService,
    // SharedService,
    // GlobalsService,
    // ModalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// PlayerComponent,
// PlaylistComponent,
// ModalComponent,
// NguCarouselConfig,
// NguCarousel,
// ButtonsComponent,
// CategoryBadgeComponent
