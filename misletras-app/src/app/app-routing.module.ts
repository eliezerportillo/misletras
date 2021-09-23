import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongEditorComponent } from './song-editor/song-editor.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongResolver } from './song.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/songs'
  },
  {
    path: 'songs',
    component: SongListComponent,
    data: {
      title: 'Canciones'
    }
  },
  {
    path: 'songs/add',
    pathMatch: 'full',
    component: SongEditorComponent,
    resolve:{
      song: SongResolver
    }
  },
  {
    path: 'songs/:id',
    component: SongEditorComponent,
    resolve:{
      song: SongResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
