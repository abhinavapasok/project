import { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'


function ClerkHome() {

  const [role, setRole]=useOutletContext()
  useEffect(() => {
    setRole("Clerk")
  }, [])
  
  return (
    <div className='flex w-full flex-row bg-primary h-screen'>
        <Outlet/>
    </div>
  )
}

export default ClerkHome