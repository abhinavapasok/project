import {useState,useEffect, useContext} from "react"
import {motion} from "framer-motion"
import { UserContext } from "../Contexts/UserContext"
import axios from "axios";
import { baseUrl } from "../baseUrl";
import dateConverter from "../Utils/DateConverter";
function SupplierList({suppliers}) {
 const [modal, setModal] = useState(null) //modal showing columnsy
 const backdropClickHandler = (event) => {
   if (event.target === event.currentTarget) {
       setModal(null)
   }
 }
 const {setLoading } = useContext(UserContext)

 useEffect(() => {
    // setLoading(true)
   if(modal!=null)
     RenderModal()
 }, [])
 
 const getListofExpense=async(id)=>{
    setLoading(true);
    axios.get(`${baseUrl}/warden/get-expense-per-supplier?id=${id}`).then((res)=>{
    console.log(res.data.sum)
    
    RenderModal(res.data.data,res.data.sum[0].sum)
    setLoading(false)
    }).catch((er)=>{
   console.log(er)
   setLoading(false)
})
 }
 
 

 const RenderModal=(mayouts,sum)=>{
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
                 <h1 className='text-center font-bold text-black mb-2'>Supplier Data</h1>
                <table className='w-full table-auto'>
                <tr className='rounded-xl p-3 bg-primary text-center'>
                  <th className='p-3'>Bill Date</th>
                  <th className='p-3'>Bill No.</th>
                  <th className='p-3'>particulars</th>
                  <th className='p-3'>Bill Amount</th>
                  {/* <th className='p-3'>To Date</th>
                  <th className='p-3'>Number of Days</th> */}
                </tr>
                {mayouts.map((user, index)=>(
                  <tr 
                    className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                  >
                    <td className='p-3'>{dateConverter(user.bill_date)}</td>
                    <td className='p-3'>{user.bill_no}</td>
                    <td className='p-3'>{user.particulars}</td>
                    <td className='p-3'>{user.bill_amount}</td>
            
                  </tr>
                ))}
            </table>
                 </div>

                 <div className="flex font-bold mt-6 ml-6"><p>
                    Total Amount :{sum}
                 </p></div>
                
                 
                 
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
     FromDate:"xyz",
     ToDate:"cse"
   },
   {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    FromDate:"xyz",
    ToDate:"cse"
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    FromDate:"xyz",
    ToDate:"cse"
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    FromDate:"xyz",
    ToDate:"cse"
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    FromDate:"xyz",
    ToDate:"cse"
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    FromDate:"xyz",
    ToDate:"cse"
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    FromDate:"xyz",
    ToDate:"cse"
  },
  {
    SlNo:"1234",
    AdmNo:"18MH010",
    Name:"Shijin",
    FromDate:"xyz",
    ToDate:"cse"
  },
  {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 }
  ,
  {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 }
  ,
  {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 }
  ,
  {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 }
  ,
  {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 },
 {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 }
  ,
  {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 },
 {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 }
  ,
  {
   SlNo:"1234",
   AdmNo:"18MH010",
   Name:"Shijin",
   FromDate:"xyz",
   ToDate:"cse"
 }
   
   
 ]
 const [messouts, setMessouts] = useState(messs)
 const [mayouts,setMayouts] = useState(messoutss)
 return (
   <>
     <div className='w-11/12'>
     {modal&&modal}
     {
       suppliers.map((item,index)=>{
         return(
           <motion.div key={index}  whileHover={{scale:1.02}} className="flex items-center justify-between w-11/12 bg-gray-100 py-3 cursor-pointer mb-3 rounded-md p-2" onClick={()=>{RenderModal(mayouts)}}>
             <p>Supplier {index}</p>
             {/* <p>{index}</p> */}
             <p>{item.name}</p>
             <button className="p-2 text-black bg-white rounded-md" onClick={()=>{getListofExpense(item.supplier_id)}}>View List</button>
           </motion.div>
         )
       })
     }
     </div>
    
   </>
     )
}


export default SupplierList