"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

type StackCategory = "All" | "Backend" | "Frontend" | "Extras"

type Technology = {
  name: string
  icon: string
  category: Exclude<StackCategory, "All">
}

const stack: Technology[] = [
  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg", category: "Backend" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Backend" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", category: "Backend" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Backend" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg", category: "Backend" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Backend" },

  // Frontend
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Frontend" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", category: "Frontend" },

  // Extras / Databases / Tools
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Backend" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Backend" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Backend" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Extras" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Extras" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", category: "Extras" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "Extras" },
]

export function MyStack() {
  const [activeCategory, setActiveCategory] = useState<StackCategory>("All")
  const { theme } = useTheme()

  const filteredStack = activeCategory === "All" ? stack : stack.filter((tech) => tech.category === activeCategory)

  return (
    <section id="my-stack" className="relative py-24 bg-background">
      <div className="container relative z-10 px-4 md:px-6">
        <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl text-foreground">
          Tech Stack
        </h2>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {(["All", "Backend", "Frontend", "Extras"] as StackCategory[]).map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={`
                rounded-full px-6 transition-all duration-300
                ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-[0_0_15px_-3px_hsl(var(--primary))]"
                    : "bg-background/50 border-white/10 hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-white/5"
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div 
            layout 
            className="flex flex-wrap gap-6 justify-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredStack.map((tech) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                key={tech.name}
                className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(20%-1rem)] min-w-[140px]"
              >
                <Card className="h-full backdrop-blur-md transition-colors bg-card/40 border-white/10 hover:bg-card/60 hover:border-primary/50 group">
                  <CardContent className="flex flex-col justify-center items-center p-6 h-full">
                    <div className="flex justify-center items-center p-2 mb-4 w-16 h-16 rounded-xl transition-transform duration-300 bg-background/50 group-hover:scale-110">
                      <img 
                        src={tech.icon} 
                        alt={tech.name} 
                        className={`w-full h-full object-contain ${
                            // Invert logos that might be hard to see in dark mode if needed, 
                            // though devicons are usually good. 
                            // Next.js and Github usually need inversion.
                            (tech.name === "Next.js" && theme === "dark") ? "invert" : ""
                        }`} 
                      />
                    </div>
                    <p className="text-lg font-medium text-center transition-colors text-foreground group-hover:text-primary">{tech.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{tech.category}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
