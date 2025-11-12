const mongoose = require('mongoose');

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

const paymentSchema = new mongoose.Schema(
     {
          name: { type: String, required: true },
          email: { type: String, required: true },
          plan: { type: String, required: true },
          finalAmount: { type: Number, required: true },
          paymentStatus: { type: String, default: 'Pending' },
          dueDate: { type: Date },
          description: { type: String },
          discount: { type: Number },
          paymentLink: { type: String },
          linkExpiresAt: {
               type: Date,
               default: function () {
                    return new Date(Date.now() + TWENTY_FOUR_HOURS_MS);
               },
          },
     },
     {
          timestamps: true,
     }
);

module.exports = mongoose.model('Payment', paymentSchema);