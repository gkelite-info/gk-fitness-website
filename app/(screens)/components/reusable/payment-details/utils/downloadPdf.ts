import { toJpeg } from 'html-to-image';
import { jsPDF } from "jspdf";

export const downloadPdf = async (elementId: string, filename: string = "invoice.pdf"): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Invoice content not found.");
  }

  try {
    const a4Width = 210;
    const a4Height = 297;

    const dataUrl = await toJpeg(element, { 
      quality: 0.95,
      backgroundColor: '#111319',
      pixelRatio: 2,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgWidth = a4Width;
    const imgHeight = (img.height * imgWidth) / img.width;
    
    let position = 0;

    pdf.setFillColor(17, 19, 25);
    pdf.rect(0, 0, a4Width, a4Height, "F");

    pdf.addImage(dataUrl, "JPEG", 0, position, imgWidth, imgHeight);

    let heightLeft = imgHeight - a4Height;
    while (heightLeft > 0) {
      position = position - a4Height;
      pdf.addPage();
      
      pdf.setFillColor(17, 19, 25);
      pdf.rect(0, 0, a4Width, a4Height, "F");
      
      pdf.addImage(dataUrl, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= a4Height;
    }

    pdf.save(filename);
  } catch (error: any) {
    console.error("Failed to generate PDF:", error);
    throw new Error(`Failed to generate PDF: ${error?.message || "Unknown error"}. Please try again.`);
  }
};
