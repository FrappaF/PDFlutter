"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFColumn = void 0;
const pdf_alignment_1 = require("./pdf_alignment");
class PDFColumn extends pdf_alignment_1.PDfAlignment {
    constructor(children, { width = -1, height = -1, flex = 1, align = 'center' }) {
        super(children, { width: width, height: height, flex: flex, align: align });
    }
    getTotalWidth() {
        if (this.width != -1)
            return this.width;
        let maxWidth = 0;
        this.children.forEach((child) => {
            if (maxWidth < child.getWidth())
                maxWidth = child.getWidth();
        });
        return maxWidth + 2 * this.margin;
    }
    getTotalHeight() {
        if (this.height != -1)
            return this.height;
        let totalHeight = 0;
        this.children.forEach((child) => {
            totalHeight += child.getHeight();
        });
        return totalHeight + 2 * this.margin;
    }
    getHeight() {
        return this.getTotalHeight();
    }
    getWidth() {
        return this.getTotalWidth();
    }
    render(doc, x, y) {
        let totalFlexing = 0;
        let totalHeight = 0;
        this.children.forEach((child) => {
            totalFlexing += child.flex;
            totalHeight += child.getHeight();
        });
        let maxWidth = this.getTotalWidth();
        let totalSpaceForEveryChild = (y + this.height) / totalFlexing;
        let prevFlex = 1;
        let middle = y + this.height / 2;
        let position = middle - (totalHeight / 2);
        console.log(totalHeight);
        this.children.forEach((child, index) => {
            console.log('Positioning Element:');
            console.log(child);
            let currentY;
            switch (this.align) {
                case 'center':
                    currentY = position;
                    position += child.getHeight();
                    child.height = child.getHeight();
                    break;
                case 'space-around':
                    currentY = y + (index * totalSpaceForEveryChild * prevFlex);
                    child.height = totalSpaceForEveryChild * child.flex;
                    break;
                default:
                    currentY = y + (index * totalSpaceForEveryChild * prevFlex);
                    child.height = totalSpaceForEveryChild * child.flex;
            }
            if (index == 0)
                currentY += this.margin;
            if (index == this.children.length)
                currentY -= this.margin;
            // child.height = totalSpaceForEveryChild * child.flex;
            child.width = maxWidth;
            child.render(doc, x, currentY);
            prevFlex = child.flex;
        });
    }
}
exports.PDFColumn = PDFColumn;
//# sourceMappingURL=column.js.map