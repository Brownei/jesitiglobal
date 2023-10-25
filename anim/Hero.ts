// const transition = {
//     duration: 1,
//     ease: [0.76, 0, 0.24, 1]
// }

// export const slideUp = {
//     initial: {
//         height: 0
//     },
//     enter: {
//         height: '100dvh',
//         transition
//     },
//     exit: {
//         height: 0,
//         transition
//     }
// }


export const container = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
export const item = {
    hidden: { y: "150%" },
    visible: {
      y: 0,
      transition: {
        ease: [0.76, 0, 0.24, 1],
        duration: 1
      }
    }
};