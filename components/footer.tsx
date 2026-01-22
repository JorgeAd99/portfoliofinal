import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { LinkPreview } from "@/components/ui/link-preview"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="py-8 border-t backdrop-blur-lg border-white/10 bg-black/20">
      <div className="container flex flex-col gap-6 justify-between items-center md:flex-row">
        <p className="text-sm text-center text-muted-foreground md:text-left">
          © {new Date().getFullYear()} JadoDev. All rights reserved.
        </p>

        <div className="flex gap-4 items-center">
          {[
            { icon: Github, href: "https://github.com/jadodev", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/jorge-enrique-adorno-296151210/", label: "LinkedIn" },
            { icon: Twitter, href: "https://twitter.com/jadodev", label: "Twitter" },
            { icon: Mail, href: "mailto:jorgeenriqueadorno@gmail.com", label: "Email" },
          ].map((social, idx) => (
             <LinkPreview key={idx} url={social.href} className="transition-colors text-muted-foreground hover:text-primary">
                <Button variant="ghost" size="icon" className="rounded-full transition-all text-muted-foreground hover:text-primary hover:bg-primary/10">
                    <social.icon className="w-5 h-5" />
                    <span className="sr-only">{social.label}</span>
                </Button>
            </LinkPreview>
          ))}
        </div>
      </div>
    </footer>
  )
}
