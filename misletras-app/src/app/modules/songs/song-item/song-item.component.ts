import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { ISong, Song } from '../models';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss']
})
export class SongItemComponent implements OnInit {
  _song?: Song;

  constructor(private auth: AuthService) { }

  @Input()
  set song(value: ISong) {
    this._song = new Song(value);
  };

  ngOnInit(): void {
  }
  get isOwner() {
    return this.song?.userId == this.auth.user?.uid;
  }
  get verse() {
    return this._song?.firstVerse
      .replace(/<strong>|<\/strong>|<em>|<\/em>|\/\/|\\\\/, '');
  }

}
