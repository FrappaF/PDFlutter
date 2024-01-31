import { PDFElement } from "../pdf_element";
import { PDfAlignment } from "./pdf_alignment";


export class PDFRow extends PDfAlignment {
    
    constructor(children: PDFElement[], {width = -1, height = -1, flex = 1, align = 'center'}){
        super(children, {align: align, width: width, height: height, flex: flex});
    }
    
    render(doc: PDFKit.PDFDocument, x: number, y: number): void {
        let totalFlexing = 0;
        this.children.forEach((child) => {
            totalFlexing += child.flex;
        });

        let maxHeight = this.getTotalHeight();
        
        let totalSpaceForEveryChild = this.width / totalFlexing;
        
        let prevFlex = 1;
        this.children.forEach((child, index) => {
            let currentX = x + (index * totalSpaceForEveryChild * prevFlex) + totalSpaceForEveryChild / 2;
            
            if(index == 0) currentX += this.margin;
            if(index == this.children.length) currentX -= this.margin;

            
            
            
            if(child.width < 1) child.width = totalSpaceForEveryChild * child.flex;
            if(child.height < 1) child.height = maxHeight;
            
            currentX -= child.getWidth() / 2;
            
            console.log("Row child");
            console.log(child);
            

            child.render(doc, currentX, y);
            
            prevFlex = child.flex;
        });
        
    }
    
    getWidth(): number {
        return this.getTotalWidth();
    }

    getHeight(): number {
        return this.getTotalHeight();
    }

    getTotalWidth(): number {
        if(this.width != -1) return this.width;

       let totalWidth = 0;
       this.children.forEach((child) => {
            totalWidth += child.getWidth();
       });

       return totalWidth + 2 * this.margin;
    }

    getTotalHeight(): number {
        if(this.height != -1) return this.height;

        let maxHeight = 0;
        this.children.forEach((child) => {
            if(maxHeight < child.getHeight())
                maxHeight = child.getHeight();
        });

        return maxHeight;
    }

}