const fs = require('fs');

class PDFService {
    constructor(doc, data) {
        this.doc = doc;
        this.data = data;
        this.fontSize = 14;
        this.lineHeight = 0.9;
        this.maxPixelWith = 65;
        this.totalHeight = 700;
        this.marginTop = 15;
        this.font = 'Helvetica';
    }

    createInvoice(path) {
        this.generateHeader();
        this.generateNotes();
        this.generateSub();

        this.doc.end();
        this.doc.pipe(fs.createWriteStream(path));
    }

    generateHeader() {
        const date = new Date();
        const year = date.getFullYear();
        const mouth = new Intl.DateTimeFormat('en-US', {
            month: 'long',
        }).format(date);
        const getDate = date.getDate();
        const {invoiceId} = this.data;
        this.doc.image('imeges/MENS.png', 50, this.marginTop, {
            width: 150,
            height: 30,
        });

        this.doc
            .fontSize(this.fontSize)
            .font('Helvetica-Bold')
            .text(`Created:`, 355, this.marginTop + 5);

        this.doc
            .fontSize(this.fontSize)
            .font(this.font)
            .text(invoiceId, 200, this.marginTop + 10, {align: 'right'})
            .text(`${year} ${mouth} ${getDate}`, 240, this.marginTop + 5, {
                align: 'right',
            });
        // ! Information
        this.marginTop = 60;
        const x = 170;
        const maxHeight = 120;
        const customerY = 13;
        const {
            user: {email, firstName, lastName, phone},
            basic: {gender, birthDate},
            prescribeSystem: {doseSpotId},
        } = this.data.patient;

        this.doc
            .image('imeges/face.jpg', 50, this.marginTop + 10, {
                width: x - 60,
                height: maxHeight,
                align: 'center',
                valign: 'center',
            })
            .rect(50, this.marginTop + 10, x - 60, maxHeight)
            .stroke();

        this.doc
            .fontSize(this.fontSize + 2)
            .font('Helvetica-Bold')
            .text('Information:', x, this.marginTop + 4)
            .text('Patient', 50, this.marginTop + 4, {align: 'right'})
            .strokeColor('#000000')
            .lineWidth(1)
            .moveTo(x, this.marginTop + 20)
            .lineTo(525, this.marginTop + 20)
            .stroke();

        this.doc
            .fontSize(this.fontSize - 2)
            .font('Helvetica-Bold')
            .text('First name:', x, this.marginTop + (15 + customerY), {
                align: 'left',
            })

            .text('Last name:', x, this.marginTop + (30 + customerY), {
                align: 'left',
            })
            .text('Gender:', x, this.marginTop + (45 + customerY), {
                align: 'left',
            })
            .text('Birth date:', x, this.marginTop + (60 + customerY), {
                align: 'left',
            })
            .text('Phone:', x, this.marginTop + (75 + customerY), {
                align: 'left',
            })
            .text('Email:', x, this.marginTop + (90 + customerY), {
                align: 'left',
            })
            .text('Dose spot ID:', x, this.marginTop + (105 + customerY), {
                align: 'left',
            });

        this.doc
            .fontSize(this.fontSize - 2)
            .font(this.font)

            .text(firstName, 50, this.marginTop + (15 + customerY), {
                align: 'right',
            })
            .text(lastName, 50, this.marginTop + (30 + customerY), {
                align: 'right',
            })
            .text(gender, 50, this.marginTop + (45 + customerY), {
                align: 'right',
            })
            .text(birthDate, 50, this.marginTop + (60 + customerY), {
                align: 'right',
            })
            .text(phone, 50, this.marginTop + (75 + customerY), {
                align: 'right',
            })
            .text(email, 50, this.marginTop + (90 + customerY), {
                align: 'right',
            })
            .text(doseSpotId, 50, this.marginTop + (105 + customerY), {
                align: 'right',
            })
            .moveDown();

        this.doc
            .strokeColor('#000000')
            .lineWidth(1)
            .moveTo(50, this.marginTop + (128 + customerY))
            .lineTo(540, this.marginTop + (128 + customerY))
            .stroke();

        // let i;
        // for (const property in object) {
        //     console.log(`${property}: ${object[property]}`);
        // }
        this.doc
            .image('imeges/med.jpg', 50, this.marginTop + 150, {
                width: 490,
                height: 200,
                align: 'center',
                valign: 'center',
            })
            .rect(
                50,
                this.marginTop + 150,
                490,
                (this.marginTop = this.marginTop + 150)
            )
            .stroke();
    }

