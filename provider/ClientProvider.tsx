"use client"
import { FC, ReactNode, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Lenis from '@studio-freight/lenis'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'

type ClientProviderProps = {
  children: ReactNode
}

const ClientProvider: FC<ClientProviderProps> = ({children}) => {
  const pathname = usePathname()
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {queries: {staleTime: 1000 * 60 * 5, cacheTime: 1000 * 60 * 20}}
  }))

  //SCROLL-TRIGGER AND SMOOTH SCROLL INTEGRATION
  const lenis = new Lenis()
  lenis.on('scroll', (e: any) => {
    
  })
      
  function raf(time: any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
      
  requestAnimationFrame(raf)

  return (
    <AnimatePresence mode='wait'>
      <motion.main
      key={pathname}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
      >
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </motion.main>
    </AnimatePresence>
  )
}

export default ClientProvider;