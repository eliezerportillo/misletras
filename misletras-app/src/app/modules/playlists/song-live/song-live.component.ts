import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketWebService } from '../../../core/socket-web.service';
import { SongCookieService } from './song-cookie.service';
import { ISong, Song } from '../../songs/models';

@Component({
  selector: 'app-song-live',
  templateUrl: './song-live.component.html',
  styleUrls: ['./song-live.component.scss']
})
export class SongLiveComponent implements OnInit, AfterViewInit {
  song: Song;
  @ViewChild('content') elementView?: ElementRef;
  contentWidth: number;
  center: number;
  onIndexChanges: EventEmitter<number> = new EventEmitter<number>();
  socket: SocketWebService;

  constructor(route: ActivatedRoute, cookier: SongCookieService) {
    this.song = new Song(route.snapshot.data['song'] as ISong);
    this.current = this.song.parts[0];
    this.contentWidth = 0;
    this.center = 0;
    const room = this.song.id;
    this.socket = new SocketWebService(room);

  }

  get index() { return this.song.parts.indexOf(this.current) }

  move(event: any) {
    if (event.x >= this.center)
      this.next();
    else
      this.previous();
  }

  private next() {
    const i = this.index + 1;
    if (i >= this.song.parts.length)
      this.current = this.song.parts[0];
    else
      this.current = this.song.parts[i];

    this.onIndexChanges.emit(i);
  }

  private previous() {
    const i = this.index - 1;
    if (i < 0)
      this.current = this.song.parts[this.song.parts.length - 1];
    else
      this.current = this.song.parts[i];
    this.onIndexChanges.emit(i);
  }

  private set(index: number) {
    if (index > this.song.parts.length || index < 0)
      this.current = this.song.parts[0];
    else
      this.current = this.song.parts[index];
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.code === 'ArrowRight' || event.code === 'ArrowDown' || event.code === 'Space') {
      this.next();
    }

    if (event.code === 'ArrowLeft' || event.code === 'ArrowUp') {
      this.previous();
    }
  }

  ngAfterViewInit(): void {
    this.contentWidth = this.elementView?.nativeElement.offsetWidth;
    this.center = this.contentWidth / 2;
  }

  current: { html: string, notes: string };

  ngOnInit(): void {
    // this.cookier.set(this.song);
    this.socket.callback.subscribe(res => {
      this.set(res.index);
    });
    this.onIndexChanges.subscribe((index: number) => {
      this.socket.emitEvent({ index });
    });
  }

}
