const transition = {duration: 1, ease: [0.76, 0, 0.24, 1]}

export const height = {
    initial: {
    height: 0
    },
    enter: {
    height: "100dvh",
    transition
    },
    exit: {
    height: 0,
    transition
    }
}

export const blur = {
    initial: {
        scale: 0.9
    },
    open: {
        scale: 0.8,
        transition: {duration: 0.3}
    },
    closed: {
        scale: 0.9,
        transition: {duration: 0.3}

    }
}

export const translate = {
    initial: {
        y: "100%",
        opacity: 0
    },
    enter: (i: any) => ({
        y: 0,
        opacity: 1,
        transition: {duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0]}
    }),
    exit: (i: any) => ({
        y: "100%",
        opacity: 0,
        transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1]}
    })
}