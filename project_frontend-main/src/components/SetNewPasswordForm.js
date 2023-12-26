import {useContext, useState} from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import {UserContext} from '../Contexts/UserContext'
import { baseUrl } from "../baseUrl"
import ConfirmDialog from "./ConfirmDialog"
import AlertDialog from "./AlertDialog"
function SetNewPasswordForm({email,userId}) {
    const [password,setPassword]=useState("")
    const [retypedpassword,setretypedPassword]=useState();
    const {setUser, setLoading} =useContext(UserContext)
    const [modalHeading, setModalHeading] = useState("");
    const [modalText, setModalText] = useState("");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const UpdatePassword=()=>{
        console.log("here login")
        setLoading(true)
        axios.post(`${baseUrl}/changepassword`, {
                'admission_no': userId,
                'newpassword':password,
                'retypedpassword':retypedpassword 
        },{
            withCredentials: true
        })
        .then(function (response) {
            console.log("success" , response.data);
            if(response.data.status=='ok')
            {
              setOpen2(true);
              setModalHeading("Succesfully changed password")
              setModalText("Your password was updated succesfully Login ?")
            }
            else{
                setOpen1(true);
                setModalHeading("Ooops error occured")
                setModalText("Something went wrong")
            }

            setLoading(false)
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
            setOpen1(true);
            setModalHeading("Ooops error occured")
            setModalText("Something went wrong")
            setLoading(false)
        });
    }

    return (
        <div className="flex flex-col bg-white w-8/12 text-left bg-white p-10 rounded-xl m-auto">
            <h2 className="font-bold text-2xl">Change Password</h2>
            <form action=""> 
                <div className="flex flex-col mt-2">
                    <label htmlFor="">New Password</label>
                    <input 
                        type="password" 
                        className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="">Retype Password</label>
                    <input 
                        type="password" 
                        className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" 
                        placeholder="Enter your Password again"
                        value={retypedpassword}
                        onChange={(e)=>{setretypedPassword(e.target.value)}}
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
                            
                                UpdatePassword()
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
            window.location.href="/login"
        }}
        />
        </div>
    )
}

export default SetNewPasswordForm