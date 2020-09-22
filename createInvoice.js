const fs = require('fs');

class PDFService {
	constructor(doc, data) {
		this.doc = doc;
		this.data = data;
		this.font = 14;
		this.lineHeight = 1;
		this.maxPixelWith = 60;
		this.totalHeight = 754;
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
		this.doc.image('MENS.png', 50, marginTop + 5, { width: 190, height: 40 });

		this.doc
			.fontSize(this.font)
			.font('Helvetica-Bold')
			.text('Invoice #:', 337, marginTop + 10)
			.text(`Created:`, 370, marginTop + 30);

		this.doc
			.fontSize(this.font)
			.font('Times-Roman')
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
			.fontSize(this.font)
			.font('Helvetica-Bold')
			.text('Mens company:', 70, marginTop, { align: 'left' })
			.text('Street:', 70, marginTop + 20, { align: 'left' })
			.text('Street:', 70, marginTop + 40, { align: 'left' });
		this.doc
			.fontSize(this.font)
			.font('Times-Roman')
			.text('Patient', 50, marginTop, { align: 'right' })
			.text(`${firstName} ${lastName}`, 50, marginTop + 20, {
				align: 'right',
			})
			.text(email, 50, marginTop + 40, { align: 'right' })
			.moveDown();
	}

	generateInvoiceTable() {
		const invoiceTableTop = 300;
		const positions = [invoiceTableTop + 60];
		this.generateTableHeader(invoiceTableTop);
		this.generateHr(invoiceTableTop + 20);
		this.generateTable(positions);
	}

	generateTableHeader(y) {
		this.doc
			.fontSize(this.font + 2)
			.font('Helvetica-Bold')
			.text('Type', 70, y)
			.text('Name', 360, y, { width: 90, align: 'right' })
			.text('Price', 0, y, { align: 'right' });
	}

	generateTable(positions) {
		let i;
		for (i = 0; i < this.data.calculationData.length; i++) {
			const { type, name, sum } = this.data.calculationData[i];
			const rowHeight =
				this.font *
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
			this.generateHr(positions[i + 1] - 33);
		}
		this.generateTableFooter(positions[i]);
	}

	generateTableRow(y, Type, Name, Price) {
		const name = Name.replace(/[^\x20-\x7E]+/g, ''); // remove unicode
		this.doc
			.fontSize(this.font - 2)
			.font('Helvetica-Bold')
			.text(Type, 70, y - 20);
		this.doc
			.fontSize(this.font)
			.font('Times-Roman')
			.text(name, 160, y - 20, {
				width: 340,
				align: 'left',
				characterSpacing: this.lineHeight - 0.1,
				lineBreak: false,
				lineGap: this.lineHeight,
			})
			.text(`$${Price}`, 0, y - 20, { align: 'right' });
	}

	generateHr(y) {
		this.doc
			.strokeColor('#aaaaaa')
			.lineWidth(1)
			.moveTo(50, y)
			.lineTo(550, y)
			.stroke();
	}

	generateTableFooter(y) {
		this.doc
			.fontSize(this.font)
			.font('Helvetica-Bold')
			.text(`Total: $${this.data.total}`, 70, y);
	}
}
module.exports = {
	PDFService,
};
