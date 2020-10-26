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
// const { PDFService } = require('./createInvaiceDoctor');
// const data = require('./dataPdfDoctor');
// const PDFDocument = require('pdfkit');
// let doc = new PDFDocument({
// 	size: 'A4',
// 	margin: 30,
// });
// const createInvoice = new PDFService(doc, data);
// createInvoice.createInvoice('invoice.pdf');
// !+++++++++++++++++++++++++++++++++++++++++++++++++++++++
const { PDFService } = require('./createInvaiceMedical');
const data = require('./dataPdfMedical.json');
const PDFDocument = require('pdfkit');
let doc = new PDFDocument({
	size: 'A4',
	margin: { top: 50, left: 100, right: 50, bottom: 50 },
});
const createInvoice = new PDFService(doc, data);
createInvoice.createInvoice('invoice.pdf');
// {
// 	"text": "Cupidatat a consequat aliquip exercitation veniam labore magna elit. Enim duis ea non anim ex labore sit eu labore qui eu ea esse. Adipisicing mollit sunt sint ex voluptate. Laborum cupidatat do sunt officia sint deserunt amet anim. Ea ad do eu elit deserunt duis deserunt et sint consequat eu amet. Magna ex eiusmod qui adipisicing non irure ea Lorem magna laborum exercitation. Voluptate ipsum non enim tempor ea ex. Ex aliquip est est cillum pariatur consectetur laboris. Incididunt incididunt qui deserunt cupidatat proident sint. Ad non commodo pariatur ea quis ut nulla laboris nostrud. Ut duis nostrud tempor occaecat. Excepteur ad tempor incididunt est cillum. Adipisicing minim enim excepteur enim proident aliquip elit non velit cillum elit aute ex cupidatat. Dolore quis Lorem duis velit dolor aute qui culpa dolore sint consequat velit ea. Consequat mollit mollit culpa duis ullamco commodo in culpa id aliquip aliqua minim reprehenderit duis.Sunt enim consectetur incididunt consequat irure officia enim duis aliqua excepteur sit fugiat eu excepteur. Eu ut velit et sint proident incididunt aliqua. Adipisicing culpa laborum aliquip do quis tempor laborum ex. Consequat et tempor eiusmod dolor nisi consequat ullamco est duis anim aliqua magna aliqua enim. Cillum quis dolore veniam ut enim nostrud commodo ea id exercitation ut fugiat. Ex Lorem adipisicing mollit aliqua nostrud duis. Amet laborum aliqua ea irure do amet. Sint amet aute irure tempor irure ipsum non eu. Laborum do dolor nulla magna. Magna consequat quis est laboris sunt et aute sunt commodo esse sunt magna fugiat occaecat. Consequat ea officia eiusmod est. Laboris qui et commodo duis adipisicing deserunt ad eu dolor mollit dolore eiusmod. Eiusmod qui Lorem sunt non in amet dolor deserunt. Nisi ea excepteur laborum non reprehenderit reprehenderit nisi eu nulla ea consectetur aliqua. Consequat velit laboris esse qui et ullamco. Officia irure irure consequat deserunt. Mollit laborum dolor magna voluptate tempor irure consequat elit excepteur mollit laboris aute tempor nulla. Aliquip id adipisicing Lorem dolor nostrud voluptate. Anim nisi eiusmod dolore cupidatat sint laborum. Qui enim Lorem amet aute reprehenderit excepteur dolore excepteur nisi magna. Ex in ipsum magna ex eiusmod enim cupidatat id velit magna sit id elit esse. Adipisicing dolor mollit pariatur labore pariatur qui minim adipisicing irure.Lorem esse laboris id id. Minim labore reprehenderit irure exercitation. Culpa ex exercitation enim dolore proident consequat reprehenderit qui pariatur laborum exercitation in labore eiusmod. Ea magna incididunt sunt pariatur consectetur non cillum aute labore eiusmod duis veniam.Aliquip exercitation enim do ex irure in quis esse magna quis esse tempor mollit aute. Esse irure ad id et aute magna esse. Cillum nulla et et velit culpa minim eiusmod aliquip eu dolore cupidatat proident esse. Occaecat tempor cillum irure laborum et irure nostrud qui minim consequat incididunt sunt duis excepteur.",
// 	"createdAt": "2010-09-21T12:31:41.066Z"
// },
