import { NgModule } from '@angular/core';
import { SongCookieService } from './song-live/song-cookie.service';
import { SongLiveComponent } from './song-live/song-live.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FittextDirective } from 'src/app/modules/playlists/fittext.directive';

import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    SongLiveComponent,
    FittextDirective
  ],
  imports: [
    PlaylistsRoutingModule,
    MatRippleModule,
    SharedModule,
  ],
  providers: [SongCookieService]
})
export class PlaylistsModule { }
