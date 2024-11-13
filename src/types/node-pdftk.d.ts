declare module 'node-pdftk' {
  interface PDFDocument {
    input(pdfPath: string): Promise<PDFDocument>;
    burst(outputPattern: string): Promise<string[]>;
    output(): Promise<Buffer>;
  }

  function input(pdfPath: string): PDFDocument;
  
  export = {
    input
  };
}
