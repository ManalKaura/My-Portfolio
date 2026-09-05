"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import SmoothScrollComponent from "@/components/ui/smooth-scroll";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";

// Vite-compatible Image wrapper for Next.js Image component
const Image = ({
  src,
  alt,
  className,
  draggable = false,
}: {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
  draggable?: boolean;
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    draggable={draggable}
    loading="lazy"
  />
);

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[200px] pt-[100px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2400&q=80"
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top w-full"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

export function ComponentDemo() {
  return <SmoothScrollComponent />;
}

export { ComponentDemo as DemoOne };

export function HandWrittenTitleDemo() {
  return <HandWrittenTitle title="Kokonut UI" subtitle="Optional subtitle" />;
}

