import { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'


function WardenHome() {

  const [role, setRole]=useOutletContext()
  useEffect(() => {
    setRole("warden")
  }, [])
  
  return (
    <div className='flex w-full flex-row bg-primary h-screen'>
        <Outlet/>
    </div>
  )
}

export default WardenHome