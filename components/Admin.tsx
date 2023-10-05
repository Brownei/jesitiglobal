import { FC } from "react"
import Image from "next/image"
import { Session } from "next-auth"
import { User } from "@/hooks/useUser"

type AdminProps = {
    session: User
}

const Admin: FC<AdminProps> = ({session}) => {
  return (
    <>
        <h1 className="text-lg font-extrabold">{session.firstName} {session.lastName}</h1>
        <p>Welcome to the land of enterpeneurs!</p>
        <Image src={session.image!} alt="Profile" width={100} height={100} priority/>
    </>
  )
}

export default Admin