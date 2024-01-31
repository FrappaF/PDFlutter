"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const pdfkit_1 = __importDefault(require("pdfkit"));
const pdf_center_1 = __importDefault(require("./elements/alignment/pdf_center"));
const pdf_column_1 = require("./elements/alignment/pdf_column");
const pdf_column_document_1 = __importDefault(require("./elements/alignment/pdf_column_document"));
const pdf_row_1 = require("./elements/alignment/pdf_row");
const pdf_image_1 = require("./elements/printable/pdf_image");
const pdf_table_1 = __importDefault(require("./elements/printable/pdf_table"));
const pdf_text_1 = require("./elements/printable/pdf_text");
const MARGIN = 10;
var doc = new pdfkit_1.default({
    pdfVersion: '1.5',
    displayTitle: true,
    size: 'A4',
    margin: MARGIN
});
doc.pipe((0, fs_1.createWriteStream)('tabella.pdf'));
var struct = doc.struct('Document');
doc.addStructure(struct);
(0, pdf_column_document_1.default)(doc, 'A4', MARGIN, [
    new pdf_table_1.default(["prima", "seconda", "terza", "quarta", "quinta"], [
        [
            new pdf_text_1.PDFText("CiaoCIAOOAOAOSD asdasdasdas asdasdfasdJOASJDaldkhaslkhdnkahskdhkashdklhaskdjhajksdhjkashjdhajkhkjasdkjaklsdjkajsdkjaklsdjklajsdkljaksldjkajsdkjakljsdlkjasdjlkasjdkasjdjaskljdkjasjdklaknaskdnakslndklanskdnandlankdsna", { flex: 1 }),
            new pdf_text_1.PDFText("Ciao", {}),
            new pdf_text_1.PDFText("Ciao", { flex: 1 }), new pdf_text_1.PDFText("Ciao", {}),
            new pdf_image_1.PDFImage('luft.png', { height: 100, flex: 4 }),
        ],
        [
            new pdf_text_1.PDFText("Mondo", {}), new pdf_text_1.PDFText("Mondo", {}),
            new pdf_text_1.PDFText("CiaoCIAOOAOAOSDJOASJDaldkhaslkhdnkahskdhkashdklhaskdjhajksdhjkashjdhajkhkjasdkjaklsdjkajsdkjaklsdjklajsdkljaksldjkajsdkjakljsdlkjasdjlkasjdkasjdjaskljdkjasjdklaknaskdnakslndklanskdnandlankdsna", { flex: 3 }),
            new pdf_text_1.PDFText("Mondo", {}),
            new pdf_text_1.PDFText("Mondo", {}),
        ],
    ], { margin: 3 }),
    new pdf_row_1.PDFRow([
        new pdf_column_1.PDFColumn([
            new pdf_text_1.PDFText('Lorem', { fontSize: 22, flex: 6 }),
            new pdf_text_1.PDFText('Porem', { fontSize: 12 }),
        ], {}),
        new pdf_column_1.PDFColumn([
            new pdf_text_1.PDFText('Abra', { fontSize: 12 }),
            new pdf_text_1.PDFText('Cadabra', { fontSize: 22 }),
            new pdf_text_1.PDFText('BlaBla', { fontSize: 14, flex: 2 }),
        ], {}),
    ], { flex: 1 }),
    new pdf_center_1.default(new pdf_image_1.PDFImage('luft.png', { height: 100 }), {}),
]);
// new PDFText("PROvA asdads", {width: 400, height: 400, align:"left", fontSize: }).render(doc, 50, 50);
doc.end();
//# sourceMappingURL=index.js.map