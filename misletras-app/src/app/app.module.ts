import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ShellComponent } from './shell/shell.component';





import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';

import { SongsModule } from './modules/songs/songs.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { CoreModule } from './core/core.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    SongsModule,
    PlaylistsModule
  ],
  // entryComponents: [DeleteSongConfirmationComponent],
  // providers: [SaveSongCommand, CookieService, SocketWebService, SongCookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
