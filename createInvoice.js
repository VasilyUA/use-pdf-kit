const fs = require("fs");
const PDFDocument = require("pdfkit");
const font = 14;
const lineHeight = 1;
const maxPixelWith = 60;
const totalHeight = 754;

function createInvoice(invoice, path) {
  let doc = new PDFDocument({
    size: "A4",
    margin: { top: 50, left: 100, right: 50, bottom: 50 },
  });

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
    .fontSize(font)
    .font("Times-Roman")
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
    .fontSize(font)
    .font("Times-Roman")
    .text("Mens company", 70, marginTop, { align: "left" })
    .text("Street", 70, marginTop + 20, { align: "left" })
    .text("Street", 70, marginTop + 40, { align: "left" })
    .text("Patient", 50, marginTop, { align: "right" })
    .text(`${firstName} ${lastName}`, 50, marginTop + 20, { align: "right" })
    .text(email, 50, marginTop + 40, { align: "right" })
    .moveDown();
}

function generateTable(doc, invoice, positions) {
  let i;
  for (i = 0; i < invoice.calculationData.length; i++) {
    const { type, name, sum } = invoice.calculationData[i];
    const rowHeight =
      font * 2 * lineHeight * Math.ceil(name.length / maxPixelWith);
    positions.push(rowHeight + positions[i]);
    if (positions[i] > totalHeight) {
      positions[i] = 100;
      positions[i + 1] = positions[i] + rowHeight;
      doc.addPage();
    }
    generateTableRow(doc, positions[i], type, name, sum);
    generateHr(doc, positions[i + 1] - 30);
  }
  generateTableFooter(doc, positions[i], invoice);
}

function generateInvoiceTable(doc, invoice) {
  const invoiceTableTop = 300;
  const positions = [invoiceTableTop + 60];
  generateTableHeader(doc, invoiceTableTop, "Type", "Name", "Price");
  generateHr(doc, invoiceTableTop + 20);
  generateTable(doc, invoice, positions);
}

function generateTableHeader(doc, y, Type, Name, Price) {
  doc
    .fontSize(font)
    .font("Times-Roman")
    .text(Type, 70, y)
    .text(Name, 360, y, { width: 90, align: "right" })
    .text(Price, 0, y, { align: "right" });
}

function generateTableRow(doc, y, Type, Name, Price) {
  const name = Name.replace(/[^\x20-\x7E]+/g, ""); // remove unicode
  doc
    .fontSize(font)
    .font("Times-Roman")
    .text(Type, 70, y - 20)
    .text(name, 160, y - 20, {
      width: 340,
      align: "left",
      characterSpacing: lineHeight - 0.1,
      lineBreak: false,
      lineGap: lineHeight,
    })
    .text(Price, 0, y - 20, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function generateTableFooter(doc, y, invoice) {
  doc.fontSize(font).text(`Total: $${invoice.total}`, 70, y);
}
module.exports = {
  createInvoice,
};
