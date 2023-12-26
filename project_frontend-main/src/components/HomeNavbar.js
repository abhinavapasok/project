import {Link} from 'react-router-dom'

function HomeNavbar() {
  return (
    <nav className="flex items-center justify-between w-5/6 ml-auto mr-auto mt-5">
        <h2>HostelCompanion</h2>
        <div className="">
            {/* <Link to="/login" className="py-3 px-2 mr-5">Login</Link> */}
            <Link to="/login" className="py-2 px-4 text-white bg-stone-800 ml-5 rounded-lg">Login</Link>
        </div>     
    </nav>
  )
}

export default HomeNavbar