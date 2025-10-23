const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const connectToMongoDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    db = client.db(); // Uses the database specified in the connection string
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Save payment data
app.post('/api/payments', async (req, res) => {
  try {
    const paymentData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('payments').insertOne(paymentData);
    
    res.status(201).json({
      success: true,
      message: 'Payment data saved successfully',
      id: result.insertedId,
      data: paymentData
    });

    console.log('Payment saved:', paymentData);
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save payment data',
      error: error.message
    });
  }
});

// Get all payments (for admin/dashboard)
app.get('/api/payments', async (req, res) => {
  try {
    const payments = await db.collection('payments').find({}).sort({ createdAt: -1 }).toArray();
    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payments',
      error: error.message
    });
  }
});

// Get payment by ID
app.get('/api/payments/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const payment = await db.collection('payments').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment',
      error: error.message
    });
  }
});

// Update payment status (for PayPal webhooks or manual updates)
app.put('/api/payments/:id', async (req, res) => {
  try {
    const { ObjectId } = require('mongodb');
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    const result = await db.collection('payments').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      message: 'Payment updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment',
      error: error.message
    });
  }
});

// Export payments to CSV
app.get('/api/payments/export/csv', async (req, res) => {
  try {
    const payments = await db.collection('payments').find({}).sort({ createdAt: -1 }).toArray();
    
    if (payments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No payments found'
      });
    }

    // Create CSV content
    const csvHeaders = 'Name,Email,Plan,Amount,Discount,Final Amount,Created At,Link Expires At\n';
    const csvContent = payments.map(payment => {
      return [
        payment.customerName || '',
        payment.customerEmail || '',
        payment.selectedPlan || '',
        payment.amount || '',
        payment.discountPercentage || '0',
        payment.finalAmount || payment.amount || '',
        payment.createdAt ? new Date(payment.createdAt).toLocaleString() : '',
        payment.linkExpiresAt ? new Date(payment.linkExpiresAt).toLocaleString() : ''
      ].map(field => `"${field}"`).join(',');
    }).join('\n');

    const csv = csvHeaders + csvContent;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=flashfire-payments.csv');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export CSV',
      error: error.message
    });
  }
});

// Start server
const startServer = async () => {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`\n🚀 FlashFire Payment Server running on http://localhost:${port}`);
    console.log(`📊 API endpoints:`);
    console.log(`   POST /api/payments - Save payment data`);
    console.log(`   GET  /api/payments - Get all payments`);
    console.log(`   GET  /api/payments/:id - Get payment by ID`);
    console.log(`   PUT  /api/payments/:id - Update payment`);
    console.log(`   GET  /api/payments/export/csv - Export to CSV`);
    console.log(`   GET  /api/health - Health check\n`);
  });
};

startServer().catch(console.error);
