import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// 加载 PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
 
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const pdf = await pdfjs.getDocument(pdfUrl).promise;
        setNumPages(pdf.numPages);
      } catch (error) {
        console.error("Failed to fetch PDF:", error);
      }
    };

    fetchPdf();
  }, [pdfUrl]);

  const renderPages = () => {
    const pages = [];

    for (let pageNumber = 1; pageNumber <= numPages!; pageNumber++) {
      pages.push(<Page key={`page_${pageNumber}`} pageNumber={pageNumber} />);
    }

    return pages;
  };

  return (
    
    <div>
      {numPages && (
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {renderPages()}
        </Document>
      )}
    </div>
  );
};

export default PdfViewer;
