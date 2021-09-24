import { Component, Input, OnInit } from '@angular/core';
import { ISong } from '../models';

@Component({
  selector: 'app-song-preview',
  templateUrl: './song-preview.component.html',
  styleUrls: ['./song-preview.component.scss']
})
export class SongPreviewComponent implements OnInit {

  modes = SongPreviewMode;
  constructor() {
    this.text = '';
    this.index = 0;
    this.mode = SongPreviewMode.live;
  }

  @Input()
  text: string;

  @Input()
  index: number;

  @Input()
  mode: SongPreviewMode;

  get show(): boolean { return this.text.length > 0; }
  get numeration(): number { return this.index + 1; }
  ngOnInit(): void {
  }

}

export enum SongPreviewMode {
  live,
  icon
}
