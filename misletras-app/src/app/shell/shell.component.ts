import { query, style, transition, trigger, group, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ]),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
        ])
      ])
    ])
  ],
})
export class ShellComponent implements OnInit {
  links: any[];
  activeLink: any;
  constructor() {
    this.links = [
      {
        label: 'Buscar',
        link: 'songs',
        icon: 'search'
      },
      {
        label: 'Biblioteca',
        link: 'library',
        icon: 'library_music'
      },
      // {
      //   label: 'Grupos',
      //   link: 'groups'
      // }
    ];
    this.activeLink = this.links[0];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }

  ngOnInit(): void {
  }


}
