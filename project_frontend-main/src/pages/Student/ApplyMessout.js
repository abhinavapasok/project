import { useContext } from "react"
import { UserContext } from "../../Contexts/UserContext"

const ApplyMessout=()=>{
    const {user} = useContext(UserContext)
    return<>
        Mess out
    </>
}

export default ApplyMessout