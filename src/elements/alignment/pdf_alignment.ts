import { PDFElement } from "../pdf_element";

interface Opt {
    align: string; 
}

interface Style {
    margin: number;
}



export abstract class PDfAlignment extends PDFElement implements Opt, Style {
    
    children : PDFElement[];
    align: string;
    margin: number;

    constructor(children : PDFElement[], {align = 'center', margin = 0, width = -1, height = -1, flex = 1}) {
        super(width, height, flex);
        
        this.children = children;
        this.align = align;
        this.margin = margin;
    }

    abstract getTotalWidth() : number;
    abstract getTotalHeight() : number;

}