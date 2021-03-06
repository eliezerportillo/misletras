import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators as validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, toDoc, toHTML, Toolbar, Validators } from 'ngx-editor';
import { AuthService } from 'src/app/core/auth.service';
import { DeleteSongCommand } from '../commands/delete-song.cmd';
import { SaveSongCommand } from '../commands/save-song.cmd';
import { ISong } from '../models';

@Component({
  selector: 'app-song-editor',
  templateUrl: './song-editor.component.html',
  styleUrls: ['./song-editor.component.scss']
})
export class SongEditorComponent implements OnInit {

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private saveSongCommand: SaveSongCommand,
    private deleteSongCommand: DeleteSongCommand,
    private snackBar: MatSnackBar,
    private auth: AuthService) {

    this.editor = new Editor();
    this.toolbar = [];
    this.form = new FormGroup({});
    this.songId = route.snapshot.paramMap.get('id') || '';
    this.model = route.snapshot.data['song'] as ISong;
    this.keys = [
      'A',
      'A#/Bb',
      'B',
      'C',
      'C#/Db',
      'D',
      'D#/Eb',
      'E',
      'F',
      'F#/Gb',
      'G',
    ]
  }
  songId: string;
  editor: Editor;
  toolbar: Toolbar;
  form: FormGroup;
  model: ISong;
  keys: string[];

  get isNew(): boolean { return this.model.id == '' ? true : false; }
  get name() { return this.form.get('name')?.value; }

  get doc() {
    return this.form.get('editorContent');
  }

  get html() {
    return toHTML(this.doc?.value);
  }

  get songParts(): string[] {
    return this.html.split(/(?=<p>)/g)
  }

  get hasParts(): boolean {
    return this.songParts.length > 1;
  }

  get isOwner() {
    return this.model.userId == this.auth.user?.uid;
  }

  save() {
    const data: ISong = {
      id: this.songId,
      title: this.name,
      text: this.html,
      key: this.form.get('key')?.value,
      bpm: this.form.get('bpm')?.value,
      userId: this.auth.user?.uid || '',
      inPlaylist: false
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const msg = this.snackBar.open('Datos requeridos', 'OK', { duration: 2500 });
      return;
    }

    this.saveSongCommand.execute(data).then(() => {
      const msg = this.snackBar.open('Listo', 'OK', { duration: 1500 });
      msg.afterDismissed().toPromise().then(() => this.router.navigate(['..']))
    })
  }

  delete() {
    this.deleteSongCommand.execute(this.songId).then((deleted) => {
      if (deleted) {
        const msg = this.snackBar.open('Listo', 'OK', { duration: 1500 });
        msg.afterDismissed().toPromise().then(() => this.router.navigate(['..']));
      }
    });
  }

  ngOnInit(): void {
    this.toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      // ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      // ['link', 'image'],
      // ['text_color', 'background_color'],
      // ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    this.form = new FormGroup({
      name: new FormControl(this.model.title, validators.required),
      editorContent: new FormControl(
        toDoc(this.model.text),
        Validators.required()
      ),
      key: new FormControl(this.model.key),
      bpm: new FormControl(this.model.bpm, validators.min(0))
    });

    // this.editor.setContent(this.model.text);
  }

}
