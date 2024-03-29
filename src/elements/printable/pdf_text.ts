import { PDFElement } from "../pdf_element";

export class PDFText extends PDFElement {
    
    
    text: string;
    fontSize: number;
    align: string;
    stroke: boolean;

    constructor(text: string, {flex=1, width=-1, height= -1, fontSize=12, align='justify', stroke=false}) {
        super(width, height, flex);
        this.flex = flex;
        this.text = text;
        this.fontSize = fontSize;
        this.width = width;
        this.height = height;
        this.align = align;
        this.stroke = stroke;
    }

    render(doc: PDFKit.PDFDocument, x: number, y: number) : void {
        // this.checkFontSize();
        doc.fontSize(this.fontSize);
        if(this.width == -1) {
            this.getRightWidth();
        }

        // doc.addStructure(
        //     doc.struct(
        //       'Figure',
        //       {
        //         alt: 'Testa'
        //       },
        //       () => {
        //         doc
        //           .save()
        //           .moveTo(x, y)
        //           .lineTo(this.getTextWidth(), y)
        //           .stroke();
        //           // .lineTo(250, 250)
        //           // .fill('#FF8800');
        //       }
        //     )
        // );
        // doc.moveTo(x, y+1);

        doc.text(this.text, x, y, {
            width: this.width,
            align: this.align,
            height: this.height,
            stroke: this.stroke
        });
    }

    checkFontSize() : void {
        console.log("JASKDHKADS");
        
        console.log((this.getTextWidth() / (this.width)));
        console.log(this.getHeight() );
        
        if ((this.getTextWidth() / (this.width)) >= 1) {
            if( this.getTextHeight() >= this.height )
                this.fontSize = (this.width * (this.height / (this.getFontHeight()))) / this.text.length + 1;
                // this.fontSize = Math.round(this.width / 14.5);
        }
    }

    getRightWidth() : number {
        if(this.width < 1)
            this.width = this.getTextWidth();
        return this.width;
    }

    getTextWidth() : number {
        let totalWidth = 0;
        this.text.split('').forEach((c) => {
            if(c.toUpperCase() == c) {
                totalWidth += this.fontSize / 1.2
            }
            else if( c == " ") {
                totalWidth += 3;
            } else {
                totalWidth += this.fontSize / 1.4
            }
        });
        return  totalWidth;
    }

    getTextHeight() : number {
        let textLength = this.getTextWidth();
        return Math.ceil(textLength / this.width) * this.getFontHeight();
    }

    getWidth(): number {
        return this.getRightWidth();
    }

    getFontHeight() : number { return this.fontSize * 1.5; }

    getHeight(): number {
        // if(this.height < 1) return this.fontSize  * 1.5;

        // let fontHeight = this.getFontHeight();
        // let rows = Math.ceil(Math.min( this.height / (fontHeight),  this.getTextHeight()));
        // return fontHeight * (rows);
        // if(this.height > this.getTextHeight()) return this.getTextHeight();
        return this.height > 1 ? this.height : this.getFontHeight();
    }
    

}