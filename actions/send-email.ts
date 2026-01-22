"use server"

import { Resend } from "resend"

// Initialize Resend with proper error handling
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set")
  }

  return new Resend(apiKey)
}

export type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate form data
    if (!firstName || !lastName || !email || !subject || !message) {
      return {
        success: false,
        message: "Please fill in all fields",
      }
    }

    if (!email.includes("@")) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Initialize Resend client
    let resend
    try {
      resend = getResendClient()
    } catch (error) {
      console.error("Error initializing Resend client:", error)
      return {
        success: false,
        message: "Email service configuration error. Please contact the administrator.",
      }
    }

    // Log for debugging
    console.log("Attempting to send email with Resend...")

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "jorgeenriqueadorno@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      reply_to: email,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    })

    if (error) {
      console.error("Detailed Resend error:", JSON.stringify(error, null, 2))
      return {
        success: false,
        message: `Failed to send email: ${error.message || "Unknown error"}`,
      }
    }

    console.log("Email sent successfully:", data)
    return {
      success: true,
      message: "Your message has been sent successfully!",
    }
  } catch (error) {
    console.error("Unexpected error in sendContactEmail:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}

