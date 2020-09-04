const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);
  // generateInvoiceTable(doc, invoice);
  // generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, invoice) {
  doc
    .image("MENS.png", 50, 45, { width: 200, height: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice #:", 110, 50, { align: "right" })
    .fontSize(20)
    .text(invoice.invoiceId, 200, 80, { align: "right" })
    .fontSize(20)
    .text(`Created:`, 360, 110)
    .text("new Date", 443, 110)
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fontSize(20)
    .text("Mens company", 50, 250, { align: "left" })
    .text("Street", 50, 270, { align: "left" })
    .text("Street", 50, 290, { align: "left" })
    .text("Patient", 50, 250, { align: "right" })
    .text("Bob Taylor", 50, 270, { align: "right" })
    .text("pm+1@rivo.agency", 50, 290, { align: "right" })
    .moveDown();
}

function generateInvoiceTable(doc, invoice) {

  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  // for (let i = 0; i < invoice.items.length; i++) {
  //   const item = invoice.items[i];
  //   const position = invoiceTableTop + (i + 1) * 30;
  //   generateTableRow(
  //     doc,
  //     position,
  //     item.item,
  //     item.description,
  //     formatCurrency(item.amount / item.quantity),
  //     item.quantity,
  //     formatCurrency(item.amount)
  //   );

    generateHr(doc, position + 20);
  }

//   const subtotalPosition = invoiceTableTop + (i + 1) * 30;
//   generateTableRow(
//     doc,
//     subtotalPosition,
//     "",
//     "",
//     "Subtotal",
//     "",
//     formatCurrency(invoice.subtotal)
//   );

//   const paidToDatePosition = subtotalPosition + 20;
//   generateTableRow(
//     doc,
//     paidToDatePosition,
//     "",
//     "",
//     "Paid To Date",
//     "",
//     formatCurrency(invoice.paid)
//   );

//   const duePosition = paidToDatePosition + 25;
//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     duePosition,
//     "",
//     "",
//     "Balance Due",
//     "",
//     formatCurrency(invoice.subtotal - invoice.paid)
//   );
//   doc.font("Helvetica");
// }

// function generateFooter(doc) {
//   doc
//     .fontSize(10)
//     .text(
//       "Payment is due within 15 days. Thank you for your business.",
//       50,
//       780,
//       { align: "center", width: 500 }
//     );
// }

// function generateTableRow(
//   doc,
//   y,
//   item,
//   description,
//   unitCost,
//   quantity,
//   lineTotal
// ) {
//   doc
//     .fontSize(10)
//     .text(item, 50, y)
//     .text(description, 150, y)
//     .text(unitCost, 280, y, { width: 90, align: "right" })
//     .text(quantity, 370, y, { width: 90, align: "right" })
//     .text(lineTotal, 0, y, { align: "right" });
// }

// function generateHr(doc, y) {
//   doc
//     .strokeColor("#aaaaaa")
//     .lineWidth(1)
//     .moveTo(50, y)
//     .lineTo(550, y)
//     .stroke();
// }

// function formatCurrency(cents) {
//   return "$" + (cents / 100).toFixed(2);
// }

// function formatDate(date) {
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();

//   return year + "/" + month + "/" + day;
// }

module.exports = {
  createInvoice,
};
