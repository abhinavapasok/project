import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import editSvg from'../icons/edit.svg'
import userSvg from'../icons/user.svg'
import bookSvg from'../icons/book.svg'
import fitnessSvg from'../icons/fitness.svg'
import { adminLinks } from './Admin/AdminLinks'
import { saLinks } from './StaffAdvisor/StaffAdvisorLinks'
import { createBrowserHistory } from 'history'
import { wardenLinks } from './Warden/WardenLinks'
import { hostelOfficeLinks } from './HostelOffice/HostelOfficeLinks'
import { hodLinks } from './HOD/HODLinks'
import { sergeantLinks } from './Sergeant/SergeantLinks'
import { UserContext } from '../Contexts/UserContext'
import { matronLinks } from './Matron/MatronLinks'
import { ClerkLinks } from './Clerk/ClerkLinks'
// import { studentLinks } from './Student/StudentLinks'

function CommonHome() {
  
    const {user} =useContext(UserContext)
    const [links, setLinks] = useState([])
    const [role, setRole] = useState(user.roles[0]) //index of the role selected in the user.roles array
    const [activeLinkTo, setActiveLinkTo] = useState("")
    // useEffect(() => {
    //     if(localStorage.getItem('role')==null){
    //         setRole(0)
    //         localStorage.setItem('role','0')
    //     }
    //     else{
    //         var localRole=parseInt(localStorage.getItem('role'))
    //         setRole(localRole)
    //     }

        
    // }, [])
    // user.roles=["admin", "staff advisor", "warden", "hosteloffice", "hod"]
    useEffect(() => {
        // if(user.roles[role]==="admin")
        // {
        //     // setRoleTo("admin")
        //     console.log("new links : ",adminLinks)
        //     setLinks(adminLinks.map(item=>({...item})))
        // }
        // else if(user.roles[role]==="staff advisor")
        // {
        //     // setRoleTo("staffadvisor")
        //     console.log("new links : ",saLinks)
        //     setLinks(saLinks.map(item=>({...item})))
        // }
        
        // else if(user.roles[role]==="hod")
        // {
        //     // setRoleTo("staffadvisor")
        //     console.log("new links : ",hodLinks)
        //     setLinks(hodLinks.map(item=>({...item})))
        // }
        // else if(user.roles[role]==="warden"){
        //     // setRoleTo("warden")
        //     console.log("new links : ",wardenLinks)
        //     setLinks(wardenLinks.map(item=>({...item})))
        // }
        // else if(user.roles[role]==="hosteloffice"){
        //     // setRoleTo("warden")
        //     console.log("new links : ",hostelOfficeLinks)
        //     setLinks(hostelOfficeLinks.map(item=>({...item})))
        // }

        if(role==="admin")
        {
            // setRoleTo("admin")
            console.log("new links : ",adminLinks)
            setLinks(adminLinks.map(item=>({...item})))
        }
        else if(role==="SA")
        {
            // setRoleTo("staffadvisor")
            console.log("new links : ",saLinks)
            setLinks(saLinks.map(item=>({...item})))
        }
        
        else if(role==="HOD")
        {
            // setRoleTo("staffadvisor")
            console.log("new links : ",hodLinks)
            setLinks(hodLinks.map(item=>({...item})))
        }
        else if(role==="WD"){
            // setRoleTo("warden")
            console.log("new links : ",wardenLinks)
            setLinks(wardenLinks.map(item=>({...item})))
        }
        else if(role==="AA" || role==="CLRKA3" || role==="CLRKA2" || role==="SG" || role==="MTRN" || role==="CLRKA1" || role==="CLRKB1" || role==="MTRN" || role==="AWD"  ){
            console.log("new links : ",wardenLinks)
            setLinks(hostelOfficeLinks.map(item=>({...item})))


        }

   
        else if(role==="CLRK"){
            // setRoleTo("warden")
            console.log("new links : ",ClerkLinks)
            setLinks(ClerkLinks.map(item=>({...item})))
        }
        else if(role==="MTRN" ){
            // setRoleTo("warden")
            console.log("new links : ",hostelOfficeLinks)
            setLinks(matronLinks.map(item=>({...item})))
        }
        else if(user.roles[role]==="SG"){
            // setRoleTo("warden")
            console.log("new links : ",sergeantLinks)
            setLinks(sergeantLinks.map(item=>({...item})))
        }

    }, [role])
    
    return (
        <div className='flex w-full flex-row bg-primary h-screen'>
        <SideBar myLinks={links} roles={user.roles} setRole={setRole} currentRole={role}/>
            {/* <div className='w-3/12 '> */}
                {/* myActiveIndex is the index of the link that should be active*/}
                {/*myOpenedIndex is the index of the link(with sublinks) that is made open */}
                {/* roleIndex is the index of the role selected */}
                {/* roleTo is the route of the home page of the corresponding role */}
                {/* <SideBar myLinks={links} roles={user.roles} setRole={setRole} currentRole={role}/>
            </div> */}
            <Outlet context={[role, setRole]}/>
        </div>
    )
}

export default CommonHome