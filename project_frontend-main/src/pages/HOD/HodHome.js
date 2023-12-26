import React, { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

function HodHome() {

  const [role, setRole]=useOutletContext()
  useEffect(() => {
    setRole("hod")
  }, [])
  
  return (
    <div className='flex w-full flex-row bg-primary min-h-screen h-full'>
        {/* <div className='w-3/12'>
            <SideBar myLinks={links} myActiveIndex={0} myOpenedIndex={0}/>
        </div> */}
        <Outlet/>
    </div>
  )
}

export default HodHome;