import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/songs'
  },
  {
    path: 'login',
    component: LoginComponent,
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
