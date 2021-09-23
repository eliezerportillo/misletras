import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Song } from './models';

@Injectable({
  providedIn: 'root'
})
export class SongResolver implements Resolve<Song> {

  empty: Song;
  constructor(private db: AngularFirestore) {
    this.empty = {
      id: '',
      title: '',
      text: ''
    };
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> | Promise<Song> {
    const id: string = route.paramMap.get('id') || '';
    if (id === '') {
      return of(this.empty);
    }
    else {
      return this.get(id);
    }
  }

  async get(id: string) {
    const ref = await this.db.collection<Song>('songs')
      .doc(id)
      .get()
      .toPromise();

    const doc = ref.data();

    if (!doc) {
      return this.empty;
    }

    return doc;
  }
}