export interface ISong {
    title: string;
    text: string;
    id: string;
    key: string;
    bpm: string;
    userId?: string;
}

export class Song implements ISong {
    title: string;
    text: string;
    id: string;
    key: string;
    bpm: string;
    userId?: string;
    readonly parts: { html: string, notes: string }[];

    constructor(song: ISong) {
        this.title = song.title;
        this.text = song.text;
        this.id = song.id;
        this.key = song.key;
        this.bpm = song.bpm;
        this.parts = this.text.split(/(?=<p>)/g).map(p => {
            return {
                html: p.replace(/<h.>.*<\/h.>/g, ''),
                notes: (p.match(/<h.>.*<\/h.>/g)?.map(s => s) || []).join()
            }
        })
    }


    get firstVerse() { return this.parts[0].html; }
}

export class User {
    public uid: string = '';
}