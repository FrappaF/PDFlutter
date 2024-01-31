"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFRow = void 0;
const pdf_alignment_1 = require("./pdf_alignment");
class PDFRow extends pdf_alignment_1.PDfAlignment {
    constructor(children, { width = -1, height = -1, flex = 1, align = 'center' }) {
        super(children, { align: align, width: width, height: height, flex: flex });
    }
    render(doc, x, y) {
        let totalFlexing = 0;
        this.children.forEach((child) => {
            totalFlexing += child.flex;
        });
        let maxHeight = this.getTotalHeight();
        let totalSpaceForEveryChild = this.width / totalFlexing;
        let prevFlex = 1;
        this.children.forEach((child, index) => {
            let currentX = x + (index * totalSpaceForEveryChild * prevFlex);
            if (index == 0)
                currentX += this.margin;
            if (index == this.children.length)
                currentX -= this.margin;
            currentX -= child.getWidth() / 2;
            child.width = totalSpaceForEveryChild * child.flex;
            child.height = maxHeight;
            child.render(doc, currentX, y);
            prevFlex = child.flex;
        });
    }
    getWidth() {
        return this.getTotalWidth();
    }
    getHeight() {
        return this.getTotalHeight();
    }
    getTotalWidth() {
        if (this.width != -1)
            return this.width;
        let totalWidth = 0;
        this.children.forEach((child) => {
            totalWidth += child.getWidth();
        });
        return totalWidth + 2 * this.margin;
    }
    getTotalHeight() {
        if (this.height != -1)
            return this.height;
        let maxHeight = 0;
        this.children.forEach((child) => {
            if (maxHeight < child.getHeight())
                maxHeight = child.getHeight();
        });
        return maxHeight;
    }
}
exports.PDFRow = PDFRow;
//# sourceMappingURL=row.js.map