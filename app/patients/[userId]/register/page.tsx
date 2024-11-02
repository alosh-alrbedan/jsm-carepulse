import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const register = async ({params : {userId}}: SearchParamProps) => {

    // const user = await getUser(userId);
    // console.log(user?.$id);
  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container">
      <div className="sub-container max-w-[860px] flex-1 py-10 flex-col">
        <Image
          src={`/assets/icons/logo-full.svg`}
          width={1000}
          height={1000}
          alt="patient"
          className="mb-12 h-10 w-fit"
        />
        <RegisterForm userId={userId}/>
       
          <p className="copyright py-12">
            {" "}
            &copy; 2024 CarePulse{" "}
          </p>
      
      
      </div>
    </section>
    <Image
      src={`/assets/images/register-img.png`}
      width={1000}
      height={1000}
      alt="patient"
      className="side-img max-w-[390px]"
      />
  </div>
  )
}

export default register