import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryMenuComponent } from './library-menu/library-menu.component';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LibraryMenuComponent
  ],
  imports: [
    SharedModule,
    LibraryRoutingModule,
    MatListModule,
    MatIconModule
  ]
})
export class LibraryModule { }
