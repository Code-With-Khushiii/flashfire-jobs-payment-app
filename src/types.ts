export type PaymentPlan = 'Ignite' | 'Professional' | 'Executive';

export interface PaymentDetails {
  name: string;
  email: string;
  plan: PaymentPlan;
  discount?: number;
  paymentStatus: 'Pending' | 'Paid';
  dueDate: string;
  description: string;
  finalAmount: number;
  paymentLink?: string;
}

export interface PlanInfo {
  price: number;
  link: string;
}

export const PLAN_DATA: Record<PaymentPlan, PlanInfo> = {
  Ignite: { 
    price: 199, 
    link: 'https://www.paypal.com/ncp/payment/F6CESAWAYUYU2' 
  },
  Professional: { 
    price: 349, 
    link: 'https://www.paypal.com/ncp/payment/SMTK5UYQYM4A8' 
  },
  Executive: { 
    price: 599, 
    link: 'https://www.paypal.com/ncp/payment/CDRFGB6M566X8' 
  },
};

// export const BackendURL = `https://flashfire-jobs-payment-app.onrender.com/api/payments`;
