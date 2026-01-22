"use client";

import * as React from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Home,
  Briefcase,
  Layers,
  FolderGit2,
  Mail,
  FileText,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { smoothScroll } from "@/utils/smoothScroll";
import { cn } from "@/lib/utils";

export function DockNav() {
  const mouseX = useMotionValue(Infinity);
  const [activeSection, setActiveSection] = React.useState<string>("");

  const navItems = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Stack", href: "#my-stack", icon: Layers },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => {
          // Special case for home (top of page)
          if (item.href === "#hero" || item.href === "#") {
              return { id: "hero", offset: 0 };
          }
          return { id: item.href.replace("#", ""), offset: 0 };
      });
      
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Offset to trigger a bit later
      
      // Default to first section (hero) if near top
      if (window.scrollY < 100) {
          setActiveSection("hero");
          return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          // Check if scroll position is within the section
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sections[i].id);
            break; 
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex fixed bottom-8 left-1/2 z-50 gap-4 items-center px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md -translate-x-1/2 border-white/10 bg-black/40"
    >
      {navItems.map((item) => (
        <DockIcon
          key={item.name}
          mouseX={mouseX}
          href={item.href}
          icon={item.icon}
          label={item.name}
          isActive={activeSection === item.href.replace("#", "") || (activeSection === "hero" && (item.href === "#" || item.href === "#hero")) }
        />
      ))}
      <div className="h-8 w-[1px] bg-white/10" />

      <DockAction mouseX={mouseX}>
        <ThemeToggle />
      </DockAction>

      <DockAction mouseX={mouseX}>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            className="p-0 w-10 h-10 rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            <FileText className="w-5 h-5" />
          </Button>
        </a>
      </DockAction>
    </div>
  );
}

function DockIcon({
  mouseX,
  icon: Icon,
  href,
  label,
  isActive,
}: {
  mouseX: MotionValue;
  icon: any;
  href: string;
  label: string;
  isActive: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    smoothScroll(href);
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex relative justify-center items-center rounded-full border transition-colors aspect-square group",
        isActive 
          ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_-3px_hsl(var(--primary))]" 
          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20"
      )}
    >
      <a
        href={href}
        onClick={handleScroll}
        className="flex justify-center items-center w-full h-full"
      >
        <Icon className={cn(
            "w-5 h-5 transition-colors",
            isActive ? "text-primary" : "text-white/80 group-hover:text-white"
        )} />
      </a>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
      {isActive && (
          <span className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_hsl(var(--primary))]" />
      )}
    </motion.div>
  );
}

function DockAction({
  mouseX,
  children,
}: {
  mouseX: MotionValue;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Smaller scaling for actions since they are just buttons, not the main nav
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex justify-center items-center aspect-square"
    >
      {children}
    </motion.div>
  );
}
