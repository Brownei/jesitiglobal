import { Variants } from "framer-motion";

export const cardVariants: Variants = {
    offscreen: {
      y: 300
    },
    onscreen: {
      y: 50,
      transition: {
        type: "ease",
      }
    }
  };