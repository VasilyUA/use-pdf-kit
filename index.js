const { createInvoice } = require("./createInvoice.js");


const invoice = {
  patient: {
    basic: { gender: 'male', birthDate: '1950-11-21' },
    payment: {
      paymentToken: '1511892882',
      expirationDate: "2023-11-01T00:00:00.000Z",
      merchantId: 'kacdfi1jwpkacdfi1k'
    },
    shipping: {
      address: 'D Pl SE',
      secondAddress: '12',
      city: 'Auburn',
      state: 'Washington',
      zipCode: '98003'
    },
    photo: {
      IDPhotoUrl: 'us-west-2:ce0b9f28-4d07-41e6-a346-b927e837188b/IDPhoto',
      selfiePhoto: 'us-west-2:ce0b9f28-4d07-41e6-a346-b927e837188b/selfiePhoto'
    },
    prescribeSystem: { errors: null, doseSpotId: 15834497, status: 'register' },
    status: 'active',
    deleted: false,
    _id: "5ec2686b935e1804996c4384",
    notificationPreference: { sms: true, email: true },
    userId: "5ec2686b935e1804996c4383",
    createdAt: "2020-05-18T10:50:19.417Z",
    updatedAt: "2020-05-27T08:10:02.031Z",
    __v: 0,
    medicalFiles: [],
    user: {
      notificationPreference: [Object],
      roles: [Array],
      status: 'active',
      deleted: false,
      _id: "5ec2686b935e1804996c4383",
      email: 'vtapko@bk.ru',
      firstName: 'ivan1',
      lastName: 'tapko',
      createdAt: "2020-05-18T10:50:19.413Z",
      updatedAt: "2020-09-04T08:16:43.872Z",
      __v: 0,
      lastVisit: "2020-05-18T10:50:25.841Z",
      phone: '+1 ( 333 ) 333-3333',
      id: '5ec2686b935e1804996c4383'
    },
    id: '5ec2686b935e1804996c4384'
  },
  calculationData: [
    {
      type: 'subscription',
      name: 'Viagra (Generic Viagra) 1 pill 50mg.\n' +
        '\t\t\tUse 4 times per month.\n' +
        '\t\t\tShip every 3 month.',
      sum: 72,
      isNegative: false
    },
    {
      type: 'coupon',
      name: 'Discount on subscription lo ($5)',
      isNegative: true,
      sum: 5
    },
    {
      type: 'coupon',
      name: 'Discount on registration ($3)',
      isNegative: true,
      sum: 3
    }
  ],
  invoiceId: 'kacdgaf2wpkacdgaf3',
  total: 64
}
;
createInvoice(invoice, "invoice.pdf");
