import { useState } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import { Button } from "antd"; 
import QuotePDF from "../QuotePDF";

const MergedPDFDownload = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleMergeAndDownload = async () => {
    try {
      setIsGenerating(true);

      const quotePdfBlob = await pdf(<QuotePDF data={data} />).toBlob();
      const quotePdfBytes = await quotePdfBlob.arrayBuffer();

      const footerPdfBytes = await fetch("/footer.pdf").then((res) =>
        res.arrayBuffer()
      );

      const mergedPdf = await PDFDocument.create();

      const quotePdfDoc = await PDFDocument.load(quotePdfBytes);
      const footerPdfDoc = await PDFDocument.load(footerPdfBytes);

      const quotePages = await mergedPdf.copyPages(
        quotePdfDoc,
        quotePdfDoc.getPageIndices()
      );
      const footerPages = await mergedPdf.copyPages(
        footerPdfDoc,
        footerPdfDoc.getPageIndices()
      );

      quotePages.forEach((page) => mergedPdf.addPage(page));
      footerPages.forEach((page) => mergedPdf.addPage(page));

      const mergedPdfBytes = await mergedPdf.save();

      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.to}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 100);

      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating merged PDF:", error);
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="primary"
      className="mt-4"
      onClick={handleMergeAndDownload}
      loading={isGenerating}
    >
      Download PDF
    </Button>
  );
};

export default MergedPDFDownload;
