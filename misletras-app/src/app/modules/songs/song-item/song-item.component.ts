import { Component, Input, OnInit } from '@angular/core';
import { ISong, Song } from '../models';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss']
})
export class SongItemComponent implements OnInit {
  _song?: Song;

  constructor() { }

  @Input()
  set song(value: ISong) {
    this._song = new Song(value);
  };

  ngOnInit(): void {
  }

  get verse() {
    return this._song?.firstVerse
      .replace(/<strong>|<\/strong>|<em>|<\/em>|\/\/|\\\\/, '');
  }

}