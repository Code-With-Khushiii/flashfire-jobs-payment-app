import { PaymentPlan, PLAN_DATA } from './types';

export const calculateAmount = (plan: PaymentPlan, discount?: string | number): number => {
  const planPrice = PLAN_DATA[plan].price;
  const discountAmount = discount ? Number(discount) : 0;
  return Math.max(0, planPrice - discountAmount);
};
