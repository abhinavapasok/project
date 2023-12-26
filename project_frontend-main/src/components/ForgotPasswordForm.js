import {useContext, useState} from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import {UserContext} from '../Contexts/UserContext'
import { baseUrl } from "../baseUrl"
import ConfirmDialog from "./ConfirmDialog"
import AlertDialog from "./AlertDialog"
function ForgotPasswordForm() {
    const [emailID,setEmailID]=useState();
    const [username, setUsername] = useState("")
    const {setUser, setLoading} =useContext(UserContext)
    const [modalText, setModalText] = useState("");
    const [modalHeading, setModalHeading] = useState("");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const ForgotPassword=()=>{
        console.log("here login")
        setLoading(true)
        axios.post(`${baseUrl}/forgot-password`, {
                'username': username,
                'email': emailID
        },{
            withCredentials: true
        })
        .then(function (response) {
            if(response.data.status=="ok")
            {
                setOpen2(true)
                setModalHeading("Email Send ")
            setModalText("A mail with link to reset your password has been send . Please Check your spam folder too .")
            }
            else{
        setOpen1(true)
        setModalHeading("Oops something went wrong")
        setModalText("No user found with this data")
            }
            setLoading(false)
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
            setLoading(false)
        });
    }

    return (
        <div className="flex flex-col bg-white w-8/12 text-left bg-white p-10 rounded-xl m-auto">
            <h2 className="font-bold text-2xl">Forgot Password</h2>
            <form action=""> 
                <div className="flex flex-col mt-2">
                    <label htmlFor="">User Id</label>
                    <input 
                        type="text" 
                        className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" 
                        placeholder="Enter your admission number"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="">Email Id</label>
                    <input 
                        type="email" 
                        className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" 
                        placeholder="Enter your email id"
                        value={emailID}
                        onChange={(e)=>{setEmailID(e.target.value)}}
                    />
                </div>
                <div className="flex items-center justify-between mt-2">
                    {/* <p className="text-gray-500">Should contain atleast 8 characters</p> */}
                </div>
                <div className="flex items-center justify-center mt-4">
                    <Link to="" className="rounded-xl text-white py-2 px-4 w-3/6 bg-stone-800">
                        <button 
                            className="w-full h-full"
                            onClick={()=>{
                                // setUser({
                                //     userName:"",
                                //     password:"",
                                //     roles:["hod","warden","staff advisor"]
                                // })
                                ForgotPassword()
                            }}
                        >
                                Submit
                        </button>
                    </Link>
                </div>

            </form>
            <AlertDialog
        open={open1}
        setOpen={setOpen1}
        modalHeading={modalHeading}
        modalText={modalText}
      />
      <ConfirmDialog
        open={open2}
        setOpen={setOpen2}
        modalHeading={modalHeading}
        modalText={modalText}
        confirmFunction={()=>{

        }}
      />
        </div>
    )
}

export default ForgotPasswordForm