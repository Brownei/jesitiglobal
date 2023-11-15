"use client"
import { FC, ReactNode, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Lenis from '@studio-freight/lenis'
import { Toaster } from 'sonner'

type ClientProviderProps = {
  children: ReactNode
}

const ClientProvider: FC<ClientProviderProps> = ({children}) => {
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
    <main>
      <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="bottom-right" richColors/>
          <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
  )
}

export default ClientProvider;