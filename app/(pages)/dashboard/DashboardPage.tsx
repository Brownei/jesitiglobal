"use client"
import { useUser } from '@/actions/get-current-user';
import Admin from '@/components/Admin'
import { useUserStore } from '@/hooks/useUser'
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
    const {refresh} = useRouter()
    // const {currentUser, onChange, onRemove} = useUserStore();
    const { data: currentUser, isError } = useUser()

    if(isError || !currentUser) {
        refresh()
    }

    if(currentUser?.role === 'OWNER') {
        return (
            <Admin session={currentUser!}/>
        )
    }

    if(currentUser?.role === 'EMPLOYEE') {
        return (
            <>
                <h1 className='text-lg font-extrabold'>YOU USE STYLE ESCAPE BUT WELCOME!</h1>
                <p>You manage dey work for Oga!</p>
                <p>Full Name: {currentUser?.firstName} {currentUser?.lastName}</p>
            </>
        )
    }
    
  return (
    <div>
        <h1 className='text-lg font-extrabold'>YOU ARE NOT AN OWNER SO FUVK OFF!</h1>
        <p>Come back when you are a big boy</p>
        <p>Full Name: {currentUser?.firstName} {currentUser?.lastName}</p>
    </div>
  )
}

export default DashboardPage;