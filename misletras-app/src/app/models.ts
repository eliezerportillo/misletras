export interface ISong {
    title: string;
    text: string;
    id: string;
}

export class Song implements ISong {
    title: string;
    text: string;
    id: string;
    readonly parts: { html: string, notes: string }[];

    constructor(song: ISong) {
        this.title = song.title;
        this.text = song.text;
        this.id = song.id;
        this.parts = this.text.split(/(?=<p>)/g).map(p => {
            return {
                html: p.replace(/<h.>.*<\/h.>/g, ''),
                notes: (p.match(/<h.>.*<\/h.>/g)?.map(s => s) || []).join()
            }
        })
    }
}