import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryMenuComponent } from './library-menu/library-menu.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