    generateNotes() {
        this.marginTop = 25;
        this.verticalLine = this.marginTop + 19;
        const positions = [this.marginTop + 30];
        this.doc.addPage();
        this.doc
            .fontSize(this.fontSize + 7)
            .font('Helvetica-Bold')
            .text(`Notes`, 70, this.marginTop, {align: 'center'});
        this.generateHr(this.verticalLine + 5);

        let i;
        for (i = 0; i < this.data.notes.length; i++) {
            const {text, createdAt} = this.data.notes[i];
            const date = new Date(createdAt);
            const year = date.getFullYear();
            const mouth = new Intl.DateTimeFormat('en-US', {
                month: 'long',
            }).format(date);
            const getDate = date.getDate();

            const rowHeight =
                (this.fontSize - 2) *
                2 *
                this.lineHeight *
                Math.ceil(text.length / this.maxPixelWith + 1);
            positions.push(Math.round(rowHeight) + positions[i]);

            if (positions[i] > this.totalHeight) {
                this.doc.addPage();
                positions[i] = 20;
                positions[i + 1] = positions[i] + rowHeight;
            }
            this.doc
                .fontSize(this.fontSize - 3)
                .font("Helvetica-Bold").text(`${i + 1}) ${'Note:'.slice(0, 'Note:'.length)}`, 65, positions[i] )
                .font(this.font)
                .text(`${text.slice(0, text.length)} \n\n`, 110, positions[i], {
                    width: 395,
                    align: 'justify',
                    characterSpacing: this.lineHeight - 0.1,
                    lineBreak: false,
                    lineGap: this.lineHeight,
                }).font("Helvetica-Bold").text(
                `Create: ${year} ${mouth} ${getDate}`, 365);
            this.doc.moveDown();

            this.generateHr(positions[i + 1] - 10);
        }
    }

    generateSub() {
        let i;
        const x = 55;
        this.marginTop = 75;
        this.verticalLine = this.marginTop + 19;

        for (i = 0; i < this.data.subscriptions.length; i++) {
            this.marginTop = 75;
            this.doc.addPage();
            const {
                productType,
                isApproved,
                questionnaire,
                status,
                plan: {
                    productName,
                    variationName,
                    frequencyOfDelivery,
                    frequencyOfReception,
                    firstFrequencyOfReception,
                    substance,
                    variationDescription,
                },
                registrationDoneDate,
                approvedDate,
                expiredAt,
                nextPeriodStart,
            } = this.data.subscriptions[i];
            this.doc
                .fontSize(this.fontSize + 7)
                .font('Helvetica-Bold')
                .text(`Subscriptions`, 70, this.marginTop - 50, {
                    align: 'center',
                });
            this.generateHr(this.verticalLine - 50);

            this.doc
                .fontSize(this.fontSize + 2)
                .font('Helvetica-Bold')
                .text('Plan', 70, this.marginTop - 20, {
                    align: 'left',
                })
                .strokeColor('#000000')
                .lineWidth(1)
                .moveTo(50, 70)
                .lineTo(125, 70)
                .stroke();
            // Plan name
            this.doc
                .fontSize(this.fontSize - 2)
                .font(this.font)
                .text('Product name:', x, this.marginTop + 5, {
                    align: 'left',
                    width: 100,
                })
                .text('Variation name', x, this.marginTop + 20, {
                    align: 'left',
                })
                .text('Frequency of delivery:', x, this.marginTop + 35, {
                    align: 'left',
                })
                .text('Frequency of reception:', x, this.marginTop + 50, {
                    align: 'left',
                })
                .text(
                    'First frequency of reception:',
                    x,
                    this.marginTop + 65,
                    {
                        align: 'left',
                    }
                )
                .text('Substance:', x, this.marginTop + 80, {
                    align: 'left',
                })
                .text('Variation description:', x, this.marginTop + 95, {
                    align: 'left',
                });

            // Plan value
            this.doc
                .fontSize(this.fontSize - 2)
                .font(this.font)
                .text(productName, x + 170, this.marginTop + 5, {
                    align: 'right',
                })
                .text(variationName, x, this.marginTop + 20, {
                    align: 'right',
                })
                .text(frequencyOfDelivery, x, this.marginTop + 35, {
                    align: 'right',
                })
                .text(frequencyOfReception, x, this.marginTop + 50, {
                    align: 'right',
                })
                .text(firstFrequencyOfReception, x, this.marginTop + 65, {
                    align: 'right',
                })
                .text(substance, x, this.marginTop + 80, {
                    align: 'right',
                })
                .text(variationDescription, x, this.marginTop + 95, {
                    align: 'right',
                });
            this.generateHr(this.verticalLine + 100); //!Line
            this.marginTop = 185;
            this.doc
                .fontSize(this.fontSize - 2)
                .font(this.font)
                .text('Status:', x, this.marginTop + 20, {
                    align: 'left',
                })
                .text('Is approved:', x, this.marginTop + 35, {
                    align: 'left',
                })
                .text('Product type:', x, this.marginTop + 50, {
                    align: 'left',
                });
            let statuses = status[0].toUpperCase() + status.slice(1);
            // Plan value
            this.doc
                .fontSize(this.fontSize - 2)
                .font(this.font)
                .text(statuses, x, this.marginTop + 20, {
                    align: 'right',
                })
                .text(isApproved ? "Approved" : "Declined", x, this.marginTop + 35, {
                    align: 'right',
                })
                .text(productType, x, this.marginTop + 50, {
                    align: 'right',
                });
            this.generateHr(this.verticalLine + 160); //!Line

            this.doc
                .fontSize(this.fontSize + 2)
                .font('Helvetica-Bold')
                .text('Questionnaire', 70, this.marginTop + 80, {
                    align: 'left',
                })
                .strokeColor('#000000')
                .lineWidth(1)
                .moveTo(55, this.marginTop + 95)
                .lineTo(190, this.marginTop + 95)
                .stroke();

            const Height = this.generateQuestionnaire(questionnaire);
            this.marginTop = Height + 30;
            this.doc
                .fontSize(this.fontSize - 2)
                .font(this.font)
                .text(
                    `Registration done date: ${this.getDate(
                        registrationDoneDate
                    )}`,
                    x + 170,
                    this.marginTop + 5,
                    {
                        align: 'right',
                    }
                )
                .text(
                    `Approved date: ${this.getDate(approvedDate)}`,
                    x,
                    this.marginTop + 20,
                    {
                        align: 'right',
                    }
                )
                .text(
                    `ExpiredAt ${this.getDate(expiredAt)}`,
                    x,
                    this.marginTop + 35,
                    {
                        align: 'right',
                    }
                )
                .text(
                    `Next period start: ${this.getDate(nextPeriodStart)}`,
                    x,
                    this.marginTop + 50,
                    {
                        align: 'right',
                    }
                );
        }
    }

