import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryMenuComponent } from './library-menu/library-menu.component';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared/shared.module';
import { WidgetModule } from '../widget/widget.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LibraryMenuComponent
  ],
  imports: [
    SharedModule,
    LibraryRoutingModule,
    MatListModule,
    MatIconModule,
    WidgetModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class LibraryModule { }
