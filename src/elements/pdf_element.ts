
interface Size {
    width: number;
    height: number;
}

export abstract class PDFElement  implements Size {
    width: number;
    height: number;
    flex: number;

    constructor(width: number, height: number, flex: number) {
        this.flex = flex;
        this.width = width;
        this.height = height;
    }

    abstract render(doc: PDFKit.PDFDocument, x: number, y: number) : void;

    abstract getWidth() : number;
    abstract getHeight() : number;
}


module.exports = {
    PDFElement
}

