

import React, { useState, useEffect } from "react"
import { AlertCircle, Clock, RefreshCcw } from "lucide-react"
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
  const [timeRemaining, setTimeRemaining] = useState<number>(0) // For countdown
  const [linkExpirationTime, setLinkExpirationTime] = useState<number | null>(null)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined

    const fetchPayment = async () => {
      try {
        const response = await axios.get(`${BackendURL}/${id}`)
        const data = response.data
        setFormData({
          ...data,
          dueDate: data.dueDate ? new Date(data.dueDate).toISOString().split("T")[0] : "",
        })
        setCustomPayPalLink(data.paymentLink || "")

        const createdAtTime = data.createdAt ? new Date(data.createdAt).getTime() : null
        const linkExpiresAtTime = data.linkExpiresAt ? new Date(data.linkExpiresAt).getTime() : null
        const expiration = linkExpiresAtTime ?? (createdAtTime ? createdAtTime + 24 * 60 * 60 * 1000 : null)

        setLinkExpirationTime(expiration)

        const now = Date.now()
        if (!expiration || expiration <= now) {
          setIsExpired(true)
          setTimeRemaining(0)
        } else {
          setIsExpired(false)
          setTimeRemaining(Math.floor((expiration - now) / 1000))

          intervalId = setInterval(() => {
            const remaining = Math.max(0, Math.floor((expiration - Date.now()) / 1000))
            setTimeRemaining(remaining)
            if (remaining <= 0) {
              setIsExpired(true)
              if (intervalId) {
                clearInterval(intervalId)
                intervalId = undefined
              }
            }
          }, 1000)
        }
      } catch (error) {
        console.error("Error fetching payment:", error)
        setIsExpired(true) // Treat as expired if not found
        setLinkExpirationTime(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPayment()

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
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
      <div className="payment-summary-container min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-2xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="flex items-start gap-4">
            <span className="rounded-full bg-orange-100 p-3 text-orange-600">
              <AlertCircle className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Payment Link Expired</h2>
              <p className="mt-2 text-sm text-slate-600">
                This secure payment link is no longer active. To protect your information, we automatically expire links
                after a limited window. Request a refreshed link to continue with your enrollment.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
              <Clock className="mt-1 h-4 w-4 text-slate-400" />
              <div>
                <p className="font-medium text-slate-700">Link window closed</p>
                <p>
                  {formData.dueDate
                    ? `This link expired on ${formData.dueDate}.`
                    : "The secure link has exceeded the allowed time frame."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
              <RefreshCcw className="mt-1 h-4 w-4 text-slate-400" />
              <div>
                <p className="font-medium text-slate-700">Request a replacement</p>
                <p>Contact your FlashFire specialist or email our support team for a new link.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

  const expirationTime = linkExpirationTime

  return (
    <div className="payment-summary-container">
      <div className="app-scale-wrapper">
        <Header dueDate={formData.dueDate} timeRemaining={timeRemaining} />
        <div className="payment-content">
          <PaymentDetailsCard
            formData={formData}
            timeRemaining={timeRemaining}
            expirationTime={expirationTime}
          />
          <PaymentOptionsCard
            customPayPalLink={customPayPalLink}
            plan={formData.plan}
            handlePayNow={handlePayNow}
          />
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
