import { DockNav } from "@/components/dock-nav"
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { MyStack } from "@/components/my-stack"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DockNav />
      <main>
        <Hero />
        <Experience />
        <MyStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

