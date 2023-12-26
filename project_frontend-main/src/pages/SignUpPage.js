import {useEffect,useState} from 'react'
import SignUpForm from "../components/SignUpForm"
import {Link} from "react-router-dom"
import Hostel from '../icons/hostel-image.jpeg'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import CryptoJS from 'crypto-js'
function SignUpPage() {
  
  const [inputs,setInputs]=useState("")
  const [searchParams] = useSearchParams();
  const [filledDetails,setFilledDetails]=useState([])
  function decrypt(data,key){
    let decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
    return CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    
    var ciphertext=searchParams.get('cred')
    console.log(ciphertext)
    var plainText=decrypt(ciphertext,'secret key 123')
    console.log(plainText.toString())
    setFilledDetails(plainText.slice(1,plainText.length-1).split(":"))
  }, [])
  
  return (
    <div className="bg-slate-200 min-h-screen">
      <nav className="flex w-5/6 ml-auto mr-auto pt-5">
        <Link to="/">HostelCompanion1</Link>   
      </nav>
      <div className="flex items-center justify-between m-auto w-5/6" style={{minHeight:"80vh"}}>
      <div className="flex flex-col items-center justify-around">
          <h2 className="font-bold text-3xl mb-5 pb-5">Perfect Solution for Hostel Activities</h2>
          <div className='bg-stone-800 w-96 h-72 p-5 rounded-lg rotate-12 mt-5 pt-5'>
            <img src={Hostel} className="w-full h-72 rounded-lg -rotate-12 -translate-y-2 -translate-x-2" alt="" />
          </div>
        </div>
      <SignUpForm filledDetails={filledDetails}/>
      </div>
    </div>
  )
}

export default SignUpPage