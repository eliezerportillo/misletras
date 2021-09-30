import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongResolver } from 'src/app/core/song.resolver';
import { SongEditorComponent } from './song-editor/song-editor.component';
import { SongListComponent } from './song-list/song-list.component';

const routes: Routes = [
  {
    path: '',
    component: SongListComponent,
    data: {
      title: 'Canciones'
    }
  },
  {
    path: 'songs/add',
    pathMatch: 'full',
    component: SongEditorComponent,
    resolve: {
      song: SongResolver
    }
  },
  {
    path: 'songs/:id',
    component: SongEditorComponent,
    resolve: {
      song: SongResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
