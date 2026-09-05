"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

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
    <div className="flex flex-col overflow-hidden pb-[100px] pt-[50px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
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
