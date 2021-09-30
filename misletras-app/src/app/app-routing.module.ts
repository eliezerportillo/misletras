import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/songs'
  },
  {
    path: 'songs',
    loadChildren: () => import('./modules/songs/songs.module').then(m => m.SongsModule)
  },
  {
    path: 'playlists',
    loadChildren: () => import('./modules/playlists/playlists.module').then(m => m.PlaylistsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
