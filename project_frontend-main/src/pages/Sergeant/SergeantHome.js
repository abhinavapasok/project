import { Outlet } from 'react-router-dom'
function SergeantHome() {
  return (
    <div className='flex w-full flex-row bg-primary h-screen'>
        <Outlet/>
    </div>
  )
}
export default SergeantHome