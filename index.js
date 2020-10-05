// const { PDFService } = require('./createInvoicePatient.js');
// const data = require('./dataPdfPatient');
// const PDFDocument = require('pdfkit');
// let doc = new PDFDocument({
// 	size: 'A4',
// 	margin: { top: 50, left: 100, right: 50, bottom: 50 },
// });
// const createInvoice = new PDFService(doc, data);
// createInvoice.createInvoice('invoice.pdf');
// !+++++++++++++++++++++++++++++++++++++++++++++++++++++++
const { PDFService } = require('./createInvaiceDoctor');
const data = require('./dataPdfDoctor');
const PDFDocument = require('pdfkit');
let doc = new PDFDocument({
	size: 'A4',
	margin: 30,
});
const createInvoice = new PDFService(doc, data);
createInvoice.createInvoice('invoice.pdf');
