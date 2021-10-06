import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/library'
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
    path: 'library',
    loadChildren: () => import('./modules/library/library.module').then(m => m.LibraryModule)
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
