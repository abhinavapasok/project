import {useContext, useState} from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import {UserContext} from '../Contexts/UserContext'
import { baseUrl } from "../baseUrl"
import AlertDialog from "./AlertDialog"
import ConfirmDialog from "./ConfirmDialog"
function ChangePasswordForm() {
    
    const {user}=useContext(UserContext);
    const [newPassword,setNewPassword]=useState("");
    const [retypeNewPassword,setretypeNewPassword]=useState("");
    const [modalHeading, setModalHeading] = useState("");
    const [modalText, setModalText] = useState("");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const {setUser, setLoading} =useContext(UserContext)

    const ChangePassword=()=>{
        if(newPassword.length==0)
        {
            setOpen1(true);
            setModalHeading("Invalid Password");
            setModalText("Please Type a valid password")
            setLoading(false);
            return;

        }
        if(newPassword!=retypeNewPassword)
        {
            setOpen1(true);
            setModalHeading("Invalid Password");
            setModalText("Your Password do not match")
            setLoading(false)
            return;

        }
        setLoading(true)
        axios.post(`${baseUrl}/changepassword`, {
            admission_no:user.user_id,
            newpassword:newPassword,
            retypedpassword:retypeNewPassword
        },{
            withCredentials: true
        })
        .then(function (response) {
            if(response.data.status=='ok')
            {
                setOpen2(true);
                setModalHeading("Password updated");
                setModalText("Your password was updated succesfully")
            }else{
      setOpen1(true);
      setModalHeading("oops something went wrong");
      setModalText("Sorry couldnt update your password")
            }
            setLoading(false)
        })
        .catch(function (error) {
            setOpen1(true);
            setModalHeading("oops something went wrong");
            setModalText("Sorry couldnt update your password")
            setLoading(false)
        });
    }

    return (
        <div className="flex flex-col bg-white w-11/12 text-left bg-white p-10 rounded-xl m-auto">
            <h2 className="font-bold text-2xl">Change password</h2>
            <p>Please remember your password for god sake</p>
            <form action=""> 
                <div className="flex flex-col mt-2">
                    <label htmlFor="">New Password</label>
                    <input 
                        type="password" 
                        className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" 
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e)=>{setNewPassword(e.target.value)}}
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <label htmlFor="">Retype Password</label>
                    <input 
                        type="password" 
                        className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" 
                        placeholder="Retype Password"
                        value={retypeNewPassword}
                        onChange={(e)=>{setretypeNewPassword(e.target.value)}}
                    />
                </div>
                {newPassword==retypeNewPassword  && newPassword.length>0 && <div className="flex items-center justify-center mt-4">
                    <Link to="" className="rounded-xl text-white py-2 px-4 w-3/6 bg-stone-800">
                        <button 
                            className="w-full h-full"
                            disabled={newPassword!=retypeNewPassword || newPassword.length==0}
                            onClick={()=>{
                                ChangePassword()
                            }}
                        >
                                Submit
                        </button>
                    </Link>
                </div>}
             
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
            setretypeNewPassword('');
            setNewPassword('')
        window.location.href="/"
        }}
        />
        </div>
    )
}

export default ChangePasswordForm