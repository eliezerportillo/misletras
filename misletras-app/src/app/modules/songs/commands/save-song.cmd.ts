import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { ISong } from '../models';

@Injectable()
export class SaveSongCommand {

  constructor(private db: AngularFirestore) { }

  execute(data: ISong): Promise<void> {
    const temp = {
      title: data.title,
      text: data.text
    };

    let doc: DocumentReference;
    // será un nuevo invitado si no tiene id
    if (data.id === '') {
      doc = this.db.collection('songs').doc<ISong>().ref;
    }
    else {
      // En caso contrario, Se añadirá una referencia al invitado existente
      doc = this.db.collection('songs').doc<ISong>(data.id).ref;
    }

    return doc.set(data, { merge: true });
  };
}
