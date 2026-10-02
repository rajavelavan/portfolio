"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "cover", title: "Cover", subtitle: "" },
  { id: "foundation", title: "The Foundation", subtitle: "Full-stack philosophy" },
  { id: "workbench", title: "The Workbench", subtitle: "Personal builds" },
  { id: "systems", title: "The Systems", subtitle: "Deep dives" },
  { id: "experience", title: "Professional Experience", subtitle: "Organization work" },
  { id: "cloud", title: "The Cloud", subtitle: "Infrastructure & CI/CD" },
  { id: "next-layer", title: "The Next Layer", subtitle: "AI engineering" },
  { id: "notebook", title: "Engineering Notebook", subtitle: "Learning notes" },
  { id: "contact", title: "Contact", subtitle: "Let's talk" }
];

export function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    const timer = setTimeout(() => {
      setMounted(true);
      handleResize();
    }, 0);

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 -translate-y-1/2 left-0 z-50 p-2 bg-canvas-raised border border-edge rounded-r-lg text-ink hover:text-accent transition-colors shadow-lg shadow-black/20"
        aria-label={isOpen ? "Close notebook index" : "Open notebook index"}
        style={{ transform: isOpen ? 'translateX(220px) translateY(-50%)' : 'translateY(-50%)', transition: 'transform 0.3s ease-in-out' }}
      >
        ✎
      </button>

      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="fixed top-0 left-0 h-full w-[220px] bg-canvas/95 backdrop-blur-sm border-r border-edge z-40 flex flex-col justify-center shadow-2xl md:shadow-none"
        aria-label="Table of contents"
      >
        <div className="flex flex-col py-8 overflow-y-auto h-full justify-center">
          <ul className="space-y-4 px-6">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleClick(item.id)}
                    className={`w-full text-left group flex flex-col items-start transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-ink hover:text-accent-warm"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-ink-dim/50 group-hover:text-ink-dim transition-colors">
                        {String(index).padStart(2, '0')}
                      </span>
                      <span className="font-hand text-xl leading-none">{item.title}</span>
                    </div>
                    {item.subtitle && (
                      <span className={`font-mono text-xs pl-6 mt-1 transition-colors duration-200 ${
                        isActive ? "text-accent/80" : "text-ink-dim group-hover:text-ink-dim/80"
                      }`}
                      >
                        {item.subtitle}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
