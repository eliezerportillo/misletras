import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [UserMenuComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    UserMenuComponent,
    CommonModule
  ]
})
export class WidgetModule { }
