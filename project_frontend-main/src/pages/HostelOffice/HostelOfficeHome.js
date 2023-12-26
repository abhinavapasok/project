import { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'


function HostelOfficeHome() {

  const [role, setRole]=useOutletContext()
  useEffect(() => {
    setRole("hosteloffice")
  }, [])
  
  return (
    <div className='flex w-full flex-row bg-primary h-screen'>
        <Outlet/>
    </div>
  )
}

export default HostelOfficeHome