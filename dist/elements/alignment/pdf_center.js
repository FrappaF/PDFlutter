"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_element_1 = require("../pdf_element");
const pdf_column_1 = require("./pdf_column");
const pdf_row_1 = require("./pdf_row");
class PDFCenter extends pdf_element_1.PDFElement {
    child;
    constructor(child, { width = -1, height = -1, flex = 1 }) {
        super(width, height, flex);
        this.child = child;
    }
    render(doc, x, y) {
        new pdf_column_1.PDFColumn([new pdf_row_1.PDFRow([this.child,], {})], { align: "center", width: this.width, height: this.height }).render(doc, x, y);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
exports.default = PDFCenter;
//# sourceMappingURL=pdf_center.js.map