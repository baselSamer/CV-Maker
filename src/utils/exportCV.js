import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportCV = async () => {
  const element = document.getElementById("cv-export");

  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();

  const imgProps = pdf.getImageProperties(imgData);

  const ratio = imgProps.height / imgProps.width;
  const imgHeight = pdfWidth * ratio;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

  const links = element.querySelectorAll("a");

  links.forEach((link) => {
    const rect = link.getBoundingClientRect();
    const parentRect = element.getBoundingClientRect();

    const x = ((rect.left - parentRect.left) / parentRect.width) * pdfWidth;

    const y = ((rect.top - parentRect.top) / parentRect.height) * imgHeight;

    const width = (rect.width / parentRect.width) * pdfWidth;

    const height = (rect.height / parentRect.height) * imgHeight;

    pdf.link(x, y, width, height, {
      url: link.href,
    });
  });

  pdf.save("cv.pdf");
};