import React, { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

function AdminHome() {

  const [role, setRole]=useOutletContext()
  useEffect(() => {
    setRole("admin")
  }, [])

  return (
    <div className='flex w-full flex-row bg-primary h-screen'>
        {/* <div className='w-3/12 '>
            <SideBar myLinks={links} myActiveIndex={0} myOpenedIndex={0}/>
        </div> */}
        <Outlet/>
    </div>
  )
}

export default AdminHome