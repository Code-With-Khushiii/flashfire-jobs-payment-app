const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
     try {
          const payment = new Payment(req.body);
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
          res.json(payment);
     } catch (error) {
          res.status(500).json({ message: 'Error fetching payment', error });
     }
};