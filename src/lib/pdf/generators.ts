import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceData {
  invoiceNumber: string;
  amount: number;
  taxAmount: number;
  grandTotal: number;
  customerName: string;
  customerPhone: string;
  bookingId: string;
}

interface VoucherData {
  id: string;
  bookingId: string;
  guestName: string;
  type: string;
  description: string;
}

export const generateInvoicePDF = (invoiceData: InvoiceData) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text("INVOICE", 105, 15, { align: "center" });

  doc.setFontSize(10);
  doc.text("TravelCRM Agency", 14, 25);
  doc.text("123 Travel Street, Adventure City", 14, 30);
  doc.text("GSTIN: 29ABCDE1234F1Z5", 14, 35);

  // Invoice Details
  doc.text(`Invoice No: ${invoiceData.invoiceNumber}`, 140, 25);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 30);
  doc.text(`Booking ID: ${invoiceData.bookingId}`, 140, 35);

  // Bill To
  doc.setFontSize(12);
  doc.text("Bill To:", 14, 50);
  doc.setFontSize(10);
  doc.text(invoiceData.customerName, 14, 55);
  doc.text(invoiceData.customerPhone, 14, 60);

  // Table
  autoTable(doc, {
    startY: 70,
    head: [["Description", "Amount"]],
    body: [
      ["Travel Package Fee", `INR ${invoiceData.amount}`],
      ["GST (5%)", `INR ${invoiceData.taxAmount}`],
      ["Total", `INR ${invoiceData.grandTotal}`],
    ],
  });

  // Footer
  // @ts-expect-error - lastAutoTable is added by jspdf-autotable
  const finalY = doc.lastAutoTable.finalY || 150;
  doc.text("Thank you for choosing TravelCRM!", 105, finalY + 20, { align: "center" });

  doc.save(`Invoice_${invoiceData.invoiceNumber}.pdf`);
};

export const generateVoucherPDF = (voucherData: VoucherData) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("SERVICE VOUCHER", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Voucher ID: ${voucherData.id}`, 14, 30);
  doc.text(`Booking ID: ${voucherData.bookingId}`, 14, 37);

  doc.text("Service Details", 14, 50);
  doc.line(14, 52, 200, 52);

  doc.setFontSize(10);
  doc.text(`Guest Name: ${voucherData.guestName}`, 14, 60);
  doc.text(`Service Type: ${voucherData.type}`, 14, 67);
  doc.text(`Details: ${voucherData.description}`, 14, 74);

  doc.save(`Voucher_${voucherData.id}.pdf`);
};
