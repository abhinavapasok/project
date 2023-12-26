import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/SideBar'
import editSvg from'../../icons/edit.svg'
import userSvg from'../../icons/user.svg'
import bookSvg from'../../icons/book.svg'
import fitnessSvg from'../../icons/fitness.svg'

function MatronHome() {
  const links=[
      {
          title:"Inmate List",
          to:"messbill",
          icon: editSvg,
      },
      {
          title:"Mess out List",
          to:"messoutlist",
          icon: bookSvg,
      },
      {
        title:"Mess Expense List",
        to:"mess-expense-list",
        icon: fitnessSvg,
    },
    {
        title:"Suppliers List",
        to:"uploadmessbill",
        icon: fitnessSvg,
    },
      {
          title:"Upload mess bill",
          to:"uploadmessbill",
          icon: fitnessSvg,
      },
    //   {
    //     title:"Roles",
    //     icon:userSvg,
    //     subLinkOpen:true,
    //     subLinks:[
    //         {
    //             title:"Mess Secretary",
    //             to:"messsec",
    //             icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    //                         <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    //                     </svg>,
    //         },
    //         {
    //             title:"Mess Director",
    //             to:"messdirector",
    //             icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    //                         <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    //                     </svg>,
    //         }
    //     ]
    // },
  ]
  return (
    <div className='flex w-full flex-row bg-primary h-screen'>
        <div className='w-3/12'>
            <SideBar myLinks={links} myActiveIndex={0} myOpenedIndex={0}/>
        </div>
        <Outlet/>
    </div>
  )
}

export default MatronHome