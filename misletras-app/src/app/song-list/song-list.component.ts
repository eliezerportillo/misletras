import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ISong } from '../models';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  title: string;
  private collectionRef: AngularFirestoreCollection<ISong>;
  list: ISong[];
  filteredList?: Observable<ISong[]>;
  filter: FormControl;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore) {

    this.list = [];
    this.filter = new FormControl();
    this.collectionRef = this.db.collection('songs', ref => ref.orderBy('title'));
    this.title = this.route.snapshot.data['title'];

  }

  get sinInvitados(): boolean { return !this.list.some(x => true); }

  ngOnInit(): void {
    this.collectionRef
      .snapshotChanges()
      .subscribe((querySnapshot) => {
        this.list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.payload.doc.data();
          const docId = doc.payload.doc.id;
          this.list.push({ id: docId, title: data.title, text: data.text });
        });

        this.filteredList = this.filter.valueChanges.pipe(
          startWith(''),
          map(value => this._filtrar(value))
        );

      });
  }

  private _filtrar(filtro: string): ISong[] {
    const lower = filtro.toLowerCase();
    return this.list.filter(element => element.title.toLowerCase().includes(lower));
  }

}
