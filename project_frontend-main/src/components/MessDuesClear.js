import {useState,useEffect} from "react"
import {motion} from "framer-motion"
function MessDuesClear() {
 const [modal, setModal] = useState(null) //modal showing columns
 const backdropClickHandler = (event) => {
   if (event.target === event.currentTarget) {
       setModal(null)
   }
 }

 useEffect(() => {
   if(modal!=null)
     RenderModal()
 }, [])
 

 const RenderModal=(mayouts,month)=>{
   setModal(
       <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
         <div className='flex flex-col bg-white rounded-2xl w-8/12 h-3/4 pt-3 relative overflow-y-scroll'>

           <div
               className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
               onClick={()=>{
                 setModal(null)
               }}
               >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                         <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                 </div>
                 <div>
                 <h1 className='text-center font-bold text-black mb-2'>May 2022 - Mess Dues</h1>
                <table className='w-full table-auto'>
                <tr className='rounded-xl p-3 bg-primary text-center'>
                  <th className='p-3'>Sl.No</th>
                  <th className='p-3'>Admission No.</th>
                  <th className='p-3'>Name</th>
                  <th className='p-3'>Dues</th>
                  <th className='p-3'>Dues Cleared</th>
                  
                </tr>
                {mayouts.map((user, index)=>(
                  <tr 
                    className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                  >
                    <td className='p-3'>{user.SlNo}</td>
                    <td className='p-3'>{user.AdmNo}</td>
                    <td className='p-3'>{user.Name}</td>
                    <td className='p-3'>{user.Dues}</td>
                    <td className='p-3'>{user.Cleared?<p className="text-green-700">Cleared</p>:<button className="submit-button-black">Clear</button>}</td>
                  </tr>
                ))}
            </table>
                 </div>
                
                 
                 
             </div>
         </div>
     )

 }
 const messs=[
   {
     month:'May',
     year:2022,
     messsecs:'Athul,athul,athul'
   },
   {
     month:'June',
     year:2022,
     messsecs:'Athul,athul,athul'
   },
   {
     month:'July',
     year:2022,
     messsecs:'Athul,athul,athul'
   },
   {
     month:'August',
     year:2022,
     messsecs:'Athul,athul,athul'
   },
   {
     month:'September',
     year:2022,
     messsecs:'Athul,athul,athul'
   }
   
 ]

 const messoutss=[
   {
     SlNo:"1234",
     AdmNo:"18MH010",
     Name:"Shijin",
     Dues:154245,
     Cleared:0
   },
   {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    Dues:154245,
    Cleared:1
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    Dues:154245,
    Cleared:0
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    Dues:154245,
    Cleared:1
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    Dues:154245,
    Cleared:1
  },
   
   
   
 ]
 const [messouts, setMessouts] = useState(messs)
 const [mayouts,setMayouts] = useState(messoutss)
 return (
   <>
     <div className='w-11/12'>
     {modal&&modal}
     {
       messouts.map((item,index)=>{
         return(
           <motion.div key={index}  whileHover={{scale:1.02}} className="flex items-center justify-between w-11/12 bg-gray-100 py-3 cursor-pointer mb-3 rounded-md p-2" onClick={()=>{RenderModal(mayouts)}}>
             <p>Mess Dues List</p>
             <p>{item.month} {item.year}</p>
             <button className="p-2 text-black bg-white rounded-md" onClick={()=>{RenderModal(mayouts,item.month)}}>View List</button>
           </motion.div>
         )
       })
     }
     </div>
    
   </>
     )
}


export default MessDuesClear