    generateQuestionnaire(questionnaire) {
        this.marginTop = 245;
        const positions = [this.marginTop + 50];
        let index;
        let Height;
        for (index = 0; index < questionnaire.length; index++) {
            const {question, answers} = questionnaire[
                index
                ];
            const answer = answers[0].text ? answers[0].text : 'Not found';
            const rowHeight = Math.max(
                this.generateHeight(question),
                this.generateHeight(answer)
            );
            positions.push(positions[index] + (rowHeight * 1.2));
            if (positions[index] > this.totalHeight) {
                positions[index] = 50;
                positions[index + 1] = positions[index] + rowHeight + 5;
                this.doc.addPage();
            }
            this.doc
                .fontSize(this.fontSize - 2).font(this.font).text(`${index + 1})`, 50,  positions[index])
                .font("Helvetica-Bold").text(`${'Question:'.slice(0, 'Question:'.length)}`,
                75,
                positions[index])
                .font(this.font)
                .text(`${question}`,
                    140,
                    positions[index],{
                align: 'justify',
                    width: 365,
            });
            const maxHeight = positions[index] + (rowHeight / 1.7);
            this.doc.font("Helvetica-Bold").text(`${'Answer:'.slice(0, 'Answer:'.length)}`, 75, rowHeight > 28 ? maxHeight : positions[index] + 15 ).font(this.font)
                .text(`${answer === "false" ? "No" : answer}`, 140, rowHeight > 28 ? maxHeight : positions[index] + 15 , {
                    align: 'justify',
                    width: 365,
                });

            this.generateHr(positions[index + 1] - 4); //!Line
            Height = positions[index + 1] - 4;
        }

        return Height;
    }

    generateHeight(params) {
        return this.fontSize * 2 * this.lineHeight * Math.ceil(params.length / this.maxPixelWith);
    }

    getDate(params) {
        const date = new Date(params);
        const year = date.getFullYear();
        const mouth = new Intl.DateTimeFormat('en-US', {
            month: 'long',
        }).format(date);
        const getDate = date.getDate();
        return `${year} ${mouth} ${getDate}`;
    }

    generateHr(y) {
        this.doc
            .strokeColor('#000000')
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(525, y)
            .stroke();
    }
}

module.exports = {
    PDFService,
};
