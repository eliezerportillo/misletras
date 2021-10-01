import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ISong } from '../models';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  title: string;
  private collectionRef: AngularFirestoreCollection<ISong>;
  list: ISong[];
  filteredList?: Observable<ISong[]>;
  filter: FormControl;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private authService: AuthService) {

    this.list = [];
    this.filter = new FormControl();

    this.collectionRef = this.db.collection('songs', ref => ref.where('userId', '==', authService.user?.uid).orderBy('title'));
    this.title = this.route.snapshot.data['title'];

  }

  get noData(): boolean { return !this.list.some(x => true); }

  ngOnInit(): void {
    this.collectionRef
      .snapshotChanges()
      .subscribe((querySnapshot) => {
        this.list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.payload.doc.data();
          data.id = doc.payload.doc.id;
          this.list.push(data);
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
