import React, { useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import SideBar from '../../components/SideBar'
import editSvg from'../../icons/edit.svg'
import userSvg from'../../icons/user.svg'
import bookSvg from'../../icons/book.svg'
import fitnessSvg from'../../icons/fitness.svg'

function AdvisorHome() {
  const links=[
    {
        title:"Students Details",
        to:"studentsdetails",
        icon: fitnessSvg,
    },
    {
        title:"Signup Invite",
        to:"signupinvite",
        icon: editSvg,
    },
    {
        title:"Signup Invite",
        to:"signupinvite",
        icon: editSvg,
    },
    {
      title:"Faculty Roles",
      to:"",
      icon:userSvg,
      subLinkOpen:false,
      // subLinkActiveIndex:0,
      subLinks:[
          // {
          //     title:"Staff Advisor",
          //     to:"/staffadvisor/sa",
          //     icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          //                 <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          //             </svg>,
          // },
          {
              title:"HOD",
              to:"/staffadvisor/hod",
              icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>,
          },
          {
              title:"Warden",
              to:"/staffadvisor/warden",
              icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>,
          }
      ]
    }
    
  ]

  const [role, setRole]=useOutletContext()
  useEffect(() => {
    setRole("staff advisor")
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

export default AdvisorHome;