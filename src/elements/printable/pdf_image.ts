import { PDFElement } from "../pdf_element";

export class PDFImage extends PDFElement {
    
    
    url: string;
    align: string;
    aspectRatio: number[];

    constructor(name: string, {flex=1, width=-1, height= -1, aspectRatio=[4, 3],align='center'}) {
        super(width, height, flex);
        this.url =  __dirname.split('/').slice(0, -2).join('/') + "/images/" + name;
        this.align = align;
        this.aspectRatio = aspectRatio;
    }

    render(doc: PDFKit.PDFDocument, x: number, y: number) : void {
        
        this.getRightSize();

        let imageSection = doc.struct('Sect');
        doc.addStructure(imageSection);
    
        imageSection.add(
            doc.struct(
                'Figure',
                {
                  alt: 'Prova Logo'
                },
                () => {
                  doc.image(this.url, x, y, {
                    width: this.width,
                    height: this.height,
                    // cover: [this.width, this.height],
                    align: "center"
                  });
                }
            )
        );

        imageSection.end();
        
    }

    

    getRightSize() : [number, number] {
        if(this.width < 1) {
            // this.width = 50;
            if(this.height < 1) {
                this.height = 100;
            }
            this.width = this.aspectRatio[0] / this.aspectRatio[1] * this.height;
        } else if(this.height < 1){
            this.height = this.aspectRatio[1] / this.aspectRatio[0] * this.width;
        }
        return [this.width, this.height];
    }

    getWidth(): number {
        return this.getRightSize()[0];
    }

    getHeight(): number {
        return this.getRightSize()[1];
    }
    

}