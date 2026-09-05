'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
    // Array of section data with high quality reliable Unsplash stock images
    const sections = [
        {
            id: 1,
            title: "Feature 1",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
            reverse: false
        },
        {
            id: 2,
            title: "Feature 2",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
            reverse: true
        },
        {
            id: 3,
            title: "Feature 3",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab maxime sequi, pariatur illum, adipisci ullam optio quod tempora necessitatibus consectetur eaque deleniti id totam possimus unde dolorum inventore incidunt. Ea.",
            imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
            reverse: false
        }
    ]

    // Create refs and animations for each section
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const sectionRefs = [ref1, ref2, ref3];
    
    const scrollProgress1 = useScroll({
        target: ref1,
        offset: ["start end", "center start"]
    }).scrollYProgress;

    const scrollProgress2 = useScroll({
        target: ref2,
        offset: ["start end", "center start"]
    }).scrollYProgress;

    const scrollProgress3 = useScroll({
        target: ref3,
        offset: ["start end", "center start"]
    }).scrollYProgress;

    const scrollYProgress = [scrollProgress1, scrollProgress2, scrollProgress3];

    // Create animations for each section
    const opacityContents = [
        useTransform(scrollProgress1, [0, 0.7], [0, 1]),
        useTransform(scrollProgress2, [0, 0.7], [0, 1]),
        useTransform(scrollProgress3, [0, 0.7], [0, 1]),
    ];
    
    const clipProgresses = [
        useTransform(scrollProgress1, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]),
        useTransform(scrollProgress2, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]),
        useTransform(scrollProgress3, [0, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]),
    ];
    
    const translateContents = [
        useTransform(scrollProgress1, [0, 1], [-50, 0]),
        useTransform(scrollProgress2, [0, 1], [-50, 0]),
        useTransform(scrollProgress3, [0, 1], [-50, 0]),
    ];

  return (
    <div className={cn("bg-slate-950 text-white min-h-screen")}>
      <div className='min-h-screen w-screen flex flex-col items-center justify-center'>
        <h1 className='text-6xl max-w-2xl text-center font-bold tracking-tight'>PARALLAX SCROLL FEATURE SECTION</h1>
        <p className='mt-20 flex items-center gap-1.5 text-sm text-slate-400 animate-bounce'>SCROLL <ArrowDown size={15} /></p>
      </div>
      {/* <ScrollSection /> */}
       <div className="flex flex-col md:px-0 px-10">
            {sections.map((section, index) => (
                <div 
                    key={section.id}
                    ref={sectionRefs[index]} 
                    className={`h-screen flex items-center justify-center md:gap-40 gap-20 ${section.reverse ? 'flex-row-reverse' : ''}`}
                >
                    <motion.div style={{ y: translateContents[index] }}>
                        <div className="text-6xl max-w-sm font-semibold">{section.title}</div>
                        <motion.p 
                            style={{ y: translateContents[index] }} 
                            className="text-white/70 max-w-sm mt-10 leading-relaxed"
                        >
                            {section.description}
                        </motion.p>
                    </motion.div>
                    <motion.div 
                        style={{ 
                            opacity: opacityContents[index],
                            clipPath: clipProgresses[index],
                        }}
                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                        <img 
                            src={section.imageUrl} 
                            className="size-80 object-cover" 
                            alt={`Section ${section.id}` }
                        />
                    </motion.div>
                </div>
            ))}
        </div>
      <div>

      </div>
       <div className='min-h-screen w-screen flex flex-col items-center justify-center'>
        <h1 className='text-8xl font-bold tracking-tighter'>The End</h1>
      </div>
    </div>
  );
};
export default Component;
