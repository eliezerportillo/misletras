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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShellComponent } from './shell/shell.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SongPreviewComponent } from './song-preview/song-preview.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';
import { SaveSongCommand } from './commands/save-song.cmd';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteSongConfirmationComponent } from './delete-song-confirmation/delete-song-confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    SongEditorComponent,
    SongListComponent,
    SongLiveComponent,
    ShellComponent,
    SongPreviewComponent,
    DeleteSongConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule
  ],
  entryComponents: [DeleteSongConfirmationComponent],
  providers: [SaveSongCommand],
  bootstrap: [AppComponent]
})
export class AppModule { }
