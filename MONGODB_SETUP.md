# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Create account with your email
4. Choose **"Shared"** (Free tier)

## Step 2: Create a New Cluster

1. After logging in, click **"Create"** → **"Cluster"**
2. Choose **"M0 Sandbox"** (Free forever)
3. Select **"AWS"** as cloud provider
4. Choose the region closest to you (e.g., **us-east-1**)
5. Give your cluster a name (e.g., **"flashfire-payments"**)
6. Click **"Create Cluster"** (takes 3-5 minutes)

## Step 3: Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `flashfire-admin` (or any username you prefer)
5. Password: Click **"Autogenerate Secure Password"** and **COPY IT**
6. Database User Privileges: Select **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Set Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - This adds `0.0.0.0/0` which allows all IPs
   - For production, you'd want to restrict this to specific IPs
4. Click **"Confirm"**

## Step 5: Get Your Connection URL

1. Go back to **"Clusters"** in the left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as driver and **"4.1 or later"** as version
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@flashfire-payments.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your Connection URL

1. Replace `<username>` with your database username (e.g., `flashfire-admin`)
2. Replace `<password>` with the password you copied in Step 3
3. Add your database name at the end: `/flashfire-payments`

**Final URL Example:**
```
mongodb+srv://flashfire-admin:yourPassword123@flashfire-payments.xxxxx.mongodb.net/flashfire-payments?retryWrites=true&w=majority
```

## Step 7: Add URL to Your App

1. Create a `.env` file in your project root
2. Add your MongoDB URL:
   ```
   REACT_APP_MONGODB_URL=mongodb+srv://flashfire-admin:yourPassword123@flashfire-payments.xxxxx.mongodb.net/flashfire-payments?retryWrites=true&w=majority
   REACT_APP_API_BASE_URL=http://localhost:3001
   ```

## Step 8: Test Connection

Once you've set up the backend server (which I'll create next), you can test the connection and see your data in MongoDB Atlas:

1. Go to **"Collections"** in your MongoDB Atlas dashboard
2. You should see a database called **"flashfire-payments"**
3. Inside it, you'll see a collection called **"payments"** with your payment data

## Security Notes

- **Never commit your `.env` file to Git** (it's already in `.gitignore`)
- For production, create a separate MongoDB cluster and user
- Use IP whitelisting instead of "Allow Access from Anywhere" in production
- Consider using MongoDB Realm or Vercel/Netlify functions for serverless deployment

## Troubleshooting

### Common Issues:
1. **Connection timeout**: Check network access settings
2. **Authentication failed**: Verify username/password in connection string
3. **Database not found**: MongoDB creates databases automatically when first document is inserted

### Testing Your Connection:
You can test your connection URL using MongoDB Compass (GUI tool):
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Use your connection string to connect
3. You should be able to see your database structure
