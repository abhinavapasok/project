import React from 'react'
import {Link} from "react-router-dom"
import HomeNavbar from '../components/HomeNavbar'
import Hostel from '../icons/hostel-image.jpeg'
function LandingPage() {
  return (
    <div className="flex flex-col self-center bg-slate-200 min-h-screen">
      <HomeNavbar/>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-5/6 m-auto" style={{ minHeight: "80vh" }}>
  <div className="lg:w-1/2 lg:pr-10">
    <div>
      <h2 className="font-bold text-4xl">Your Partner for Hostel Needs and Activities .</h2>
    </div>
    <div className="flex items-center justify-center pt-6 lg:pt-10">
      <Link to="/login" className="bg-stone-800 text-white px-4 py-2 rounded-lg">Get Started </Link>
    </div>
  </div>
  <div className='bg-stone-800 w-full lg:w-96 h-72 p-5 rounded-lg rotate-6 mt-6 lg:mt-0'>
    <img src={Hostel} style={{ transform: 'rotate(-15deg)' }} className="w-full h-full rounded-lg -rotate-36 -translate-y-1 -translate-x-1" alt="" />
  </div>
</div>
    </div>
  )
}

export default LandingPage