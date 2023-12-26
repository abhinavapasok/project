import {useEffect,useState} from 'react'
import {Link} from "react-router-dom"
import Hostel from '../icons/hostel-image.jpeg'
import FacultySignUpForm from '../components/FacultySignUpForm';
function FacultySignUpPage() {
    
  return (
    <div className="bg-slate-200 min-h-screen">
      <nav className="flex w-5/6 ml-auto mr-auto pt-5">
        <Link to="/">HostelCompanion</Link>   
      </nav>
      <div className="flex items-center justify-between m-auto w-5/6" style={{minHeight:"80vh"}}>
      <div className="flex flex-col items-center justify-around">
          <h2 className="font-bold text-3xl mb-5 pb-5">Perfect Solution for Hostel Activities</h2>
          <div className='bg-stone-800 w-96 h-72 p-5 rounded-lg rotate-12 mt-5 pt-5'>
            <img src={Hostel} className="w-full h-72 rounded-lg -rotate-12 -translate-y-2 -translate-x-2" alt="" />
          </div>
        </div>
      <FacultySignUpForm/>
      </div>
    </div>
  )
}

export default FacultySignUpPage