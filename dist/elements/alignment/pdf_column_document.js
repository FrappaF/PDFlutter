"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_sizes_1 = __importDefault(require("../../constants/page_sizes"));
const pdf_column_1 = require("./pdf_column");
function PDFColumnDocument(doc, size, margin, children) {
    let width = page_sizes_1.default[size].maxWidth - 2 * margin;
    let height = page_sizes_1.default[size].maxHeight - 2 * margin;
    new pdf_column_1.PDFColumn(children, { width: width, height: height, align: 'space-around' }).render(doc, margin, margin);
}
exports.default = PDFColumnDocument;
//# sourceMappingURL=pdf_column_document.js.map