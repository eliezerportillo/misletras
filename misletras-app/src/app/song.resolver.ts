import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ISong } from './models';

@Injectable({
  providedIn: 'root'
})
export class SongResolver implements Resolve<ISong> {

  empty: ISong;
  constructor(private db: AngularFirestore) {
    this.empty = {
      id: '',
      title: '',
      text: ''
    };
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISong> | Promise<ISong> {
    const id: string = route.paramMap.get('id') || '';
    if (id === '') {
      return of(this.empty);
    }
    else {
      return this.get(id);
    }
  }

  async get(id: string) {
    const ref = await this.db.collection<ISong>('songs')
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