"use client"
import Admin from '@/components/Admin'
import { useCurrentUsereStore } from '@/hooks/useUser'
import Image from "next/image"

const Dashboard = () => {
    const {currentUser} = useCurrentUsereStore()
    if(currentUser!.role === 'OWNER') {
        return (
            <Admin session={currentUser!}/>
        )
    }

    if(currentUser!.role === 'EMPLOYEE') {
        return (
            <>
                <h1 className='text-lg font-extrabold'>YOU USE STYLE ESCAPE BUT WELCOME!</h1>
                <p>You manage dey work for Oga!</p>
                <Image src={currentUser!.image} width={100} height={100} alt='Profile' priority/>
            </>
        )
    }
    
  return (
    <div>
        <h1 className='text-lg font-extrabold'>YOU ARE NOT AN OWNER SO FUVK OFF!</h1>
        <p>Come back when you are a big boy</p>
        <Image src={currentUser!.image} width={100} height={100} alt='Profile' priority/>
    </div>
  )
}

export default Dashboard;