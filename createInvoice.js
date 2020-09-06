const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, invoice) {
  const marginTop = 55;
  const date = new Date();
  const year = date.getFullYear();
  const getMonth = date.getMonth();
  const mouth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    getMonth
  );
  const getDate = date.getDate();

  doc
    .image("MENS.png", 50, marginTop, { width: 200, height: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice #:", 110, marginTop, { align: "right" })
    .text(invoice.invoiceId, 200, marginTop + 24, { align: "right" })
    .text(`Created: ${year} ${mouth} ${getDate}`, 240, marginTop + 50, {
      align: "right",
    })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  const marginTop = 180;
  const { firstName, lastName, email } = invoice.patient.user;
  doc
    .fontSize(20)
    .text("Mens company", 50, marginTop, { align: "left" })
    .text("Street", 50, marginTop + 20, { align: "left" })
    .text("Street", 50, marginTop + 40, { align: "left" })
    .text("Patient", 50, marginTop, { align: "right" })
    .text(`${firstName} ${lastName}`, 50, marginTop + 20, { align: "right" })
    .text(email, 50, marginTop + 40, { align: "right" })
    .moveDown();
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 300;

  doc.font("Helvetica-Bold");
  generateTableHeader(doc, invoiceTableTop, "Tupe", "Name", "price");
  generateHr(doc, invoiceTableTop + 35);
  doc.font("Helvetica");

  for (i = 0; i < invoice.calculationData.length; i++) {
    const calculationData = invoice.calculationData[i];
    const { type, name, sum } = calculationData;
    const position = invoiceTableTop + (i + 1) * 75;
    generateTableRow(doc, position, type, name, sum);
    generateHr(doc, position + 45);
  }
  const totalPosition = invoiceTableTop + (i + 1) * 95;

  generateFooter(doc, totalPosition, invoice);
}

function generateTableHeader(doc, y, item, unitCost, lineTotal) {
  doc
    .fontSize(25)
    .text(item, 60, y)
    .text(unitCost, 320, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateTableRow(doc, y, item, unitCost, lineTotal) {
  doc
    .fontSize(17)
    .text(item, 50, y - 20)
    .text(unitCost, 80, y - 20, { width: 350, align: "right" })
    .text(lineTotal, 0, y - 20, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function generateFooter(doc, totalPosition, invoice) {
  doc.fontSize(30).text(`Total: $${invoice.total}`, 70, totalPosition);
}
module.exports = {
  createInvoice,
};
