const { log } = require('console');
const fs = require('fs');

class PDFService {
	constructor(doc, data) {
		this.doc = doc;
		this.data = data;
		this.fontSize = 14;
		this.lineHeight = 1;
		this.maxPixelWith = 50;
		this.totalHeight = 700;
		this.font = 'fonts/Helvetica.ttf';
	}

	createInvoice(path) {
		this.generateHeader();
		this.generateCustomerInformation();
		this.generateInvoiceTable();

		this.doc.end();
		this.doc.pipe(fs.createWriteStream(path));
	}

	generateHeader() {
		const marginTop = 55;
		const date = new Date();
		const year = date.getFullYear();
		const getMonth = date.getMonth();
		const mouth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
			getMonth
		);
		const getDate = date.getDate();
		const { invoiceId } = this.data;
		this.doc.image('MENS.png', 50, marginTop + 5, { width: 240, height: 70 });

		this.doc
			.fontSize(this.fontSize)
			.font('Helvetica-Bold')
			.text('Invoice #:', 325, marginTop + 10)
			.text(`Created:`, 359, marginTop + 30);

		this.doc
			.fontSize(this.fontSize)
			.font(this.font)
			.text(invoiceId, 200, marginTop + 10, { align: 'right' })
			.text(`${year} ${mouth} ${getDate}`, 240, marginTop + 30, {
				align: 'right',
			});
		this.doc.moveDown();
	}

	generateCustomerInformation() {
		const marginTop = 170;
		const { firstName, lastName, email } = this.data.patient.user;
		this.doc
			.fontSize(this.fontSize)
			.font('Helvetica-Bold')
			.text('Mens company:', 70, marginTop, { align: 'left' })
			.text('Street:', 70, marginTop + 20, { align: 'left' })
			.text('Street:', 70, marginTop + 40, { align: 'left' });
		this.doc
			.fontSize(this.fontSize)
			.font(this.font)
			.text('Patient', 50, marginTop, { align: 'right' })
			.text(`${firstName} ${lastName}`, 50, marginTop + 20, {
				align: 'right',
			})
			.text(email, 50, marginTop + 40, { align: 'right' })
			.moveDown();
	}

	generateInvoiceTable() {
		const invoiceTableTop = 300;
		this.verticalLine = invoiceTableTop + 20;
		const positions = [invoiceTableTop + 60];
		this.generateTableHeader(invoiceTableTop);
		this.generateHr(this.verticalLine);
		this.generateTable(positions);
	}

	generateTableHeader(y) {
		this.doc
			.fontSize(this.fontSize + 4)
			.font('Helvetica-Bold')
			.text('Type', 70, y)
			.text('Name', 250, y, { width: 90, align: 'center' })
			.text('Price', 479, y, { align: 'right' });
	}

	generateTable(positions) {
		let i;
		for (i = 0; i < this.data.calculationData.length; i++) {
			const { type, name, sum } = this.data.calculationData[i];
			const rowHeight =
				this.fontSize *
				2 *
				this.lineHeight *
				Math.ceil(name.length / this.maxPixelWith);
			positions.push(rowHeight + positions[i]);
			if (positions[i] > this.totalHeight) {
				positions[i] = 100;
				positions[i + 1] = positions[i] + rowHeight;
				this.doc.addPage();
			}
			this.generateTableRow(positions[i], type, name, sum);
			this.generateHr(positions[i + 1] - 30);
		}
		this.generateTableFooter(positions[i]);
	}

	generateTableRow(y, Type, Name, Price) {
		const name = Name.replace(/[^\x20-\x7E]+/g, '');
		const type = Type[0].toUpperCase() + Type.slice(1);
		const prise = type === 'Coupon' ? `-$${Price}` : `$${Price}`;
		const { doc } = this;
		doc
			.fontSize(this.fontSize)
			.font('Helvetica-Bold')
			.text(type, 50, y - 20);
		doc
			.fontSize(this.fontSize)
			.font(this.font)
			.text(name, 150, y - 20, {
				width: 315,
				align: 'justify',
				characterSpacing: this.lineHeight - 0.6,
				lineBreak: false,
				lineGap: this.lineHeight,
			});
		doc
			.fontSize(this.fontSize + 2)
			.font('Helvetica-Bold')
			.text(prise, 0, y - 20, { align: 'right' });
	}

	generateHr(y) {
		this.doc
			.strokeColor('#000000')
			.lineWidth(1)
			.moveTo(50, y)
			.lineTo(550, y)
			.stroke();
		this.doc
			.strokeColor('#000000')
			.lineWidth(1)
			.moveTo(140, y)
			.lineTo(140, 320)
			.stroke();
		this.doc
			.strokeColor('#000000')
			.lineWidth(1)
			.moveTo(470, y)
			.lineTo(470, 320)
			.stroke();
	}

	generateTableFooter(y) {
		this.doc
			.fontSize(this.fontSize + 4)
			.font('Helvetica-Bold')
			.text(`Total: $${this.data.total}`, 70, y);
	}
}
module.exports = {
	PDFService,
};
