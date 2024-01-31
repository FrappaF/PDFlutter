"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDfAlignment = void 0;
const pdf_element_1 = require("../pdf_element");
class PDfAlignment extends pdf_element_1.PDFElement {
    children;
    align;
    margin;
    constructor(children, { align = 'center', margin = 0, width = -1, height = -1, flex = 1 }) {
        super(width, height, flex);
        this.children = children;
        this.align = align;
        this.margin = margin;
    }
}
exports.PDfAlignment = PDfAlignment;
//# sourceMappingURL=pdf_alignment.js.map