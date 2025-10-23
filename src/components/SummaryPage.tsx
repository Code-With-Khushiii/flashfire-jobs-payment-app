

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BackendURL, type PaymentDetails, PLAN_DATA } from "../types"
import Header from "./Header"
import PaymentDetailsCard from "./PaymentDetailsCard"
import PaymentOptionsCard from "./PaymentOptionsCard"
import axios from "axios"

const SummaryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<Partial<PaymentDetails>>({})
  const [customPayPalLink, setCustomPayPalLink] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isExpired, setIsExpired] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(0) // For due date countdown

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${BackendURL}/${id}`)
        const data = response.data
        setFormData({
          ...data,
          dueDate: data.dueDate ? new Date(data.dueDate).toISOString().split("T")[0] : "",
        })
        setCustomPayPalLink(data.paymentLink || "")
        const dueDateTime = new Date(data.dueDate).getTime()
        const now = Date.now()
        if (dueDateTime < now) {
          setIsExpired(true)
        } else {
          // Start countdown for due date
          const interval = setInterval(() => {
            const remaining = Math.max(0, Math.floor((dueDateTime - Date.now()) / 1000))
            setTimeRemaining(remaining)
            if (remaining <= 0) {
              setIsExpired(true)
              clearInterval(interval)
            }
          }, 1000)
          return () => clearInterval(interval)
        }
      } catch (error) {
        console.error("Error fetching payment:", error)
        setIsExpired(true) // Treat as expired if not found
      } finally {
        setIsLoading(false)
      }
    }
    fetchPayment()
  }, [id])

  const handlePayNow = () => {
    const paymentLink = customPayPalLink || (formData.plan ? PLAN_DATA[formData.plan].link : "")
    if (paymentLink) {
      window.open(paymentLink, "_blank")
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

 if (isExpired) {
  return (
    <div className="payment-summary-container min-h-screen flex items-center justify-center ">
      <div className="app-scale-wrapper max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        
        {/* LEFT SECTION */}
        <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col justify-center border border-orange-200">
          <Header dueDate={formData.dueDate} timeRemaining={0} />
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center text-center border border-orange-200">
          <h2 className="text-2xl font-bold text-orange-700 flex items-center gap-2">
            ⏰ Payment Link Expired
          </h2>
          <p className="text-gray-600 mt-4">
            This payment link has expired.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Please contact <span className="font-semibold">FlashFire Jobs</span> to request a new payment link.
          </p>
          <button
            onClick={() => (window.location.href = window.location.origin)}
            className="bg-green-500 text-white py-2 px-6 rounded-xl hover:bg-green-700 transition"
          >
            🏠 Return to Home
          </button>
        </div>
      </div>
    </div>
  )
}

  return (
    <div className="payment-summary-container">
      <div className="app-scale-wrapper">
        <Header dueDate={formData.dueDate} timeRemaining={timeRemaining} />
        <div className="payment-content">
          <PaymentDetailsCard
            formData={formData}
            timeRemaining={timeRemaining}
            expirationTime={new Date(formData.dueDate || "").getTime()}
          />
          <PaymentOptionsCard customPayPalLink={customPayPalLink} plan={formData.plan} handlePayNow={handlePayNow} />
        </div>
        {/* Refund Policy Section */}
        {/* <div className="refund-policy">
                    <h3>Refund Policy</h3>
                    <p>
                        We do not offer refunds — instead, we reinvest by
                        applying to 150–200 extra jobs for you, ensuring your
                        career gets maximum opportunities.
                    </p>
                </div> */}
      </div>
    </div>
  )
}

export default SummaryPage
