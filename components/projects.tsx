"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from 'lucide-react'
import { LinkPreview } from "@/components/ui/link-preview"
import { motion } from "framer-motion"

export function Projects() {
  const projects = [
    {
      title: "Team Tasker App",
      description: "Full-stack task management application with real-time collaboration features.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QvXNgcigjRihlzWphQ4PnMPa5sqCxT.png",
      tags: ["React", "Node.js", "MongoDB", "NestJS"],
      demoUrl: "https://teamtasker.mazzodevelopments.com",
      githubUrl: "https://github.com/TeamTaskerUB",
      demoPreviewImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OtMxcvr8wP6UPNmIxWnRBqYjCr7ubn.png",
    },
    {
      title: "Public Security Education Platform",
      description: "Advanced PDF summarization and educational tool for police officers.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-03-12%20a%20la%28s%29%2012.29.52%E2%80%AFp.%C2%A0m.-gP2pixIT8lx9XArSj251F7Fo15PvcF.png",
      tags: ["Next.js", "Python", "Flask", "AI"],
      demoUrl: null,
      githubUrl: null,
      demoPreviewImage: null
    }
  ]

  return (
    <section id="projects" className="relative py-24 bg-background">
       {/* Decorative blob needs to be subtle/dark in our theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center items-center mb-16 space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                Featured Work
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
                A selection of projects that showcase my technical depth and product thinking.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mx-auto max-w-6xl md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
            >
                <Card className="h-full bg-card/60 backdrop-blur-md border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)] flex flex-col overflow-hidden group">
                <div className="overflow-hidden relative aspect-video">
                    <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="flex absolute inset-0 gap-4 justify-center items-center opacity-0 transition-opacity duration-300 bg-black/50 group-hover:opacity-100">
                        {/* Overlay Buttons for quick access if preferred, currently reusing footer */}
                    </div>
                </div>

                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground">{project.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        {project.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="border-transparent bg-secondary/10 text-secondary hover:bg-secondary/20">
                            {tag}
                        </Badge>
                    ))}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-3">
                        {project.githubUrl && (
                        <LinkPreview url={project.githubUrl} width={300} height={200}>
                            <Button variant="outline" size="sm" className="transition-colors border-white/10 hover:bg-white/5 hover:text-primary">
                                <Github className="mr-2 w-4 h-4" />
                                Code
                            </Button>
                        </LinkPreview>
                        )}
                        {project.demoUrl && (
                        <LinkPreview url={project.demoUrl} width={300} height={200} isStatic={!!project.demoPreviewImage} imageSrc={project.demoPreviewImage || ""}>
                            <Button size="sm" className="text-white bg-primary hover:bg-primary/90">
                                <ExternalLink className="mr-2 w-4 h-4" />
                                Live Demo
                            </Button>
                        </LinkPreview>
                        )}
                    </div>
                </CardFooter>
                </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}