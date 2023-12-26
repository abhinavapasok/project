import {useContext, useState} from "react"
import {Link} from "react-router-dom"
import axios from 'axios'
import {UserContext} from '../Contexts/UserContext'
import { baseUrl } from "../baseUrl"
import AlertDialog from "./AlertDialog"
function LoginForm() {

    const [username, setUsername] = useState("")
    const [password,setPassword]=useState("")
    const {setUser, setLoading} =useContext(UserContext)
    const [open1,setOpen1]=useState(false);
    const [modalHeading,setModalHeading]=useState('');
    const [modalText,setModalText]=useState('');

    const login=(e)=>{
        e.preventDefault();
        setLoading(true)
        axios.post(`${baseUrl}/auth/login`, {
                'username': username,
                'password': password
        },{
            withCredentials: true
        })
        .then(function (response) {
            // console.log("success" , response.data);
            // setUser(response.data)
            window.location.replace('/')
        })
        .catch(function (error) {
            setModalHeading("Invalid Credentials !");
            setModalText("please check the credential used .")
            setOpen1(true)
        }).finally(()=>{
            setLoading(false)
        });
    }

    return (
        <div className="flex flex-col bg-white w-11/12 text-left bg-white p-10 rounded-xl m-auto">
            <h2 className="font-bold text-2xl">Log In</h2>
            <p>Welcome Back!</p>
            <p>Please enter your details</p>
            <form onSubmit={login}> 
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
                    <label htmlFor="">Password</label>
                    <input 
                        type="password" 
                        className="w-full py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </div>
                <div className="flex items-center justify-between mt-2">
                    {/* <p className="text-gray-500">Should contain atleast 8 characters</p> */}
                    <Link to='/forgot-password'><p className="text-blue-500 underline cursor-pointer">Forgot Password?</p></Link>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <button type="submit" className="rounded-xl text-white py-2 px-4 w-3/6 bg-stone-800">
                        <button 
                            className="w-full h-full"
                        >
                                Login
                        </button>
                    </button>
                </div>
                {/* <div className="mt-4 flex">
                    <p className="mr-2">Create new account?</p><Link to="/signup">Sign Up</Link>
                </div> */}
            </form>
            <AlertDialog
        open={open1}
        setOpen={setOpen1}
        modalHeading={modalHeading}
        modalText={modalText}
      />
        </div>
    )
}

export default LoginForm