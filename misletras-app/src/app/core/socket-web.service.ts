import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { SongCookieService } from '../modules/playlists/song-live/song-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket {

  outEvent: EventEmitter<any> = new EventEmitter<any>();
  callback: EventEmitter<any> = new EventEmitter<any>();

  private eventName = 'event';
  constructor(private songCookier: SongCookieService) {
    super({
      url: environment.socketWebUrl,
      options: {
        query: {
          stage: songCookier.get()
        }
      }
    });

    this.listen();
  }

  listen() {
    this.ioSocket.on(this.eventName, (res: any) => this.callback.emit(res))
  }

  emitEvent = (payload = {}) => {
    this.ioSocket.emit(this.eventName, payload);
  }
}
