import editSvg from'../../icons/edit.svg'
import userSvg from'../../icons/user.svg'
import bookSvg from'../../icons/book.svg'
import fitnessSvg from'../../icons/fitness.svg'

const adminLinks=[
    {
        title:"Users",
        to:null,
        icon:userSvg,
        subLinkOpen:true,
        subLinkActiveIndex:0,
        subLinks:[
            {
                title:"Inmate",
                to:"admin/inmates",
                icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>,
            },
            {
                title:"Non Inmate",
                to:"admin/noninmates",
                icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>,
            },
            {
                title:"Faculty",
                to:"admin/faculty",
                icon:   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>,
            }
        ]
    },
    {
        title:"Hostel Registry",
        to:"admin/hostelregistry",
        icon: editSvg,
    },
    {
      title:"Create/Edit Application",
      to:"admin/createapplication",
      icon: editSvg,
    },
    {
        title:"Application Paths",
        to:"admin/applicationpaths",
        icon: fitnessSvg,
    },
    {
        title:"Allotment Rules",
        to:"admin/allotmentrule",
        icon: bookSvg,
    },
    {
      title:"Hostel Blocks",
      to:"admin/hostelblocks",
      icon: editSvg,
    },
    {
      title:"Seat Matrix",
      to:"admin/seatmatrix",
      icon: editSvg,
    }
]

export {adminLinks}