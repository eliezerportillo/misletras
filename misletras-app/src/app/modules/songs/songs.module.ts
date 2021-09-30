import { NgModule } from '@angular/core';
import { SongItemComponent } from './song-item/song-item.component';
import { SongsRoutingModule } from './songs-routing.module';
import { SaveSongCommand } from './commands/save-song.cmd';
import { DeleteSongCommand } from './commands/delete-song.cmd';
import { NgxEditorModule } from 'ngx-editor';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteSongConfirmationComponent } from './delete-song-confirmation/delete-song-confirmation.component';
import { SongEditorComponent } from './song-editor/song-editor.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongPreviewComponent } from './song-preview/song-preview.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    SongItemComponent,
    SongEditorComponent,
    SongListComponent,
    SongPreviewComponent,
    DeleteSongConfirmationComponent
  ],
  imports: [
    SongsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatRippleModule,
    MatChipsModule,
    MatSelectModule,
    SharedModule,
    NgxEditorModule
  ],
  entryComponents: [DeleteSongConfirmationComponent],
  providers: [SaveSongCommand, DeleteSongCommand]
})
export class SongsModule { }
