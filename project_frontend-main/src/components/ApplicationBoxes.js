import { useState,useEffect,useContext } from 'react'
import axios from "axios"
import { baseUrl } from "../baseUrl"
import ApplicationBox from "./ApplicationBox"
import {UserContext} from '../Contexts/UserContext'
function ApplicationBoxes() {
    const [applications,setApplications]=useState([])
    const {setLoading,user}=useContext(UserContext)
    useEffect(() => {
      setLoading(true)
      axios.get(`${baseUrl}/inmate/formtemplate`,{params:{user_type:user.stage}})
      .then(res=>{
          console.log(res.data)
          setApplications(res.data)
          setLoading(false)
      })
    }, [])

    return (
            <div className="w-11/12 flex grid grid-cols-3 gap-3 w-11/12">
            {applications.map((item,index)=>{
                    return(
                        <ApplicationBox key={index} applicationTitle={item.name} fields={item.application_template} certificateId={item.certificate_id}/>
                    )                
            })}
            </div>
        
    )
}

export default ApplicationBoxes