import React, { useState } from "react";
import { BackendURL, PaymentDetails, PLAN_DATA } from "../types";
import { calculateAmount } from "../calculateAmount";
import CustomerForm from "./CustomerForm";
import PaymentSummary from "./PaymentSummary";
import axios from "axios";

const AdminPage: React.FC = () => {
    const [formData, setFormData] = useState<Partial<PaymentDetails>>({
        name: "",
        email: "",
        plan: "Ignite",
        discount: undefined,
        paymentStatus: "Pending",
        dueDate: "",
        description: "",
        finalAmount: 0,
    });

    const [customPayPalLink, setCustomPayPalLink] = useState("");
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        const newData = {
            ...formData,
            [name]:
                name === "discount"
                    ? value
                        ? Number(value)
                        : undefined
                    : value,
        };
        const calculated = calculateAmount(
            newData.plan || "Ignite",
            newData.discount
        );
        setFormData({ ...newData, finalAmount: calculated });
        setIsFormSubmitted(true); // Update summary live
    };

    const handleGeneratePaymentLink = async () => {
        if (!formData.name || !formData.email || !formData.plan) {
            alert("Please fill in all required fields");
            return;
        }

        const completePaymentDetails: PaymentDetails = {
            name: formData.name!,
            email: formData.email!,
            plan: formData.plan!,
            finalAmount: formData.finalAmount || 0,
            paymentStatus: formData.paymentStatus || "Pending",
            dueDate: formData.dueDate || "",
            description: formData.description || "",
            discount: formData.discount,
            paymentLink:
                formData.discount && customPayPalLink
                    ? customPayPalLink
                    : PLAN_DATA[formData.plan!].link,
        };     

        try {
            const response = await axios.post(
                BackendURL,
                completePaymentDetails
            );
            const id = response.data._id;
            const link = `${window.location.origin}/${id}`;
            navigator.clipboard.writeText(link);
            alert(`Payment link copied to clipboard: ${link}`);
        } catch (error) {
            console.error("Error creating payment:", error);
            alert("Failed to generate payment link.");
        }
    };

    return (
        <div>
            <header className="app-header">
                <div className="header-content">
                    <div className="company-info">
                        <h1>FlashFireJobs</h1>
                        <p className="tagline">Ignite Your Career Success</p>
                    </div>
                    <div className="header-subtitle">
                        <h2>Payment Link Generator</h2>
                        <p>
                            Generate custom payment links for your Flash Fire
                            Jobs plans
                        </p>
                    </div>
                </div>
            </header>
            <div className="main-container">
                <CustomerForm
                    formData={formData}
                    customPayPalLink={customPayPalLink}
                    handleInputChange={handleInputChange}
                    setCustomPayPalLink={setCustomPayPalLink}
                    handleSubmit={(e) => {
                        e.preventDefault();
                    }} // No submit needed, live update
                />
                <PaymentSummary
                    formData={formData}
                    isFormSubmitted={isFormSubmitted}
                    handleGeneratePaymentLink={handleGeneratePaymentLink}
                />
            </div>
        </div>
    );
};

export default AdminPage;
