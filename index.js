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
const PDFService = require('./createInvaiceMedical');
const data = require('./dataPdfMedical.json');
const PDFDocument = require('pdfkit');
let doc = new PDFDocument({	size: 'A4',	margin: { top: 50, left: 100, right: 50, bottom: 50 },});
const createInvoice = new PDFService(doc, data);
createInvoice.createInvoice('invoice.pdf');

// ,
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d64",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d65",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a198",
//     "question":"Have you taken a blood pressure reading at a medical facility within the last 6 months?"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d66",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d67",
//         "text":"I can never get an erection",
//         "additionalField":"",
//         "answerId":"5e3552a08f6122219022a19c"
//     }
// ],
//     "questionId":"5e3552a08f6122219022a19b",
//     "question":"Do you have any problems getting or maintaining an erection during sex or masturbation?111111"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d68",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d69",
//         "text":"180/110",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a19a",
//     "question":"What was the result of your latest blood pressure reading?"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d6a",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d6b",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1e0",
//     "question":"Do you currently take any medicines, herbals, or supplements?"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d6c",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d6d",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1b2",
//     "question":"Do you take, or have you ever taken, prescription erectile dysfunction (ED) drugs or supplements? "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d6e",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d6f",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1b4",
//     "question":"Have you had any sexual problems or any changes in sexual desire? "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d70",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d71",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1b5",
//     "question":"Are you anxious, depressed or under stress? Any relationship or sexual problems with your partner? "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d72",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d73",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1b7",
//     "question":"Do you have any medical conditions?"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d74",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d75",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1b9",
//     "question":"Have you ever had any surgeries or hospitalizations? "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d76",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d77",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1ba",
//     "question":"Do you take nitroglycerine, any nitrate medication, any blood pressure medication, medication for prostate enlargement, or any medication for HIV/AIDS? "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d78",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d79",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1bc",
//     "question":"Do you currently take any prescription medications for a mental health condition or do you get psychological counseling?  "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d7a",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d7b",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1c0",
//     "question":"Do you smoke or use other tobacco products? "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d7c",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d7d",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1c2",
//     "question":"Do you consume alcohol regularly or more than 1-2 drinks on an occasional basis? "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d7e",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d7f",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1be",
//     "question":"Do you have any allergies or medication reactions?"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d80",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d81",
//         "text":"2",
//         "additionalField":"",
//         "answerId":"5f43915c11fcc472c6f891b2"
//     }
// ],
//     "questionId":"5f43915c11fcc472c6f891b0",
//     "question":"Do?"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d82",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d83",
//         "text":"12",
//         "additionalField":"",
//         "answerId":"5f43942f11fcc472c6f891b4"
//     }
// ],
//     "questionId":"5f43942f11fcc472c6f891b3",
//     "question":"Qqqqq"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d84",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d85",
//         "text":"12",
//         "additionalField":"",
//         "answerId":"5f43949511fcc472c6f891b7"
//     },
//     {
//         "_id":"5f97d473e8c4a65c745f4d85",
//         "text":"12",
//         "additionalField":"",
//         "answerId":"5f43949511fcc472c6f891b7"
//     }
// ],
//     "questionId":"5f43949511fcc472c6f891b6",
//     "question":"qqqqqqqqq"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d86",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d87",
//         "text":"1",
//         "additionalField":"",
//         "answerId":"5f96ee8de8c4a65c745f497a"
//     }
// ],
//     "questionId":"5f439b7411fcc472c6f891b9",
//     "question":"1qqqqqqqqqqq"
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d88",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d89",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1c6",
//     "question":"Do you experience shortness of breath or chest pains during or after mild physical activity? "
// },
// {
//     "type":"boolean",
//     "flagged":false,
//     "flaggedReason":"",
//     "_id":"5f97d473e8c4a65c745f4d8a",
//     "answers":[
//     {
//         "_id":"5f97d473e8c4a65c745f4d8b",
//         "text":"false",
//         "additionalField":"",
//         "answerId":""
//     }
// ],
//     "questionId":"5e3552a08f6122219022a1ce",
//     "question":"Do you have any other comments or questions for the doctor?"
// }