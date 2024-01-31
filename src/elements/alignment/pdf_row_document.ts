import { PDFElement } from "../pdf_element";
import { PDFRow } from "./pdf_row";
import Sizes from "../../constants/page_sizes";

export default function PDFRowDocument(doc: PDFKit.PDFDocument, size: string, margin: number, children: PDFElement[]) : void {

    let width = Sizes[size].maxWidth - 2 * margin;
    let height = Sizes[size].maxHeight - 2 * margin;
 

    new PDFRow(children, {width: width, height: height}).render(doc, margin, margin);

}