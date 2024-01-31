"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_row_1 = require("./pdf_row");
const page_sizes_1 = __importDefault(require("../../constants/page_sizes"));
function PDFRowDocument(doc, size, margin, children) {
    let width = page_sizes_1.default[size].maxWidth - 2 * margin;
    let height = page_sizes_1.default[size].maxHeight - 2 * margin;
    new pdf_row_1.PDFRow(children, { width: width, height: height }).render(doc, margin, margin);
}
exports.default = PDFRowDocument;
//# sourceMappingURL=pdf_row_document.js.map