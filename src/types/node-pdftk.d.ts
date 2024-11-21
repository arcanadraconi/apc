declare module 'node-pdftk' {
  interface PDFDocument {
    input(pdfPath: string): PDFDocument;
    burst(outputPattern: string): Promise<string[]>;
    output(outputPath?: string): Promise<Buffer>;
    dumpData(): Promise<string>;
    cat(pageRange: string): PDFDocument;
  }

  function input(pdfPath: string): PDFDocument;
  
  export = {
    input
  };
}
