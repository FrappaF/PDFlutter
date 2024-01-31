"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFImage = void 0;
const pdf_element_1 = require("../pdf_element");
class PDFImage extends pdf_element_1.PDFElement {
    url;
    align;
    aspectRatio;
    constructor(name, { flex = 1, width = -1, height = -1, aspectRatio = [4, 3], align = 'center' }) {
        super(width, height, flex);
        this.url = __dirname.split('/').slice(0, -2).join('/') + "/images/" + name;
        this.align = align;
        this.aspectRatio = aspectRatio;
    }
    render(doc, x, y) {
        this.getRightSize();
        let imageSection = doc.struct('Sect');
        doc.addStructure(imageSection);
        imageSection.add(doc.struct('Figure', {
            alt: 'Prova Logo'
        }, () => {
            doc.image(this.url, x, y, {
                width: this.width,
                height: this.height,
                // cover: [this.width, this.height],
                align: "center"
            });
        }));
        imageSection.end();
    }
    getRightSize() {
        if (this.width < 1) {
            // this.width = 50;
            if (this.height < 1) {
                this.height = 100;
            }
            this.width = this.aspectRatio[0] / this.aspectRatio[1] * this.height;
        }
        else if (this.height < 1) {
            this.height = this.aspectRatio[1] / this.aspectRatio[0] * this.width;
        }
        return [this.width, this.height];
    }
    getWidth() {
        return this.getRightSize()[0];
    }
    getHeight() {
        return this.getRightSize()[1];
    }
}
exports.PDFImage = PDFImage;
//# sourceMappingURL=pdf_image.js.map