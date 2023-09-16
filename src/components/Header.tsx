// @ref: https://github.com/olivierlarose/curved-menu/tree/main

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const slide = {
  initial: { x: 80 },
  enter: (i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};

const Curve = () => {
  const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${
    window.innerHeight / 2
  } 100 0`;
  const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${
    window.innerHeight / 2
  } 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className="absolute -left-[99px] top-0 h-full w-full fill-neutral-900 stroke-none">
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      ></motion.path>
    </svg>
  );
};

const Navigation = () => {
  const [selected, setSelected] = useState("");

  return (
    // menu
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed right-0 top-0 h-[100dvh] bg-neutral-800 text-white"
    >
      {/* body */}
      <div className="flex h-full flex-col justify-between p-[100px]">
        <nav className="mt-20 flex flex-col gap-3 text-6xl">
          {/* header */}
          <header className="mb-10 border-b-[1px] border-b-neutral-400 text-xs uppercase text-neutral-400">
            <p>Navigation</p>
          </header>
          {/*  */}
          <ul>
            {navItems.map((item, idx) => (
              // link
              <motion.li
                onMouseEnter={() => {
                  setSelected(item.title);
                }}
                custom={idx}
                variants={slide}
                initial="initial"
                animate="enter"
                exit="exit"
                className="relative flex items-center font-light text-white"
                key={item.title}
              >
                <motion.div
                  variants={scale}
                  animate={selected === item.title ? "open" : "closed"}
                  className="absolute -left-8 h-3 w-3 rounded-[50%] bg-white"
                ></motion.div>

                {item.title}
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="flex w-full justify-between gap-10 text-xs text-white">
          {["Awwwards", "Instagram", "Dribble", "Linkedin"].map((social) => (
            <span key={social}>{social}</span>
          ))}
        </div>
      </div>
      <Curve />
    </motion.div>
  );
};

export const Header = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsActive(!isActive)}
        className="pointer fixed right-0 z-10 m-5 flex h-20 w-20 items-center justify-center rounded-[50%] bg-blue-600"
      >
        <div
          className={`
            w-full 
            before:relative before:-top-1 before:m-auto before:block before:h-[2px] before:w-[50%] before:bg-white before:transition-all 
            before:duration-300 before:content-[""] after:relative after:top-1 after:m-auto after:block after:h-[2px] after:w-[50%]
            after:bg-white after:transition-all after:duration-300 after:content-[""]
            ${
              isActive
                ? "before:top-[5px] before:-rotate-45 after:-top-[5px] after:rotate-45"
                : ""
            }
          `}
        ></div>
      </button>
      <AnimatePresence mode="wait">
        {isActive && <Navigation />}
      </AnimatePresence>
    </>
  );
};

export default Header;
