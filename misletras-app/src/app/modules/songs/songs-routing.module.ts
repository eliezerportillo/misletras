import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/auth.guard';
import { SongResolver } from 'src/app/core/song.resolver';
import { MyListComponent } from './my-list/my-list.component';
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
  },
  {
    path: 'my-songs',
    component: MyListComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'my-songs/add',
    pathMatch: 'full',
    redirectTo: 'songs/add'
  },
  {
    path: 'my-songs/:id',
    pathMatch: 'full',
    redirectTo: 'songs/:id'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
