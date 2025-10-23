# FlashFire Jobs Payment Link Generator

A React TypeScript application for generating custom payment links for Flash Fire Jobs career services with MongoDB integration.

## 🚀 Features

- **Three Service Plans:**
  - Ignite: $199
  - Professional: $349  
  - Executive: $599

- **Advanced Payment System:**
  - Optional discount system
  - 24-hour expiring payment links
  - Real-time countdown timer
  - Shareable payment URLs

- **MongoDB Integration:** 
  - Save payment data to MongoDB Atlas
  - Real-time admin dashboard
  - CSV export functionality
  - Payment status tracking

- **Professional UI:**
  - Modern glass morphism design
  - Responsive layout
  - Smooth animations and transitions

## 🛠️ Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB Atlas account (free tier available)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flash-fire-jobs-payment-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB Atlas:
   - Follow the guide in `MONGODB_SETUP.md`
   - Copy your connection URL

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your MongoDB URL
```

5. Start the application:
```bash
# Start both server and client
npm run dev

# Or start separately:
npm run server  # Backend API
npm start       # React app
```

## 📋 Usage

### Basic Flow:
1. **Customer Details:** Enter name, email, select plan
2. **Add Discount (Optional):** Apply percentage discount if needed
3. **Generate Link:** Create 24-hour expiring payment link
4. **Share Link:** Customer receives secure payment URL
5. **Payment:** Customer completes payment via PayPal
6. **Tracking:** Monitor payments in admin dashboard

### Admin Dashboard:
- Access: `http://localhost:3000/dashboard.html`
- View all payments and statistics
- Export data to CSV
- Real-time updates every 30 seconds

## 🗄️ MongoDB Setup

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (M0 Sandbox - Free)

2. **Configure Database Access:**
   - Create database user
   - Set network access (allow all IPs for development)
   - Get connection string

3. **Update Environment:**
   ```bash
   MONGODB_URL=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/flashfire-payments?retryWrites=true&w=majority
   REACT_APP_API_BASE_URL=http://localhost:3001
   ```

## 🏗️ File Structure

```
flash-fire-jobs-payment-app/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── index.tsx               # React entry point
│   ├── types.ts                # TypeScript type definitions
│   ├── calculateAmount.ts      # Payment calculation utility
│   └── mongoDbService.ts       # MongoDB integration
├── public/
│   ├── index.html              # HTML template
│   └── dashboard.html          # Admin dashboard
├── server.js                   # Express.js API server
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── MONGODB_SETUP.md            # MongoDB setup guide
└── README.md                   # This file
```

## 🔧 Available Scripts

- `npm start` - Runs React app in development mode
- `npm run server` - Starts the Express.js API server
- `npm run dev` - Runs both server and client concurrently
- `npm run build` - Builds the app for production
- `npm run start:prod` - Builds and runs production server
- `npm test` - Runs the test suite

## 🌐 API Endpoints

- `POST /api/payments` - Save payment data
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `PUT /api/payments/:id` - Update payment
- `GET /api/payments/export/csv` - Export to CSV
- `GET /api/health` - Health check

## 🏢 Company Information

**Flash Fire Jobs** - Career services company offering professional resume and career development services.

**Service Plans:**
- **Ignite ($199):** Basic career services
- **Professional ($349):** Enhanced career package  
- **Executive ($599):** Premium executive-level services

## 🚀 Deployment

### Frontend (Vercel/Netlify):
1. Build the React app: `npm run build`
2. Deploy the `build` folder
3. Set environment variables in deployment platform

### Backend (Railway/Heroku):
1. Create new app on platform
2. Connect GitHub repository
3. Set environment variables (MONGODB_URL, PORT)
4. Deploy from main branch

## 🔒 Security Notes

- MongoDB connection string contains credentials - never commit to Git
- Use IP whitelisting in production instead of allowing all IPs
- Consider using MongoDB Realm for serverless deployment
- Implement proper authentication for admin dashboard in production

## 📊 Features in Detail

### Payment Link Generation:
- Automatic 24-hour expiration
- URL-based parameter sharing
- Clipboard integration
- Mobile-friendly responsive design

### Data Management:
- Automatic local storage backup if server is down
- Real-time dashboard with auto-refresh
- CSV export with formatted data
- Payment status tracking

### MongoDB Integration:
- Cloud-based database storage
- Scalable Atlas infrastructure
- Real-time data synchronization
- Backup and restore capabilities

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

---

For detailed MongoDB setup instructions, see `MONGODB_SETUP.md`.