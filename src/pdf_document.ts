import { PDFElement } from "./elements/pdf_element";
import { createWriteStream } from "fs";
import PDFDocument from "pdfkit";
import PDFColumnDocument from "./elements/alignment/pdf_column_document";


export default class PDFPage{

    children: PDFElement[];
    doc: PDFKit.PDFDocument;
    struct: PDFKit.PDFStructureElement;

    constructor(  name: string, pdfVersion:'1.3' | '1.4' | '1.5' | '1.6' | '1.7' | '1.7ext3' | undefined, children: PDFElement[],
        {displayTitle= true, size='A4', margin=0,}) {

        this.children = children;
        this.doc = new PDFDocument({
            pdfVersion: pdfVersion,
            displayTitle: displayTitle,
            size: size,
            margin: margin,
        });
        this.doc.pipe(createWriteStream(name));
        this.struct = this.doc.struct('Document');

    }

    render(): void {
        this.doc.addStructure(this.struct);
        PDFColumnDocument(
            this.doc, 
            this.doc.page.size,
            this.doc.page.margins.top,
            this.children,
        );
        this.doc.end();
    }
  

}