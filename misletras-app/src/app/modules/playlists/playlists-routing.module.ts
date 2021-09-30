import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongResolver } from 'src/app/core/song.resolver';
import { SongLiveComponent } from './song-live/song-live.component';

const routes: Routes = [
  {
    path: 'live/:id',
    component: SongLiveComponent,
    resolve: {
      song: SongResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
