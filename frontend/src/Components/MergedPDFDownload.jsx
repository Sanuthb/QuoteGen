import { useState } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import { Button } from "antd"; // Assuming you're using Ant Design
import QuotePDF from "../QuotePDF";

const MergedPDFDownload = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  // const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

  const handleMergeAndDownload = async () => {
    try {
      setIsGenerating(true);

      // Generate the quote PDF
      const quotePdfBlob = await pdf(<QuotePDF data={data} />).toBlob();
      const quotePdfBytes = await quotePdfBlob.arrayBuffer();

      // Load your footer PDF - update this path to your actual footer PDF
      const footerPdfBytes = await fetch("/footer.pdf").then((res) =>
        res.arrayBuffer()
      );

      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      // Add pages from both PDFs
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

      // Add all pages to the new document
      quotePages.forEach((page) => mergedPdf.addPage(page));
      footerPages.forEach((page) => mergedPdf.addPage(page));

      // Save the merged PDF
      const mergedPdfBytes = await mergedPdf.save();

      // Create a URL for the merged PDF
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Create and click a download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.to}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
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
