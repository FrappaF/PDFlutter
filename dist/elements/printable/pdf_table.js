"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_element_1 = require("../pdf_element");
const page_sizes_1 = __importDefault(require("../../constants/page_sizes"));
class PDFTable extends pdf_element_1.PDFElement {
    columnsLabel;
    content;
    margin;
    labelFont;
    constructor(columnsLabel, content, { margin = 0, labelFont = 14, width = -1, height = -1, flex = 1 }) {
        super(width, height, flex);
        this.columnsLabel = columnsLabel;
        this.content = content;
        this.margin = margin;
        this.labelFont = labelFont;
    }
    generateTable(vectorSection, doc, x, y) {
        const COLUMNS_HEIGHT = this.height * 0.15 + this.margin;
        const END_X = Math.min(x + this.width, page_sizes_1.default[doc.page.size].maxWidth);
        const END_Y = Math.min(y + this.height, page_sizes_1.default[doc.page.size].maxHeight);
        //LINEA SOPRA
        vectorSection.add(doc.struct('Figure', {
            alt: 'Testa'
        }, () => {
            doc
                .save()
                .moveTo(x, y)
                .lineTo(END_X, y)
                .stroke();
            // .lineTo(250, 250)
            // .fill('#FF8800');
        }));
        //LATO SINISTRO
        vectorSection.add(doc.struct('Figure', {
            alt: 'Lato Sinistro'
        }, () => {
            doc.save()
                .moveTo(x, y)
                .lineTo(x, END_Y)
                .stroke();
        }));
        //LATO DESTRO
        vectorSection.add(doc.struct('Figure', {
            alt: 'Lato Destro'
        }, () => {
            doc.save()
                .moveTo(END_X, y)
                .lineTo(END_X, END_Y)
                .stroke();
        }));
        //LINEA SOTTO
        vectorSection.add(doc.struct('Figure', {
            alt: 'BOTTOM'
        }, () => {
            doc.save()
                .moveTo(x, END_Y)
                .lineTo(END_X, END_Y)
                .stroke();
        }));
        vectorSection.add(doc.struct('Figure', {
            alt: 'Linea Col'
        }, () => {
            doc.save()
                .moveTo(x, y + COLUMNS_HEIGHT)
                .lineTo(END_X, y + COLUMNS_HEIGHT)
                .stroke();
        }));
        let flexing = [];
        this.content.forEach((row, idxRow) => {
            row.forEach((el, idxEl) => {
                if (idxRow == 0) {
                    flexing.push(el.flex);
                }
                else if (flexing[idxEl] < el.flex) {
                    flexing[idxEl] = el.flex;
                }
            });
        });
        let totalFlexing = 0;
        flexing.forEach(flex => totalFlexing += flex);
        //COLONNE
        let spaceForEveryColumn = this.width / totalFlexing;
        let prevWidth = x;
        for (let i = 0; i < this.columnsLabel.length; ++i) {
            let currentX = spaceForEveryColumn * (flexing[i]) + prevWidth;
            let currentY = y;
            //LINEA
            if (i < this.columnsLabel.length - 1)
                vectorSection.add(doc.struct('Figure', {
                    alt: 'Linea Col' + i
                }, () => {
                    doc.save()
                        .moveTo(currentX, currentY)
                        .lineTo(currentX, END_Y)
                        .stroke();
                }));
            // TESTO
            doc.fontSize(this.labelFont);
            doc.text(this.columnsLabel[i], prevWidth, currentY + this.margin, {
                width: spaceForEveryColumn * flexing[i] - (2 * this.margin),
                height: COLUMNS_HEIGHT - (2 * this.margin),
                align: 'center',
                stroke: true
            });
            prevWidth = currentX;
        }
        let flexingRow = [];
        this.content.forEach((row) => {
            let maxFlex = 0;
            row.forEach(el => { if (maxFlex < el.flex)
                maxFlex = el.flex; });
            flexingRow.push(maxFlex);
        });
        totalFlexing = 0;
        flexingRow.forEach(flex => totalFlexing += flex);
        //RIGHE
        let spaceForEveryRow = (this.height - COLUMNS_HEIGHT) / totalFlexing;
        let prevHeight = x + COLUMNS_HEIGHT;
        for (let i = 0; i < this.content.length; i++) {
            let currentY = prevHeight + (spaceForEveryRow * flexingRow[i]);
            //LINEA
            if (i < this.content.length - 1)
                vectorSection.add(doc.struct('Figure', {
                    alt: 'Linea Riga' + i
                }, () => {
                    doc.save()
                        .moveTo(x, currentY)
                        .lineTo(END_X, currentY)
                        .stroke();
                }));
            prevHeight = currentY;
        }
        // CELLE
        prevHeight = y + COLUMNS_HEIGHT;
        for (let i = 0; i < this.content.length; i++) {
            prevWidth = x;
            for (let j = 0; j < this.content[i].length; j++) {
                // let currentY = (spaceForEveryRow * flexing[j]) + prevHeight;
                let currentX = (spaceForEveryColumn * flexing[j]) + prevWidth;
                this.content[i][j].width = spaceForEveryColumn * flexing[j] - (2 * this.margin);
                this.content[i][j].height = spaceForEveryRow * flexingRow[i] - (2 * this.margin);
                this.content[i][j].render(doc, prevWidth + this.margin, prevHeight + this.margin);
                prevWidth = currentX;
            }
            prevHeight += (spaceForEveryRow * flexingRow[i]);
        }
    }
    render(doc, x, y) {
        let vectorSection = doc.struct('Sect');
        doc.addStructure(vectorSection);
        this.generateTable(vectorSection, doc, x, y);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
exports.default = PDFTable;
//# sourceMappingURL=pdf_table.js.map