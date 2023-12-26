import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/SideBar'
import editSvg from'../../icons/edit.svg'
import userSvg from'../../icons/user.svg'
import bookSvg from'../../icons/book.svg'
import fitnessSvg from'../../icons/fitness.svg'
import infoSvg from'../../icons/info.svg'

function StudentHome() {
  
  const links=[
    {
        title:"View Hostel Details",
        to:"/student",
        icon: fitnessSvg,
    },
    {
        title:"Hostel Application",
        to:"/student/hostelapply",
        icon: editSvg,
    },
    {
        title:"Certificate",
        to:"/student/noninmatecertificate",
        icon: bookSvg,
    }
      
  ]
  return (
    <div className='flex w-full flex-row bg-primary min-h-screen h-full'>
        <div className='w-3/12'>
            <SideBar myLinks={links} myActiveIndex={0} myOpenedIndex={0}/>
        </div>
        <Outlet/>
    </div>
  )
}

export default StudentHome