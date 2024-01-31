import { PDFElement } from "../pdf_element";
import { PDFColumn } from "./pdf_column";
import { PDFRow } from "./pdf_row";

export default class PDFCenter extends PDFElement {

    child: PDFElement;

    constructor(child: PDFElement, {width=-1, height=-1, flex=1}) {
        super(width, height, flex);
        this.child = child;
    }

    render(doc: PDFKit.PDFDocument, x: number, y: number): void {
        new PDFColumn( 
            [ new PDFRow( [ this.child, ], {} ) ],
            { align:"center", width: this.width, height: this.height }
        ).render(doc, x, y);
    }
    getWidth(): number {
        return this.width;
    }
    getHeight(): number {
        return this.height;
    }

}