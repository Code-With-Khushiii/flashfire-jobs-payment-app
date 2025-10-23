import React from "react";

interface PaymentOptionsCardProps {
     customPayPalLink: string;
     plan?: string;
     handlePayNow: () => void;
}

const PaymentOptionsCard: React.FC<PaymentOptionsCardProps> = ({
     customPayPalLink,
     handlePayNow,
}) => {
     return (
          <div className="bg-white p-4 px-10 rounded-xl space-y-6 w-full max-w-2xl mx-auto min-h-[700px]">
            
               {/* Block 1: Recommended Option */}
               <div className="bg-white rounded-md border border-gray-200 shadow-sm p-5 text-sm space-y-3">
                    <h3 className="text-base font-semibold text-gray-900">
                         Recommended option
                    </h3>
                    <p className="flex items-start gap-2 text-gray-600 text-sm">
                         <span className="text-green-600">●</span>
                         Stripe supports payment via all commonly used credit cards and additional
                         options depending on your country.
                    </p>
                    <button
                         onClick={handlePayNow}
                         className="flex items-center justify-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-50 transition"
                    >
                         Pay via Paypal
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   strokeWidth="2"
                                   d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                         </svg>
                    </button>
               </div>

               {/* Block 2: Wire Transfer */}
               <h3 className="text-base font-semibold text-gray-900">
                    Option 2: Wire Transfer (USD)
               </h3>
               <div className="bg-white rounded-md border border-gray-200 shadow-sm p-3 text-sm space-y-2">

                    <div className="grid grid-cols-2 gap-y-2 w-full">
                         <span className="text-gray-600">Account Name:</span>
                         <span className="text-gray-900 font-mono">FLASHFIRE PRIVATE LIMITED</span>

                         <span className="text-gray-600">Account No:</span>
                         <span className="text-gray-900">50200112273760</span>

                         <span className="text-gray-600">IFSC Code:</span>
                         <span className="text-gray-900">HDFC0000131</span>

                         <span className="text-gray-600">SWIFT Code:</span>
                         <span className="text-gray-900">HDFCINBB</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                         Please notify us once the transfer is complete.
                    </p>
               </div>

               {/* Block 3: Pay in INR */}
               <h3 className="text-base font-semibold text-gray-900 ">
                    Option 3: Pay in INR
               </h3>
               <div className="bg-white rounded-md border border-gray-200 shadow-sm p-5 text-sm space-y-2">

                    <div className="grid grid-cols-2 gap-y-2 w-full">
                         <span className="text-gray-600">Account Name:</span>
                         <span className="text-gray-900 font-mono">FLASHFIRE PRIVATE LIMITED</span>

                         <span className="text-gray-600">Account No:</span>
                         <span className="text-gray-900">50200112273760</span>

                         <span className="text-gray-600">IFSC Code:</span>
                         <span className="text-gray-900">HDFC0000131</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                         UPI/INR payments are processed instantly.
                    </p>
               </div>
          </div>
     );
};

export default PaymentOptionsCard;
