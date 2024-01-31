import { PDFElement } from "../pdf_element";
import Sizes from "../../constants/page_sizes";
import { PDFColumn } from "./pdf_column";


export default function PDFColumnDocument(doc: PDFKit.PDFDocument, size: string, margin: number, children: PDFElement[]) : void {

    let width = Sizes[size].maxWidth - 2 * margin;
    let height = Sizes[size].maxHeight - 2 * margin;
    
    
    new PDFColumn(children, {width: width, height: height, align: 'space-around'}).render(doc, margin, margin);

}