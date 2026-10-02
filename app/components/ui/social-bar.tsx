"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "../../data/constants";
import {
  GmailIcon,
  LinkedinIcon,
  DiscordIcon,
  GithubIcon,
  HackerRankIcon,
  LeetCodeIcon,
  MediumIcon,
  ResumeIcon,
} from "./icons";

export function SocialBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // If contact section is intersecting, we hide the fixed social bar
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        // Trigger earlier when contact section is about to enter
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(contactSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const socialLinks = [
    { href: `mailto:${CONTACT.email}`, label: "Email", icon: GmailIcon },
    { href: CONTACT.linkedin, label: "LinkedIn", icon: LinkedinIcon, external: true },
    { href: CONTACT.github, label: "GitHub", icon: GithubIcon, external: true },
    { href: CONTACT.discord, label: "Discord", icon: DiscordIcon, external: true },
    { href: CONTACT.hackerrank, label: "HackerRank", icon: HackerRankIcon, external: true },
    { href: CONTACT.leetcode, label: "LeetCode", icon: LeetCodeIcon, external: true },
    { href: CONTACT.medium, label: "Medium", icon: MediumIcon, external: true },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-canvas-raised/90 backdrop-blur-sm border border-edge rounded-full px-6 py-3"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-ink-dim hover:text-accent transition-colors"
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={link.label}
              title={link.label}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
          
          <div className="w-[1px] h-5 bg-edge mx-2"></div>
          
          <a
            href={CONTACT.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ink-dim hover:text-accent transition-colors whitespace-nowrap font-mono text-sm"
          >
            <ResumeIcon className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
