import { PDFElement } from "../pdf_element";
import { PDfAlignment } from "./pdf_alignment";


export class PDFColumn extends PDfAlignment {
    
    

    constructor(children: PDFElement[], {width = -1, height = -1, flex = 1, align = 'center'}){
        super(children, {width: width, height: height, flex: flex, align: align});
    }


    getTotalWidth(): number {
        if(this.width != -1) return this.width;

        let maxWidth = 0;
        this.children.forEach((child) => {
            if(maxWidth < child.getWidth())
                maxWidth = child.getWidth();
        });

        return maxWidth + 2 * this.margin;
    }

    getTotalHeight(): number {
        if(this.height != -1) return this.height;

        let totalHeight = 0;
        this.children.forEach((child) => {
            totalHeight += child.getHeight();
        });

        return totalHeight + 2 * this.margin;
    }

    getHeight(): number {
        return this.getTotalHeight();
    }

    getWidth(): number {
        return this.getTotalWidth();
    }

    render(doc: PDFKit.PDFDocument, x: number, y: number): void {
        let totalFlexing = 0;
        let totalHeight = 0;
        this.children.forEach((child) => {
            totalFlexing += child.flex;
            totalHeight += child.getHeight();
        });

        let maxWidth = this.getTotalWidth();
        
        
        let totalSpaceForEveryChild =  this.height / totalFlexing;
        let prevHeight = y;
        let middle = y + this.height / 2;
        let position = middle - (totalHeight / 2);
        console.log(totalSpaceForEveryChild);
        console.log(totalFlexing);
        
        this.children.forEach((child, index) => {

            
            
            let currentY: number;

            switch(this.align) {
                case 'center':
                    
                    currentY = position;
                    position += child.getHeight();
                    child.height = child.getHeight();
                    break;

                case 'space-around':
                    currentY = prevHeight;
                    // child.height = totalSpaceForEveryChild * child.flex;
                    break;

                default:
                    currentY = prevHeight;  
                    // child.height = totalSpaceForEveryChild * child.flex; 
            }

            
            if(index == 0) currentY += this.margin;
            if(index == this.children.length) currentY -= this.margin;

            if(child.height < 1) child.height = totalSpaceForEveryChild * child.flex;
            if(child.width < 1) child.width = maxWidth;
            console.log('Positioning Element:');
            console.log(child);
            child.render(doc, x, currentY);
            
            prevHeight += (child.flex * totalSpaceForEveryChild);
        });
    }

    

}