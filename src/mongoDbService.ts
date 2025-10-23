// MongoDB Service for FlashFire Payment App
import { PaymentDetails } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export const mongoDbService = {
  // Save payment data to MongoDB
  async savePayment(paymentDetails: PaymentDetails): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Payment saved to MongoDB successfully:', result.data);
        return result;
      } else {
        console.error('❌ Failed to save payment:', result.message);
        return result;
      }
    } catch (error) {
      console.error('❌ Error saving payment to MongoDB:', error);
      return {
        success: false,
        message: 'Network error - could not save payment',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Get all payments (for admin dashboard)
  async getAllPayments(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('❌ Error fetching payments:', error);
      return {
        success: false,
        message: 'Failed to fetch payments',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Get single payment by ID
  async getPaymentById(id: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/${id}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('❌ Error fetching payment:', error);
      return {
        success: false,
        message: 'Failed to fetch payment',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Update payment (for status updates, PayPal confirmations, etc.)
  async updatePayment(id: string, updates: Partial<PaymentDetails>): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('❌ Error updating payment:', error);
      return {
        success: false,
        message: 'Failed to update payment',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Check if server is running
  async checkServerStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      const result = await response.json();
      return result.status === 'Server is running';
    } catch (error) {
      console.error('❌ Server is not running:', error);
      return false;
    }
  },

  // Fallback: Save to local storage if server is down
  saveToLocalStorage(paymentDetails: PaymentDetails): void {
    try {
      const existingPayments = JSON.parse(localStorage.getItem('flashfire-payments') || '[]');
      const newPayment = {
        ...paymentDetails,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        savedLocally: true
      };
      
      existingPayments.push(newPayment);
      localStorage.setItem('flashfire-payments', JSON.stringify(existingPayments));
      
      console.log('💾 Payment saved to local storage as backup:', newPayment);
    } catch (error) {
      console.error('❌ Error saving to local storage:', error);
    }
  },

  // Get payments from local storage
  getFromLocalStorage(): any[] {
    try {
      return JSON.parse(localStorage.getItem('flashfire-payments') || '[]');
    } catch (error) {
      console.error('❌ Error reading from local storage:', error);
      return [];
    }
  }
};

// Legacy function for backward compatibility
export const saveToMongoDB = mongoDbService.savePayment;
