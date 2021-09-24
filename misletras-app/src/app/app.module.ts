import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxEditorModule } from 'ngx-editor';
import { SongEditorComponent } from './song-editor/song-editor.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongLiveComponent } from './song-live/song-live.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { FlexLayoutModule } from '@angular/flex-layout';
import { ShellComponent } from './shell/shell.component';



import { SongPreviewComponent } from './song-preview/song-preview.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { SaveSongCommand } from './commands/save-song.cmd';



import { DeleteSongConfirmationComponent } from './delete-song-confirmation/delete-song-confirmation.component';
import { MaterialModule } from './material/material.module';
import { FittextDirective } from './fittext.directive';




@NgModule({
  declarations: [
    AppComponent,
    SongEditorComponent,
    SongListComponent,
    SongLiveComponent,
    ShellComponent,
    SongPreviewComponent,
    DeleteSongConfirmationComponent,
    FittextDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  entryComponents: [DeleteSongConfirmationComponent],
  providers: [SaveSongCommand],
  bootstrap: [AppComponent]
})
export class AppModule { }
