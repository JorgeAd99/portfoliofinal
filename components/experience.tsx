"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Public Security Institute",
    period: "2023 - Present",
    description: "Developing critical internal applications using modern stack.",
    tags: ["NestJS", "React", "Python", "SQL"],
    details: [
      "Architected and maintained internal web platforms serving hundreds of users.",
      "Optimized administrative workflows reducing processing time by 40%.",
      "implemented automated data pipelines with Python.",
    ],
  },
  {
    title: "Co-founder & Tech Lead",
    company: "Mazzo Developments",
    period: "2023 - Present",
    description: "delivering bespoke software solutions for diverse clients.",
    tags: ["Next.js", "NestJS", "Cloud Architecture"],
    details: [
      "Leading technical strategy and development for client projects.",
      "Delivering scalable SaaS solutions and custom web applications.",
      "Managing project lifecycles from conception to deployment.",
    ],
  },
  {
    title: "Freelance Developer",
    company: "Self-employed",
    period: "2019 - 2022",
    description: "Web development for small businesses and personal brands.",
    tags: ["Web Design", "CMS", "Frontend"],
    details: [
      "Built responsive, accessible websites for local businesses.",
      "Integrated e-commerce solutions and custom functionalities.",
      "Provided ongoing maintenance and performance optimization.",
    ],
  },
]

export function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-background">
       {/* Subtle Grid Background */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground mb-4">
            Professional Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A timeline of my growth and contributions in the tech industry.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300 h-full hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                        {exp.period}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {exp.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground font-medium text-base">
                    {exp.company}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20">
                            {tag}
                        </span>
                    ))}
                  </div>

                  <ul className="space-y-2">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start">
                        <span className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
