const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     plan: { type: String, required: true },
     finalAmount: { type: Number, required: true },
     paymentStatus: { type: String, default: 'Pending' },
     dueDate: { type: Date },
     description: { type: String },
     discount: { type: Number },
     paymentLink: { type: String }
});

module.exports = mongoose.model('Payment', paymentSchema);