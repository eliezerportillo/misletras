export interface ISong {
    title: string;
    text: string;
    id: string;
    key: string;
    bpm: string;
    userId: string;
    inPlaylist: boolean;
}

export class Song implements ISong {
    title: string;
    text: string;
    id: string;
    key: string;
    bpm: string;
    userId: string;
    inPlaylist: boolean;

    readonly parts: { html: string, notes: string }[];

    constructor(song: ISong) {
        this.title = song.title;
        this.text = song.text;
        this.id = song.id;
        this.key = song.key;
        this.bpm = song.bpm;
        this.userId = song.userId;
        this.inPlaylist = song.inPlaylist;

        this.parts = this.text.split(/(?=<p>)/g).map(p => {
            return {
                html: p.replace(/<h.>.*<\/h.>|background-color:([a-z]+\(.*\);)|color:([a-z]+\(.*\);)/g, ''),
                notes: (p.match(/<h.>.*<\/h.>/g)?.map(s => s) || []).join()
            }
        })
    }


    get firstVerse() { return this.parts[0].html; }
}

export class EmptySong implements ISong {
    title: string;
    text: string;
    id: string;
    key: string;
    bpm: string;
    userId: string;
    inPlaylist: boolean;

    constructor() {
        this.id = '';
        this.title = '';
        this.text = '';
        this.key = '';
        this.bpm = '';
        this.userId = '';
        this.inPlaylist = false;
    }
}

export class User {
    public uid: string = '';
}