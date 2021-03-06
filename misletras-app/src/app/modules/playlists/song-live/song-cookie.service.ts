import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ISong } from '../../songs/models';

@Injectable()
export class SongCookieService {

  constructor(private cookier: CookieService) { }

  set(song: ISong) {
    this.cookier.set(`song-live`, song.id);
  }

  get() {
    return this.cookier.get('song-live');
  }
}
