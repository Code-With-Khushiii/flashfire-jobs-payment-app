import React, { useRef } from "react";
import { PaymentDetails, PLAN_DATA } from "../types";
import { Clock, Copy } from "lucide-react";

interface PaymentDetailsCardProps {
     formData: Partial<PaymentDetails>;
     timeRemaining: number;
     expirationTime: number | null;
}

const PaymentDetailsCard: React.FC<PaymentDetailsCardProps> = ({
     formData,
     timeRemaining,
     expirationTime,
}) => {
     const formatTime = (seconds: number): string => {
          const hours = Math.floor(seconds / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
          return `${hours}h ${minutes}m ${secs}s`;
     };

     type PlanType = "Executive" | "Professional" | "Ignite";

     function getPlanValue(plan: PlanType): number {
          const planValues: Record<PlanType, number> = {
               Executive: 1000,
               Professional: 500,
               Ignite: 250,
          };
          return planValues[plan];
     }

     const value = getPlanValue(formData?.plan as PlanType);

    const paymentIdRef = useRef(
         `${Math.random().toString(36).substr(2, 9)}-${Math.random()
              .toString(36)
              .substr(2, 4)}-${Math.random()
              .toString(36)
              .substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random()
              .toString(36)
              .substr(2, 12)}`
    );
    const paymentId = paymentIdRef.current;

     const copyToClipboard = async (text: string) => {
          if (navigator.clipboard && document.hasFocus()) {
               try {
                    await navigator.clipboard.writeText(text);
                    return true;
               } catch (error) {
                    console.warn("Navigator clipboard write failed, falling back:", error);
               }
          }

          try {
               const textArea = document.createElement("textarea");
               textArea.value = text;
               textArea.setAttribute("readonly", "");
               textArea.style.position = "absolute";
               textArea.style.left = "-9999px";
               document.body.appendChild(textArea);
               textArea.select();
               const successful = document.execCommand("copy");
               document.body.removeChild(textArea);
               return successful;
          } catch (error) {
               console.error("Fallback clipboard copy failed:", error);
               return false;
          }
     };

     return (
          <div className="bg-gray-100  p-4 w-full max-w-4x1 mx-auto space-y-4">
               {/* Block 1: Payment Info */}
               <div className="border border-gray-200 rounded-lg p-5 max-w-md bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                         Payment Details
                    </h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                         <span className="text-gray-600">Amount:</span>
                         <span className="font-semibold text-gray-900">
                              ${formData.finalAmount}
                         </span>

                         <span className="text-gray-600">Name:</span>
                         <span className="text-gray-900">{formData.name}</span>

                         {/* <span className="text-gray-600">Phone:</span>
                         <span className="text-gray-900">{formData.phone}</span> */}

                         <span className="text-gray-600">Email:</span>
                         <span className="text-gray-900">{formData.email}</span>

                         <span className="text-gray-600">Expires at:</span>
                         <span className="text-gray-900">
                              {expirationTime
                                   ? new Date(expirationTime).toLocaleString()
                                   : "N/A"}
                         </span>

                         {timeRemaining > 0 && (
                              <>
                                   <span className="text-gray-600">Link expires in:</span>
                                   <span className="text-red-600 font-medium flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {formatTime(timeRemaining)}
                                   </span>
                              </>
                         )}

                         <span className="text-gray-600">Due date:</span>
                         <span className="text-gray-900">{formData.dueDate}</span>

                         <span className="text-gray-600">Description:</span>
                         <span className="text-gray-900">
                              {formData.description ||
                                   `Enrollment in FlashFire ${formData.plan} Career Services`}
                         </span>

                         <span className="text-gray-600">Payment status:</span>
                         <span className="text-orange-600 font-medium">Pending</span>

                         <span className="text-gray-600">Payment Id:</span>
                         <span className="flex items-center gap-2">
                              <span className="text-xs font-mono text-gray-900">{paymentId}</span>
                              <button
                                   onClick={async () => {
                                        const copied = await copyToClipboard(paymentId);
                                        if (!copied) {
                                             alert(
                                                  `Copy failed. Please copy manually:\n${paymentId}`
                                             );
                                        }
                                   }}
                                   className="text-gray-400 hover:text-gray-600"
                              >
                                   <Copy className="w-4 h-4" />
                              </button>
                         </span>
                    </div>
               </div>

               {/* Block 2: Course Info */}
               <div className="border border-gray-200 rounded-lg max-w-md p-5 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                         Course / Service Details
                    </h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                         <span className="text-gray-600">Course:</span>
                         <span className="text-gray-900">
                              FlashFire {formData.plan} Career Services
                         </span>

                         {formData.discount && (
                              <>
                                   <span className="text-gray-600">Discount provided:</span>
                                   <span className="text-green-600 font-medium">
                                        {Math.round(
                                             (formData.discount /
                                                  (formData.plan
                                                       ? PLAN_DATA[formData.plan].price
                                                       : 1)) *
                                             100
                                        )}
                                        %
                                   </span>
                              </>
                         )}

                         <span className="text-gray-600">Total discounted fee:</span>
                         <span className="font-semibold text-gray-900">
                               ${formData.finalAmount}
                         </span>

                         <span className="text-gray-600">Service type:</span>
                         <span className="text-gray-900">
                              FlashFire {formData.plan} Career Services
                         </span>

                         <span className="text-gray-600">Applications sent:</span>
                         <span className="font-medium text-gray-900">{value}+</span>

                         <span className="text-gray-600">Payment option:</span>
                         <span className="text-gray-900">Monthly subscription</span>

                         <span className="text-gray-600">Course customization:</span>
                         <span className="text-gray-900">N/a</span>
                    </div>
               </div>
          </div>
     );
};

export default PaymentDetailsCard;
