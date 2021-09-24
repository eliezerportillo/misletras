import { Component, Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSongConfirmationComponent } from '../delete-song-confirmation/delete-song-confirmation.component';
import { ISong } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DeleteSongCommand {

  constructor(private db: AngularFirestore, public dialog: MatDialog) { }

  execute(songId: string): Promise<boolean> {

    const dialogRef = this.dialog.open(DeleteSongConfirmationComponent);

    return dialogRef.afterClosed().toPromise().then(async (result) => {
      if (result) {
        await this.db.collection('songs').doc<ISong>(songId).ref.delete();
        return true;
      } else {
        return false;
      }
    });


  }
}
