const fs = require('fs');
class PDFService {
	constructor(doc, data) {
		this.doc = doc;
		this.data = data;
		this.fontSize = 12;
		this.lineHeight = 1;
		this.maxMarginLeft = 30;
		this.maxPixelWith = 30;
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
		const marginTop = 50;
		const date = new Date();
		const year = date.getFullYear();
		const getMonth = date.getMonth();

		const mouth = new Intl.DateTimeFormat('en-US', {
			month: 'long',
		}).format(getMonth);
		const getDate = date.getDate();
		this.doc.image('MENS.png', this.maxMarginLeft, marginTop + 5, {
			width: 240,
			height: 70,
		});

		this.doc
			.fontSize(this.fontSize + 1.5)
			.font('Helvetica-Bold')
			.text(`Created:`, 425, marginTop + 7);

		this.doc
			.fontSize(this.fontSize)
			.font(this.font)
			.text(`${year} ${mouth} ${getDate}`, 240, marginTop + 7, {
				align: 'right',
			});
		this.doc.moveDown();
	}

	generateCustomerInformation() {
		const { roles, firstName, lastName, email } = this.data.doctor.user;
		const marginTop = 230;
		this.doc
			.fontSize(this.fontSize + 1.5)
			.font('Helvetica-Bold')
			.text('Mens company:', this.maxMarginLeft, marginTop, {
				align: 'left',
			})
			.text('Street:', this.maxMarginLeft, marginTop + 20, {
				align: 'left',
			})
			.text('Street:', this.maxMarginLeft, marginTop + 40, {
				align: 'left',
			});
		this.doc
			.fontSize(this.fontSize)
			.font(this.font)
			.text(roles[0], 50, marginTop, { align: 'right' })
			.text(`${firstName} ${lastName}`, 50, marginTop + 20, {
				align: 'right',
			})
			.text(email, 50, marginTop + 40, { align: 'right' })
			.moveDown();
	}

	generateInvoiceTable() {
		const invoiceTableTop = 360;
		this.verticalLine = invoiceTableTop + 5;
		const positions = [invoiceTableTop + 20];
		this.generateTableHeader(invoiceTableTop - 20);
		this.generateHr(this.verticalLine);
		this.generateTable(positions);
	}

	generateTableHeader(y) {
		this.doc
			.fontSize(this.fontSize + 1.5)
			.font('Helvetica-Bold')
			.text('Product', this.maxMarginLeft, y, { align: 'left' })
			.text('Name', 163, y, { align: 'left' })
			.text('Variation', 310, y, { align: 'left' })
			.text('Weight', 365, y, { align: 'center' })
			.text('Status', 420, y - 20, { align: 'right' })
			.text('Reason', 420, y, { align: 'right' });
	}

	generateTable(positions) {
		const { subscriptionsData } = this.data;
		let i;

		for (i = 0; i < subscriptionsData.length; i++) {
			const {
				isApproved,
				plan: { productName, variationName, weight },
				patient: {
					user: { firstName, lastName },
				},
			} = subscriptionsData[i];

			const maxHeightProduct =
				this.fontSize *
				2 *
				this.lineHeight *
				Math.ceil(productName.length / this.maxPixelWith);
			const maxHeightName =
				this.fontSize *
				2 *
				this.lineHeight *
				Math.ceil(
					firstName.concat(lastName).length / this.maxPixelWith
				);

			const maxHeightVariation =
				this.fontSize *
				2 *
				this.lineHeight *
				Math.ceil(variationName.length / this.maxPixelWith);

			const rowHeight = Math.max(
				maxHeightProduct,
				maxHeightName,
				maxHeightVariation
			);
			positions.push(rowHeight + positions[i] + 10);
			if (positions[i] > this.totalHeight) {
				positions[i] = 30;
				positions[i + 1] = positions[i] + rowHeight;
				this.doc.addPage();
			}
			this.generateTableRow(positions[i], {
				productName,
				variationName,
				weight,
				firstName,
				lastName,
				isApproved,
			});
			this.generateHr(positions[i + 1] - 7);
		}
	}

	generateTableRow(y, data) {
		const {
			productName,
			variationName,
			weight,
			firstName,
			lastName,
			isApproved,
		} = data;
		const product = productName[0].toUpperCase() + productName.slice(1);
		this.doc
			.fontSize(this.fontSize)
			.font('Helvetica')
			.text(product, this.maxMarginLeft, y, {
				width: 100,
				align: 'justify',
				characterSpacing: this.lineHeight - 0.6,
				lineBreak: false,
				lineGap: this.lineHeight,
			});
		this.doc
			.fontSize(this.fontSize)
			.font('Helvetica')
			.text(`${firstName} ${lastName}`, 163, y, {
				width: 130,
				align: 'justify',
				characterSpacing: this.lineHeight - 0.6,
				lineBreak: false,
				lineGap: this.lineHeight,
			});
		this.doc
			.fontSize(this.fontSize)
			.font('Helvetica')
			.text(variationName, 307, y, {
				width: 130,
				align: 'justify',
				characterSpacing: this.lineHeight - 0.6,
				lineBreak: false,
				lineGap: this.lineHeight,
			});
		this.doc
			.fontSize(this.fontSize)
			.font('Helvetica')
			.text(weight, 375, y, { align: 'center' })
			.text(isApproved ? 'approved' : 'decline', 420, y, {
				align: 'right',
			});
	}

	generateHr(y) {
		this.doc
			.strokeColor('#000000')
			.lineWidth(1)
			.moveTo(30, y)
			.lineTo(569, y)
			.stroke();
	}
}

module.exports = { PDFService };
