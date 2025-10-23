import React from "react";
import { PaymentDetails, PLAN_DATA } from "../types";

interface PaymentSummaryProps {
     formData: Partial<PaymentDetails>;
     isFormSubmitted: boolean;
     handleGeneratePaymentLink: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
     formData,
     isFormSubmitted,
     handleGeneratePaymentLink,
}) => {
     return (
          <div className="summary-section">
               <div className="section-header">
                    <h2>Payment Summary</h2>
                    <p>Review the payment details</p>
               </div>
               {isFormSubmitted && (
                    <div className="payment-summary">
                         <div className="summary-item">
                              <strong>Customer:</strong> {formData.name}
                         </div>
                         <div className="summary-item">
                              <strong>Email:</strong> {formData.email}
                         </div>
                         <div className="summary-item">
                              <strong>Plan:</strong> {formData.plan}
                         </div>
                         <div className="summary-item">
                              <strong>Original Price:</strong> $
                              {formData.plan ? PLAN_DATA[formData.plan].price : 0}
                         </div>
                         {formData.discount && (
                              <div className="summary-item discount">
                                   <strong>Discount:</strong> -${formData.discount}
                              </div>
                         )}
                         <div className="summary-item total">
                              <strong>Final Amount:</strong> ${formData.finalAmount}
                         </div>
                         <div className="summary-item">
                              <strong>Payment Status:</strong>{" "}
                              {formData.paymentStatus}
                         </div>
                         <div className="summary-item">
                              <strong>Due Date:</strong> {formData.dueDate}
                         </div>
                         {formData.description && (
                              <div className="summary-item">
                                   <strong>Description:</strong> {formData.description}
                              </div>
                         )}
                         <div className="payment-action">
                              <button
                                   onClick={handleGeneratePaymentLink}
                                   className="pay-now-button"
                              >
                                   Generate Payment Link
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default PaymentSummary;
