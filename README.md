# PDFlutter
Build custom PDFs using Flutter like syntax and elements.

## How to run

Run the command `npm install && npm run build`

## How to use it
All the elements of a page must be children of a `PDFPage` object. 
A page can be aligned horizontally or vertically using `PDFRowDocument` or `PDFColumnDocument` respectively.
Inside a page you can add multiple `printable` children like tables (`PDFTable`), text (`PDFText`), images (`PDFImage`) and so on.
Every printable has its own property and can be aligned using the `alignment` elements, e.g. `PDFCenter`, `PDFRow` etc.

### Here is an example of usage
```
// Importing necessary modules from the file system, pdfkit and other local files
import PDFCenter from "./elements/alignment/pdf_center";
import { PDFColumn } from "./elements/alignment/pdf_column";
import { PDFRow } from "./elements/alignment/pdf_row";
import { PDFImage } from "./elements/printable/pdf_image";
import PDFTable from "./elements/printable/pdf_table";
import { PDFText } from "./elements/printable/pdf_text";
import PDFPage from "./pdf_document";

// Setting the margin for the PDF document
const MARGIN = 10;

var page = new PDFPage(
    'prova.pdf',
    "1.5",
        [
        // Adding a table to the PDF document
        new PDFTable(
            ["prima", "seconda", "terza", "quarta", "quinta"],
            [
                // Adding rows to the table
                [
                    // Adding cells to the row
                    new PDFText("CiaoCIAOOAOAOSD asdasdasdas asdasdfasdJOASJDaldkhaslkhdnkahskdhkashdklhaskdjhajksdhjkashjdhajkhkjasdkjaklsdjkajsdkjaklsdjklajsdkljaksldjkajsdkjakljsdlkjasdjlkasjdkasjdjaskljdkjasjdklaknaskdnakslndklanskdnandlankdsna", {flex: 1}), 
                    new PDFText("Ciao", {}), 
                    new PDFText("Ciao", {flex: 1}), new PDFText("Ciao", {}), 
                    new PDFImage('luft.png', {height: 100, flex: 4}),
                ],
                // Adding another row to the table
                [
                    new PDFText("Mondo", {}), new PDFText("Mondo", {}), 
                    new PDFText("CiaoCIAOOAOAOSDJOASJDaldkhaslkhdnkahskdhkashdklhaskdjhajksdhjkashjdhajkhkjasdkjaklsdjkajsdkjaklsdjklajsdkljaksldjkajsdkjakljsdlkjasdjlkasjdkasjdjaskljdkjasjdklaknaskdnakslndklanskdnandlankdsna", {flex: 3}), 
                     
                    new PDFText("Mondo", {}), 
                    new PDFText("Mondo", {}), 
                ],
            ],
            {margin: 3}
        ),
        // Adding a row to the PDF document
        new PDFRow(
            [
                // Adding columns to the row
                new PDFColumn(
                    [
                        new PDFText('Lorem', {fontSize: 22, flex: 6}),
                        new PDFText('Porem', {fontSize: 12}),
                    ], 
                    {}
                ),
                new PDFColumn(
                    [
                        new PDFText('Abra', {fontSize: 12}),
                        new PDFText('Cadabra', {fontSize: 22}),
                        new PDFText('BlaBla', {fontSize: 14, flex: 2}),
                    ], 
                    {}
                ),
            ],
            {flex: 1}
        ),
        // Adding an image to the PDF document
        new PDFCenter( new PDFImage('luft.png', {height: 100}), {} ),
    ],
    {margin: MARGIN},

);

page.render();

```

