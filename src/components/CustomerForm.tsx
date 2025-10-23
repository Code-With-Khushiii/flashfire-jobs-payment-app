import React from "react";
import { PaymentDetails } from "../types";

interface CustomerFormProps {
     formData: Partial<PaymentDetails>;
     customPayPalLink: string;
     handleInputChange: (
          e: React.ChangeEvent<
               HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          >
     ) => void;
     setCustomPayPalLink: (value: string) => void;
     handleSubmit: (e: React.FormEvent) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
     formData,
     customPayPalLink,
     handleInputChange,
     setCustomPayPalLink,
     handleSubmit,
}) => {
     return (
          <div className="form-section">
               <div className="section-header">
                    <h2>Customer Details</h2>
                    <p>Fill in the customer information to generate payment link</p>
               </div>
               <form onSubmit={handleSubmit} className="payment-form">
                    <div className="form-group">
                         <label htmlFor="name">Name *</label>
                         <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name || ""}
                              onChange={handleInputChange}
                              required
                         />
                    </div>
                    <div className="form-group">
                         <label htmlFor="email">Email *</label>
                         <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email || ""}
                              onChange={handleInputChange}
                              required
                         />
                    </div>
                    <div className="form-group">
                         <label htmlFor="plan">Service Plan *</label>
                         <select
                              id="plan"
                              name="plan"
                              value={formData.plan || "Ignite"}
                              onChange={handleInputChange}
                              required
                         >
                              <option value="Ignite">Ignite - $199</option>
                              <option value="Professional">
                                   Professional - $349
                              </option>
                              <option value="Executive">Executive - $599</option>
                         </select>
                    </div>
                    <div className="form-group">
                         <label htmlFor="discount">Discount Amount (Optional)</label>
                         <input
                              type="number"
                              id="discount"
                              name="discount"
                              value={formData.discount || ""}
                              onChange={handleInputChange}
                              placeholder="Enter discount amount"
                              min="0"
                         />
                    </div>
                    {formData.discount && (
                         <div className="form-group">
                              <label htmlFor="customPayPalLink">
                                   Custom PayPal Link *
                              </label>
                              <input
                                   type="url"
                                   id="customPayPalLink"
                                   value={customPayPalLink}
                                   onChange={(e) =>
                                        setCustomPayPalLink(e.target.value)
                                   }
                                   placeholder="Enter custom PayPal payment link for discounted amount"
                                   required
                              />
                              <small>Required when discount is applied</small>
                         </div>
                    )}
                    <div className="form-group">
                         <label htmlFor="dueDate">Due Date</label>
                         <input
                              type="date"
                              id="dueDate"
                              name="dueDate"
                              value={formData.dueDate || ""}
                              onChange={handleInputChange}
                         />
                    </div>
                    <div className="form-group">
                         <label htmlFor="description">Description (Optional)</label>
                         <textarea
                              id="description"
                              name="description"
                              value={formData.description || ""}
                              onChange={handleInputChange}
                              rows={3}
                              placeholder="Additional notes or description"
                         />
                    </div>
                    {/* Button removed here, moved to PaymentSummary */}
               </form>
          </div>
     );
};

export default CustomerForm;
