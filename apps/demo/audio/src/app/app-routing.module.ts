import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'player', loadChildren: () => import('./feature/player/player.module').then(m => m.PlayerModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
