import LoginForm from "../components/LoginForm"
import {Link, useSearchParams} from "react-router-dom"
import Hostel from '../icons/hostel-image.jpeg'
import ForgotPasswordForm from "../components/ForgotPasswordForm"
import SetNewPasswordForm from "../components/SetNewPasswordForm"
import CryptoJS from 'crypto-js'
import { useEffect, useState } from "react"
function SetNewPasswordPage() {
    const [inputs,setInputs]=useState("")
    const [searchParams] = useSearchParams();
    const [filledDetails,setFilledDetails]=useState([])
    const [email,setEmail]=useState("");
    const [user_id,setUserId]=useState("")
    function decrypt(data,key){
      let decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
      return CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
    }
  
    useEffect(() => {
      
      var ciphertext=searchParams.get('cred')
      console.log(ciphertext)
      var plainText=decrypt(ciphertext,'secret key 123')
      console.log(plainText.toString())
      let arr=plainText.slice(1,plainText.length-1).split(":")
      setUserId(arr[0])
      setEmail(arr[1])
      setFilledDetails(plainText.slice(1,plainText.length-1).split(":"))
    }, [])
  return (
    <div className="bg-slate-200 min-h-screen pb-10">
      <nav className="flex w-5/6 ml-auto mr-auto pt-5">
        <Link to="/">HostelCompanion</Link>   
      </nav>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 flex items-center justify-between m-auto w-18/6" style={{minHeight:"80vh"}}>
        <div className="flex flex-col items-center justify-around">
          <h2 className="font-bold text-3xl mb-5 pb-5">Perfect Solution for Hostel Activities</h2>
          <div className='bg-stone-800 w-116 h-112 p-5 rounded-lg  mt-5 pt-5'>
            <img src={Hostel} className="w-full h-72 rounded-lg -rotate-62 -translate-y-2 " alt="" />
          </div>
        </div>
        <SetNewPasswordForm email={email} userId={user_id}/>
      </div>
    </div>
  )
}

export default SetNewPasswordPage