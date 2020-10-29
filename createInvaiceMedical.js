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
        this.fontBold = 'Helvetica-Bold';
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

        //Header
        this.doc.image('images/MENS.png', 50, this.marginTop, {
            width: 150,
            height: 30,
        })
            .fontSize(this.fontSize)
            .font(this.fontBold)
            .text(`Created:`, 355, this.marginTop + 5)
            .fontSize(this.fontSize)
            .font(this.font)
            .text(`${this.getDate(date)}`, 240, this.marginTop + 5, {
                align: 'right',
            });

        //Information
        this.marginTop = 60;
        const x = 170;
        const maxHeight = 120;
        const customerY = 13;
        const {
            user: {email, firstName, lastName, phone},
            basic: {gender, birthDate},
            prescribeSystem: {doseSpotId},
        } = this.data.patient;

        //Face photo
        this.doc
            .image('images/face.jpg', 50, this.marginTop + 10, {
                width: x - 60,
                height: maxHeight,
                align: 'center',
                valign: 'center',
            })
            .rect(50, this.marginTop + 10, x - 60, maxHeight)
            .stroke();

        //Headings information
        this.doc
            .fontSize(this.fontSize + 2)
            .font(this.fontBold)
            .text('Information:', x, this.marginTop + 4)
            .text('Patient', 50, this.marginTop + 4, {align: 'right'})
            .strokeColor('#000000')
            .lineWidth(1)
            .moveTo(x, this.marginTop + 20)
            .lineTo(525, this.marginTop + 20)
            .stroke();

        //Information Name
        this.doc
            .fontSize(this.fontSize - 2)
            .font(this.fontBold)
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

        //Information data
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

        this.generateHr(this.marginTop + (128 + customerY));

        //Document photo
        this.doc
            .image('images/med.jpg', 50, this.marginTop + 150, {
                width: 475,
                height: 200,
                align: 'center',
                valign: 'center',
            }).rect(
            50,
            this.marginTop + 150,
            475,
            (this.marginTop = this.marginTop + 140)
        )
            .stroke();
    }

    generateNotes() {
        let i;
        this.marginTop = 25;
        this.verticalLine = this.marginTop + 19;
        const positions = [this.marginTop + 30];

        //Header notes
        this.doc.addPage()
            .fontSize(this.fontSize + 7)
            .font(this.fontBold)
            .text(`Notes`, 70, this.marginTop, {align: 'center'});

        //Line
        this.generateHr(this.verticalLine + 5);

        //Generate notes
        for (i = 0; i < this.data.notes.length; i++) {
            const {text, createdAt} = this.data.notes[i];

            //calculateHeight
            const rowHeight = this.calculateHeight(text, this.fontSize -  2);
            positions.push(Math.round(rowHeight) + positions[i]);
            if (positions[i] > this.totalHeight) {
                this.doc.addPage();
                positions[i] = 20;
                positions[i + 1] = positions[i] + rowHeight;
            }

            //Data notes
            this.doc
                .fontSize(this.fontSize - 3)
                .font(this.fontBold).text(`${i + 1})  ${'Note:'.slice(0, 'Note:'.length)}`, 65, positions[i])
                .font(this.font)
                .text(`${text.slice(0, text.length)} `, 115, positions[i], {
                    width: 395,
                    align: 'justify',
                    characterSpacing: this.lineHeight - 0.1,
                    lineBreak: false,
                    lineGap: this.lineHeight,
                }).font(this.fontBold).text(
                `Create: ${this.getDate(createdAt)}`, 365);

            //Line
            this.generateHr(positions[i + 1] - 18);
        }
    }

    generateSub() {
        let i;
        const x = 55;
        this.marginTop = 75;
        this.verticalLine = this.marginTop + 19;

        //Generate subscriptions
        for (i = 0; i < this.data.subscriptions.length; i++) {
            this.marginTop = 75;
            this.doc.addPage();

            //Data
            const {
                _id,
                productType,
                isApproved,
                questionnaire,
                status,
                plan: {
                    productName,
                    variationName,
                    frequencyOfDelivery,
                    frequencyOfReception,
                    substance,
                    variationDescription,
                },
                registrationDoneDate,
                approvedDate,
                expiredAt,
                nextPeriodStart,
            } = this.data.subscriptions[i];

            //Generate headings subscriptions
            this.doc
                .fontSize(this.fontSize + 7)
                .font(this.fontBold)
                .text(`Subscriptions`, 70, this.marginTop - 50, {
                    align: 'center',
                });

            //Line
            this.generateHr(this.verticalLine - 50);

            //Generate headings plan
            this.doc
                .fontSize(this.fontSize + 2)
                .font(this.fontBold)
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
                .text('Substance:', x, this.marginTop + 65, {
                    align: 'left',
                })

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
                .text(substance, x, this.marginTop + 65, {
                    align: 'right',
                })

            //!Line
            this.generateHr(this.verticalLine + 60);

            //Calculate variation description
            this.marginTop = 155

            //Generate variation description
            this.generateVariationDescription(variationDescription);

            //Margin top status subscription
            this.marginTop = variationDescription === "" ? this.marginTop - 10 : this.marginTop - 27;

            //Status Name
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

            //Status value
            let statuses = status[0].toUpperCase() + status.slice(1);
            this.doc
                .fontSize(this.fontSize - 2)
                .font(this.font)
                .text(statuses, x, this.marginTop + 20, {
                    align: 'right',
                })
                .text(isApproved ? `Approved date: ${this.getDate(approvedDate)}` : "Declined", x, this.marginTop + 35, {
                    align: 'right',
                })
                .text(productType, x, this.marginTop + 50, {
                    align: 'right',
                });

            //!Line
            this.generateHr(this.marginTop + 70);

            //Generate headings questionnaire
            this.doc
                .fontSize(this.fontSize + 2)
                .font(this.fontBold)
                .text('Questionnaire', 70, this.marginTop + 80, {
                    align: 'left',
                })
                .strokeColor('#000000')
                .lineWidth(1)
                .moveTo(55, this.marginTop + 95)
                .lineTo(190, this.marginTop + 95)
                .stroke();

            const height = this.marginTop + 95

            //Generate questionnaire
            const Height = this.generateQuestionnaire(questionnaire, height);

            //Generate date
            this.marginTop = Height;
            this.doc
                .fontSize(this.fontSize - 2)
                .font(this.font)
                .text(`Registration done date: ${this.getDate(
                        registrationDoneDate
                    )}`, x + 170, this.marginTop + 5, { align: 'right', })
                .text(`ExpiredAt ${this.getDate(expiredAt)}`, x, this.marginTop + 20, {
                        align: 'right',
                    })
                .text(`Next period start: ${this.getDate(nextPeriodStart)}`, x, this.marginTop + 35, {
                        align: 'right',
                    });

            this.generateHistory(_id);
        }
    }

    generateHistory(id) {
        this.marginTop = 25;
        const x = 55;
        const { subscriptionHistory } = this.data;
        const history = subscriptionHistory.find(element => element.subscriptionId === id);
        if (!history) return;
        const { subscription, event, action,  } = history;
        const {plan:{productName, variationName, frequencyOfDelivery, frequencyOfReception,substance,variationDescription}, isApproved, status, productType, questionnaire, registrationDoneDate, approvedDate, expiredAt, nextPeriodStart} = subscription;

        if (action === "approved"){
        this.doc.addPage();
        //Generate headings subscriptions history
        this.doc
            .fontSize(this.fontSize + 7)
            .font(this.fontBold)
            .text(`Subscriptions history`, 70, this.marginTop, {
                align: 'center',
            });

        //Line
        this.generateHr(this.marginTop + 25);

        //Generate headings history plan
        this.doc
            .fontSize(this.fontSize + 2)
            .font(this.fontBold)
            .text('Plan', 70, this.marginTop + 40, { align: 'left',})
            .strokeColor('#000000')
            .lineWidth(1)
            .moveTo(50, this.marginTop + 55)
            .lineTo(125, this.marginTop + 55)
            .stroke();

        // History plan name
        this.doc
            .fontSize(this.fontSize - 2)
            .font(this.font)
            .text('Product name:', x, this.marginTop + 65, { align: 'left', width: 100,})
            .text('Variation name:', x, this.marginTop + 80, { align: 'left',})
            .text('Frequency of delivery:', x, this.marginTop + 95, { align: 'left', })
            .text('Frequency of reception:', x, this.marginTop + 110, { align: 'left',})
            .text('Substance:', x, this.marginTop + 125, { align: 'left',})

        // Plan value
        this.doc
            .fontSize(this.fontSize - 2)
            .font(this.font)
            .text(productName, x + 170, this.marginTop + 65, {
                align: 'right',
            })
            .text(variationName, x, this.marginTop + 80, {
                align: 'right',
            })
            .text(frequencyOfDelivery, x, this.marginTop + 95, {
                align: 'right',
            })
            .text(frequencyOfReception, x, this.marginTop + 110, {
                align: 'right',
            })
            .text(substance, x, this.marginTop +125 , {
                align: 'right',
            });

        //Line
        this.generateHr(this.marginTop + 145);

        this.marginTop = 165;

        //Generate variation description
        this.generateVariationDescription(variationDescription)


        //Status Name
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

        //Status value
        this.doc
            .fontSize(this.fontSize - 2)
            .font(this.font)
            .text(statuses, x, this.marginTop + 20, {
                align: 'right',
            })
            .text(isApproved ? `Approved date: ${this.getDate(approvedDate)}` : "Declined", x, this.marginTop + 35, {
                align: 'right',
            })
            .text(productType, x, this.marginTop + 50, {
                align: 'right',
            });

        let heightDateEnd = this.marginTop + 50;

        if (event === "renewal"){
            //!Line
            this.generateHr(this.marginTop + 67);

            //Generate headings questionnaire
            this.doc
                .fontSize(this.fontSize + 2)
                .font(this.fontBold)
                .text('Questionnaire', 70, this.marginTop + 80, {
                    align: 'left',
                })
                .strokeColor('#000000')
                .lineWidth(1)
                .moveTo(55, this.marginTop + 95)
                .lineTo(190, this.marginTop + 95)
                .stroke();

            const height = this.marginTop + 95
            //Generate questionnaire
            heightDateEnd =  this.generateQuestionnaire(questionnaire, height);
            }
            //Generate date
            this.marginTop = heightDateEnd + 30;
            this.doc
                .fontSize(this.fontSize - 2)
                .font(this.font)
                .text(`Registration done date: ${this.getDate(
                    registrationDoneDate
                )}`, x + 170, this.marginTop + 5, { align: 'right', })
                .text(`ExpiredAt ${this.getDate(expiredAt)}`, x, this.marginTop + 20, {
                    align: 'right',
                })
                .text(`Next period start: ${this.getDate(nextPeriodStart)}`, x, this.marginTop + 35, {
                    align: 'right',
                });
        }
    }

    generateQuestionnaire(questionnaire, height) {
        let index;
        let nextHeightDate;
        this.marginTop = height;
        const positions = [this.marginTop + 10];

        //Generate questionnaire
        for (index = 0; index < questionnaire.length; index++) {
            const {question, answers} = questionnaire[index];
            //Calculate height
            const rowHeight = this.calculateHeight(question, this.fontSize)
            positions.push(positions[index] + rowHeight);

            if (positions[index] > this.totalHeight) {
                positions[index] = 50; // start position from new page
                positions[index + 1] = positions[index] + rowHeight + 5;
                this.doc.addPage();
            }

            //Question
            this.doc
                .fontSize(this.fontSize - 2).font(this.font).text(`${index + 1})`, 50, positions[index])
                .font(this.font)
                .text(`${question}`, 70, positions[index], {
                    align: 'justify',
                    width: 445,
                });

            //Calculate height for answer
            const maxHeight = positions[index] + 30;

            // Answer
            const nextHeightQuestion = this.generateAnswer(answers, maxHeight);
            positions[index + 1] = nextHeightQuestion + 10;

            //Height for date subscription
            nextHeightDate = positions[index + 1];
        }

        //Height for date subscription
        return nextHeightDate;
    }

    generateVariationDescription(variationDescription){
        const nextHeight = this.calculateHeight(variationDescription, this.fontSize - 3);

        //Generate variation description
        if (variationDescription !== ''){
            this.doc
                .fontSize(this.fontSize - 3)
                .font(this.fontBold)
                .text(`${'Variation description:'.slice(0, 'Variation description:'.length)}`, 55, this.marginTop + 10)
                .font(this.font)
                .text(`${variationDescription.slice(0, variationDescription.length)} `, 175, this.marginTop + 10, {
                    width: 345,
                    align: 'justify',
                    characterSpacing: this.lineHeight - 0.1,
                    lineBreak: false,
                    lineGap: this.lineHeight,
                }).font(this.fontBold);

            this.marginTop = this.marginTop + nextHeight;
            //Line
            this.generateHr(this.marginTop - 15);
        }
    }

    generateAnswer(answers, height){
        let i;
        this.marginTop = height;
        const positions = [this.marginTop];
        let Height;

        for (i = 0; i < answers.length; i++) {
                //Validate text
                const answer = answers[i].text ? answers[i].text : 'Not found';

                const rowHeight = this.calculateHeight(answer, this.fontSize - 3);
                positions.push(positions[i] + (rowHeight - 23));
                this.doc
                    .font(this.fontBold)
                    .text(`${'Answer:'.slice(0, 'Answer:'.length)}`, 75, positions[i]).font(this.font)
                    .text(`${answer === "false" ? "No" : answer}`, 130, positions[i], {
                        align: 'justify',
                        width: 365,
                    });
                Height = positions[i + 1]
        }
        return Height;
    }

    calculateHeight(params, fontSize){
        return fontSize * 2 * this.lineHeight * Math.ceil(params.length / this.maxPixelWith + 1);
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

module.exports = PDFService;
