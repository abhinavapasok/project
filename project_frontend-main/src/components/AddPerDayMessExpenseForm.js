import { useState } from "react"
import {Link} from "react-router-dom"
function AddPerDayMessExpenseForm({submitted,setSubmitted, billDate,setBillDate,setHostel,billNo,setBillNo,Particulars,setParticulars,selectedSupplier,setSelectedSupplier,BillAmnt,setBillAmnt,suppliers,setSuppliers}) {
    const [show,setShow]=useState(false)
    return (
      <div className="flex flex-col  bg-white text-left p-10 rounded-xl">
          <h2 className="font-bold text-2xl">{Particulars&& Particulars.length? "Edit Mess Expenses": "Add Mess Expenses"}</h2>
          <form action="" className="mt-2" >
              <div className="flex flex-col mt-2">
                <label htmlFor="">Bill Date</label>
                <input value={billDate} type="date" className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" placeholder="Enter your pen number" onChange={e=>{setBillDate(e.target.value)}}/>
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="">Bill No:</label>
                <input type="text" className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" placeholder="Enter your name" value={billNo} onChange={e=>{setBillNo(e.target.value)}}/>
              </div>
              
              <div className="flex flex-col mt-2">
                <label htmlFor="">Particulars</label>
                <input type="text" className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" placeholder="Enter your name" value={Particulars} onChange={e=>{setParticulars(e.target.value)}}/>
              </div>
              {/* <div className="flex flex-col mt-2">
                <label htmlFor="">Hostel</label>
                <select name="" id="" className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" onChange={e=>{setHostel(e.target.value)}}>
                   <option value='MH'>MH</option>
                   <option value='LH'>LH</option>
                </select>
              </div> */}
              <div className="flex flex-col mt-2">
                <label htmlFor="">Supplier</label>
                <select name="" id="" className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" onChange={e=>{
                    if(e.target.value!='other')
                    { 
                        setShow(false)
                        setSelectedSupplier(JSON.parse(e.target.value))
                    }
                    else
                    { 
                        setShow(true)
                    }
                    
                    }}>
                    
                    {
                        [...suppliers,1].map((supplier,index)=>{
                            return index==suppliers.length?<option value="other">Other</option>:<option value={JSON.stringify(supplier)}>{supplier.name}</option>
                        })

                        
                    }
                    {/* <option value="other">Other</option> */}
    
                </select>
              </div>
              {show?<div className="flex flex-col mt-2">
                <label htmlFor="">Supplier name</label>
                <input type="text" className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"  onChange={e=>{
                    
                    setSelectedSupplier({supplier_id:false,name:e.target.value})}} placeholder="Enter Supplier name"/>
              </div>:""}
              <div className="flex flex-col mt-2">
                <label htmlFor="">Bill Amount</label>
                <input type="number" className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none" value={BillAmnt} onChange={e=>{setBillAmnt(e.target.value)}} placeholder="Enter your phone number"/>
              </div>
       
            <div className="mt-2">
                {/* <p className="text-gray-500">Should contain atleast 8 characters</p> */}
            </div>
            <div className="flex items-center justify-center mt-4">
                <button type="button" onClick={()=>{
                    if(selectedSupplier)
                    {
                        setSubmitted(true)
                    
                    }
                    else{
                        setSubmitted(true)
                        setSelectedSupplier(selectedSupplier[0]);

                    }
                   
                    window.scrollTo(0, document.body.scrollHeight);
                }} className="rounded-xl text-white py-2 px-4 w-3/6 bg-stone-800">Submit</button>
            </div>

          </form>
          <div>
          </div>
          <div></div>
      </div>
    )
  }
  
  export default AddPerDayMessExpenseForm