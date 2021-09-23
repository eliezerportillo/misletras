import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../models';

@Component({
  selector: 'app-song-preview',
  templateUrl: './song-preview.component.html',
  styleUrls: ['./song-preview.component.scss']
})
export class SongPreviewComponent implements OnInit {

  constructor() {
    this.text = '';
    this.index = 0;
  }

  @Input()
  text: string;

  @Input()
  index: number;

  get show(): boolean { return this.text.length > 0; }
  get numeration(): number { return this.index + 1; }
  ngOnInit(): void {
  }

}
