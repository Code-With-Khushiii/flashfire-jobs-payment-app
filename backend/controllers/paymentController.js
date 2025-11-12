const Payment = require('../models/Payment');

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

exports.createPayment = async (req, res) => {
     try {
          const payload = {
               ...req.body,
          };

          if (!payload.linkExpiresAt) {
               payload.linkExpiresAt = new Date(Date.now() + TWENTY_FOUR_HOURS_MS);
          }

          const payment = new Payment(payload);
          await payment.save();
          res.status(201).json(payment);
     } catch (error) {
          res.status(500).json({ message: 'Error creating payment', error });
     }
};

exports.getPayment = async (req, res) => {
     try {
          const payment = await Payment.findById(req.params.id);
          if (!payment) {
               return res.status(404).json({ message: 'Payment not found' });
          }

          if (!payment.linkExpiresAt) {
               const baseTime =
                    payment.createdAt instanceof Date
                         ? payment.createdAt
                         : payment._id.getTimestamp
                         ? payment._id.getTimestamp()
                         : null;

               if (baseTime) {
                    payment.linkExpiresAt = new Date(
                         baseTime.getTime() + TWENTY_FOUR_HOURS_MS
                    );
                    await payment.save();
               }
          }

          if (payment.linkExpiresAt?.getTime() <= Date.now()) {
               return res.status(410).json({ message: 'Payment link expired' });
          }

          res.json(payment);
     } catch (error) {
          res.status(500).json({ message: 'Error fetching payment', error });
     }
};