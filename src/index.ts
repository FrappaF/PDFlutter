import { createWriteStream } from "fs";
import PDFDocument from "pdfkit";
import PDFCenter from "./elements/alignment/pdf_center";
import { PDFColumn } from "./elements/alignment/pdf_column";
import PDFColumnDocument from "./elements/alignment/pdf_column_document";
import { PDFRow } from "./elements/alignment/pdf_row";
import { PDFImage } from "./elements/printable/pdf_image";
import PDFTable from "./elements/printable/pdf_table";
import { PDFText } from "./elements/printable/pdf_text";

const MARGIN = 10;

var doc = new PDFDocument({
    pdfVersion: '1.5',
    displayTitle: true,
    size: 'A4',
    margin: MARGIN
});

doc.pipe(createWriteStream('tabella.pdf'));

var struct = doc.struct('Document');
doc.addStructure(struct);

PDFColumnDocument(
    doc, 'A4', MARGIN,
    [
        new PDFTable(
            ["prima", "seconda", "terza", "quarta", "quinta"],
            [
                [
                    new PDFText("CiaoCIAOOAOAOSD asdasdasdas asdasdfasdJOASJDaldkhaslkhdnkahskdhkashdklhaskdjhajksdhjkashjdhajkhkjasdkjaklsdjkajsdkjaklsdjklajsdkljaksldjkajsdkjakljsdlkjasdjlkasjdkasjdjaskljdkjasjdklaknaskdnakslndklanskdnandlankdsna", {flex: 1}), 
                    new PDFText("Ciao", {}), 
                    new PDFText("Ciao", {flex: 1}), new PDFText("Ciao", {}), 
                    new PDFImage('luft.png', {height: 100, flex: 4}),
                ],
                [
                    new PDFText("Mondo", {}), new PDFText("Mondo", {}), 
                    new PDFText("CiaoCIAOOAOAOSDJOASJDaldkhaslkhdnkahskdhkashdklhaskdjhajksdhjkashjdhajkhkjasdkjaklsdjkajsdkjaklsdjklajsdkljaksldjkajsdkjakljsdlkjasdjlkasjdkasjdjaskljdkjasjdklaknaskdnakslndklanskdnandlankdsna", {flex: 3}), 
                     
                    new PDFText("Mondo", {}), 
                    new PDFText("Mondo", {}), 
                ],
            ],
            {margin: 3}
        ),
        new PDFRow(
            [
                new PDFColumn(
                    [
                        new PDFText('Lorem', {fontSize: 22, flex: 6}),
                        new PDFText('Porem', {fontSize: 12}),
                    ], 
                    {}
                ),
                new PDFColumn(
                    [
                        new PDFText('Abra', {fontSize: 12}),
                        new PDFText('Cadabra', {fontSize: 22}),
                        new PDFText('BlaBla', {fontSize: 14, flex: 2}),
                    ], 
                    {}
                ),
            ],
            {flex: 1}
        ),
        new PDFCenter( new PDFImage('luft.png', {height: 100}), {} ),
    ]
);

// new PDFText("PROvA asdads", {width: 400, height: 400, align:"left", fontSize: }).render(doc, 50, 50);

doc.end();