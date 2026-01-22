"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Loader2, FileText, Send } from "lucide-react"
import { sendContactEmail } from "@/actions/send-email"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await sendContactEmail(formData)
      if (result.success) {
        toast.success("Message sent!", { description: result.message })
        const form = document.getElementById("contact-form") as HTMLFormElement
        form.reset()
      } else {
        toast.error("Error", { description: result.message })
      }
    } catch (error) {
      toast.error("Error", { description: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
        {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />

      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Let's Collaborate
          </h2>
          <p className="max-w-[800px] mx-auto text-muted-foreground text-lg">
            Have an innovative idea or looking for a dedicated developer? 
            I'm always open to discussing new projects and opportunities.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Info Card */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Card className="h-full bg-card/60 backdrop-blur-md border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 bg-gradient-to-b from-primary to-secondary h-full" />
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Details</CardTitle>
                        <CardDescription className="text-base text-muted-foreground">
                            Reach me directly via these channels.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 mt-4">
                        {[
                            { icon: MapPin, text: "Buenos Aires, Argentina", href: "#" },
                            { icon: Mail, text: "jorgeenriqueadorno@gmail.com", href: "mailto:jorgeenriqueadorno@gmail.com" },
                            { icon: Phone, text: "+54 9 11 2513-0914", href: "tel:+5491125130914" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-5 group">
                                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <a href={item.href} className="text-lg font-medium hover:text-primary transition-colors">
                                        {item.text}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 hover:border-secondary transition-all" asChild>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <FileText className="mr-2 h-5 w-5" />
                                Download Resume
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Card className="bg-card/60 backdrop-blur-md border-white/10 h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Send a Message</CardTitle>
                        <CardDescription className="text-base">
                            I usually respond within 24 hours.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="contact-form" action={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Input id="firstName" name="firstName" placeholder="First Name" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                                </div>
                                <div className="space-y-2">
                                    <Input id="lastName" name="lastName" placeholder="Last Name" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Input id="email" name="email" type="email" placeholder="Email" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                            </div>
                            <div className="space-y-2">
                                <Input id="subject" name="subject" placeholder="Subject" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                            </div>
                            <div className="space-y-2">
                                <Textarea id="message" name="message" placeholder="Your Message..." required className="min-h-[150px] bg-background/50 border-white/10 focus:border-primary/50 resize-none" />
                            </div>
                            
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
      </div>
    </section>
  )
}
