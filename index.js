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


       // {
       //    "type": "boolean",
       //    "flagged": true,
       //    "flaggedReason": "Answer is missing",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344cf",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344ce",
       //    "questionId": "5e3552a08f6122219022a198",
       //    "question": "Have you taken a blood pressure reading at a medical facility within the last 6 months?"
       //  },
       //  {
       //    "type": "radio",
       //    "flagged": true,
       //    "flaggedReason": "I never have problems getting or maintaining an erection",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344d1",
       //        "text": "I never have problems getting or maintaining an erection",
       //        "additionalField": "",
       //        "answerId": "5e3552a08f6122219022a1a0"
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344d0",
       //    "questionId": "5e3552a08f6122219022a19b",
       //    "question": "Do you have any problems getting or maintaining an erection during sex or masturbation?111111"
       //  },
       //  {
       //    "type": "pressureInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344d3",
       //        "text": "120/80",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344d2",
       //    "questionId": "5e3552a08f6122219022a19a",
       //    "question": "What was the result of your latest blood pressure reading?"
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344d5",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344d4",
       //    "questionId": "5e3552a08f6122219022a1e0",
       //    "question": "Do you currently take any medicines, herbals, or supplements?"
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344d7",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344d6",
       //    "questionId": "5e3552a08f6122219022a1b2",
       //    "question": "Do you take, or have you ever taken, prescription erectile dysfunction (ED) drugs or supplements? "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344d9",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344d8",
       //    "questionId": "5e3552a08f6122219022a1b4",
       //    "question": "Have you had any sexual problems or any changes in sexual desire? "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344db",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344da",
       //    "questionId": "5e3552a08f6122219022a1b5",
       //    "question": "Are you anxious, depressed or under stress? Any relationship or sexual problems with your partner? "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344dd",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344dc",
       //    "questionId": "5e3552a08f6122219022a1b7",
       //    "question": "Do you have any medical conditions?"
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344df",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344de",
       //    "questionId": "5e3552a08f6122219022a1b9",
       //    "question": "Have you ever had any surgeries or hospitalizations? "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344e1",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344e0",
       //    "questionId": "5e3552a08f6122219022a1ba",
       //    "question": "Do you take nitroglycerine, any nitrate medication, any blood pressure medication, medication for prostate enlargement, or any medication for HIV/AIDS? "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344e3",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344e2",
       //    "questionId": "5e3552a08f6122219022a1bc",
       //    "question": "Do you currently take any prescription medications for a mental health condition or do you get psychological counseling?  "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344e5",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344e4",
       //    "questionId": "5e3552a08f6122219022a1c0",
       //    "question": "Do you smoke or use other tobacco products? "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344e7",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344e6",
       //    "questionId": "5e3552a08f6122219022a1c2",
       //    "question": "Do you consume alcohol regularly or more than 1-2 drinks on an occasional basis? "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344e9",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344e8",
       //    "questionId": "5e3552a08f6122219022a1be",
       //    "question": "Do you have any allergies or medication reactions?"
       //  },
       //  {
       //    "type": "check",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344eb",
       //        "text": "2",
       //        "additionalField": "",
       //        "answerId": "5f43915c11fcc472c6f891b2"
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344ea",
       //    "questionId": "5f43915c11fcc472c6f891b0",
       //    "question": "Do?"
       //  },
       //  {
       //    "type": "check",
       //    "flagged": true,
       //    "flaggedReason": "23; ",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344ed",
       //        "text": "23",
       //        "additionalField": "",
       //        "answerId": "5f43942f11fcc472c6f891b5"
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344ec",
       //    "questionId": "5f43942f11fcc472c6f891b3",
       //    "question": "Qqqqq"
       //  },
       //  {
       //    "type": "check",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344ef",
       //        "text": "23",
       //        "additionalField": "",
       //        "answerId": "5f43949511fcc472c6f891b8"
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344ee",
       //    "questionId": "5f43949511fcc472c6f891b6",
       //    "question": "qqqqqqqqq"
       //  },
       //  {
       //    "type": "check",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344f1",
       //        "additionalField": "",
       //        "answerId": "5f439b7f11fcc472c6f891bd"
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344f0",
       //    "questionId": "5f439b7411fcc472c6f891b9",
       //    "question": "1qqqqqqqqqqq"
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344f3",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344f2",
       //    "questionId": "5e3552a08f6122219022a1c6",
       //    "question": "Do you experience shortness of breath or chest pains during or after mild physical activity? "
       //  },
       //  {
       //    "type": "booleanTrueInput",
       //    "flagged": false,
       //    "flaggedReason": "",
       //    "answers": [
       //      {
       //        "_id": "5f9174f3759ec910bc9344f5",
       //        "text": "false",
       //        "additionalField": "",
       //        "answerId": ""
       //      }
       //    ],
       //    "_id": "5f9174f3759ec910bc9344f4",
       //    "questionId": "5e3552a08f6122219022a1ce",
       //    "question": "Do you have any other comments or questions for the doctor?"
       //  }