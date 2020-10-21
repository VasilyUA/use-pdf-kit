const fs = require('fs');

class PDFService {
	constructor(doc, data) {
		this.doc = doc;
		this.data = data;
		this.fontSize = 11;
		this.lineHeight = 1;
		this.maxPixelWith = 50;
		this.totalHeight = 700;
		this.font = 'Helvetica';
	}

	createInvoice(path) {
		this.generateHeader();
		this.generateCustomerInformation();

		this.doc.end();
		this.doc.pipe(fs.createWriteStream(path));
	}

	generateHeader() {
		const marginTop = 15;
		const date = new Date();
		const year = date.getFullYear();
		const getMonth = date.getMonth();
		const mouth = new Intl.DateTimeFormat('en-US', {
			month: 'long',
		}).format(getMonth);
		const getDate = date.getDate();
		const { invoiceId } = this.data;
		this.doc.image('imeges/MENS.png', 50, marginTop, {
			width: 60,
			height: 15,
		});

		this.doc
			.fontSize(this.fontSize)
			.font('Helvetica-Bold')
			.text(`Creatad:`, 390, marginTop + 5);

		this.doc
			.fontSize(this.fontSize)
			.font(this.font)
			.text(invoiceId, 200, marginTop + 10, { align: 'right' })
			.text(`${year} ${mouth} ${getDate}`, 240, marginTop + 5, {
				align: 'right',
			});
		this.doc.moveDown();
	}

	generateCustomerInformation() {
		const marginTop = 50;
		const x = 148;
		const maxHeight = 65;
		const customerY = 15;
		const {
			user: { email, firstName, lastName, phone },
			basic: { gender, birthDate },
			prescribeSystem: { doseSpotId },
		} = this.data.patient;
		this.doc
			.image('imeges/face.jpg', 50, marginTop, {
				width: x - 60,
				height: maxHeight,
				align: 'center',
				valign: 'center',
			})
			.rect(50, marginTop, x - 60, maxHeight)
			.stroke();

		this.doc
			.image('imeges/selfi.jpeg', 50, marginTop + (5 + maxHeight), {
				width: x - 60,
				height: maxHeight,
				align: 'center',
				valign: 'center',
			})
			.rect(50, marginTop + (5 + maxHeight), x - 60, maxHeight)
			.stroke();

		this.doc
			.fontSize(this.fontSize)
			.font('Helvetica-Bold')
			.text('Information:', x, marginTop)
			.text('Patient', 50, marginTop, { align: 'right' })
			.strokeColor('#000000')
			.lineWidth(1)
			.moveTo(145, marginTop + 15)
			.lineTo(525, marginTop + 15)
			.stroke();

		this.doc
			.fontSize(this.fontSize - 2)
			.font('Helvetica-Bold')
			.text('First name:', x, marginTop + (15 + customerY), {
				align: 'left',
			})

			.text('Last name:', x, marginTop + (30 + customerY), {
				align: 'left',
			})
			.text('Gender:', x, marginTop + (45 + customerY), {
				align: 'left',
			})
			.text('Birth date:', x, marginTop + (60 + customerY), {
				align: 'left',
			})
			.text('Phone:', x, marginTop + (75 + customerY), {
				align: 'left',
			})
			.text('Email:', x, marginTop + (90 + customerY), {
				align: 'left',
			})
			.text('Dose spot Id:', x, marginTop + (105 + customerY), {
				align: 'left',
			});

		this.doc
			.fontSize(this.fontSize - 2)
			.font(this.font)

			.text(firstName, 50, marginTop + (15 + customerY), {
				align: 'right',
			})
			.text(lastName, 50, marginTop + (30 + customerY), {
				align: 'right',
			})
			.text(gender, 50, marginTop + (45 + customerY), {
				align: 'right',
			})
			.text(birthDate, 50, marginTop + (60 + customerY), {
				align: 'right',
			})
			.text(phone, 50, marginTop + (75 + customerY), {
				align: 'right',
			})
			.text(email, 50, marginTop + (90 + customerY), {
				align: 'right',
			})
			.text(doseSpotId, 50, marginTop + (105 + customerY), {
				align: 'right',
			})
			.moveDown();
	}
}
module.exports = {
	PDFService,
};
