import {Link} from "react-router-dom"
import PageNotFound from "../icons/Pagenotfound.svg"
function Page404() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <img src={PageNotFound} alt="404" className="w-3/5"/> 
        <h1 className="font-semibold text-lg text-black my-5">Oops.. You are not supposed to be here!!</h1>
        <Link to="/" className="p-3 rounded-lg bg-stone-800 text-white">Go Home</Link>
      </div>
    </div>
  )
}

export default Page404