"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMouse } from "@/hooks/useMouse.ts";

const maskBodyClasses =
  "w-full h-full flex items-center justify-center text-[#afa18f] text-8xl";

export default function MaskedCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [{ x, y }, ref] = useMouse();
  const size = isHovered ? 400 : 40;

  return (
    <main className="h-[100vh]">
      <motion.div
        ref={ref as any}
        className={`${maskBodyClasses} absolute bg-orange-600 text-black [mask-image:url('/mask.svg')] [mask-repeat:no-repeat] [mask-size:40px]`}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          className="w-[1000px] p-10"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          A visual designer - with skills that haven't been replaced by A.I
          (yet) - making good shit only if the paycheck is equally good.
        </p>
      </motion.div>

      <div className={maskBodyClasses}>
        <p className="w-[1000px] p-10">
          I'm a <span className="text-orange-600">selectively skilled</span>{" "}
          product designer with strong focus on producing high quality &
          impactful digital experience.
        </p>
      </div>
    </main>
  );
}
