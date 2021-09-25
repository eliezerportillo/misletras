import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISong, Song } from '../models';
import { SongPreviewMode } from '../song-preview/song-preview.component';

@Component({
  selector: 'app-song-live',
  templateUrl: './song-live.component.html',
  styleUrls: ['./song-live.component.scss']
})
export class SongLiveComponent implements OnInit, AfterViewInit {
  song: Song;
  modePreview: SongPreviewMode = SongPreviewMode.icon;
  @ViewChild('content') elementView?: ElementRef;
  contentWidth: number;
  center: number;

  constructor(route: ActivatedRoute) {
    this.song = new Song(route.snapshot.data['song'] as ISong);
    this.current = this.song.parts[0];
    this.contentWidth = 0;
    this.center = 0;
  }

  get index() { return this.song.parts.indexOf(this.current) }

  move(event: any) {
    if (event.x >= this.center)
      this.next();
    else
      this.previous();
  }

  next() {
    const i = this.index + 1;
    if (i > this.song.parts.length)
      this.current = this.song.parts[0];
    else
      this.current = this.song.parts[i];
  }

  previous() {
    const i = this.index - 1;
    if (i < 0)
      this.current = this.song.parts[0];
    else
      this.current = this.song.parts[i];
  }

  ngAfterViewInit(): void {
    this.contentWidth = this.elementView?.nativeElement.offsetWidth;
    this.center = this.contentWidth / 2;
  }

  current: { html: string, notes: string };

  ngOnInit(): void {
  }

}
