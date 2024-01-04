import LoginForm from '@/components/LoginForm'
import getOwnerSession from '@/actions/queries/get-current-user';
import { redirect } from 'next/navigation';


export default async function LoginPage() {
  // const owner = await getOwnerSession()

  // if(owner && owner.role === 'OWNER') {
  //   redirect('/admin-dashboard/overview')
  // } else if(owner && owner.role === 'CLIENT') {
  //   redirect('/')
  // } else if (owner && owner.role === 'EMPLOYEE' && owner.hasAccess === true) {
  //   redirect('/admin-dashboard/overview')
  // } else if (owner && owner.role === 'EMPLOYEE' && owner.hasAccess === false) {
  //   redirect('/')
  // }

  return (
    <main>
      <LoginForm />
    </main>
  )
}
