import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  links: any[];
  activeLink: any;
  constructor() {
    this.links = [
      {
        label: 'Canciones',
        link: 'songs'
      },
      {
        label: 'Mi lista',
        link: 'my-songs'
      },
      // {
      //   label: 'Grupos',
      //   link: 'groups'
      // }
    ];
    this.activeLink = this.links[0];
  }


  ngOnInit(): void {
  }


}
