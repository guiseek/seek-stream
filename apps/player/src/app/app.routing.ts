import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'settings', loadChildren: () => import('./feature/settings/settings.module').then(m => m.SettingsModule) },
    { path: 'history', loadChildren: () => import('./feature/history/history.module').then(m => m.HistoryModule) },
    { path: 'feed', loadChildren: () => import('./feature/feed/feed.module').then(m => m.FeedModule) },
    { path: 'about', loadChildren: () => import('./feature/about/about.module').then(m => m.AboutModule) }])
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
