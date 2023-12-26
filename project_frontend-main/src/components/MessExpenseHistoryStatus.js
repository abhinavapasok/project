
import { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { Checkbox, MenuItem, Select } from "@mui/material";
import EditPerDayMessExpense from "../pages/Sergeant/EditPerDayMessExpenses";
import { baseUrl } from "../baseUrl";
import { UserContext } from "../Contexts/UserContext";
function MessExpenseHistoryStatus({suppliers,setSuppliers,paymentinitiated}) {
    const dateConverter = (inputdate) => {
        const date = new Date(inputdate);
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let year = date.getFullYear();
        if (month.length < 2) {
          month = "0" + month;
        }
        if (day.length < 2) {
          day = "0" + day;
        }
        console.log( [year, month, day].join("-"))
        return [year, month, day].join("-");
      };

      const [modal, setModal] = useState(null) //modal showing columns
      const [expensepersupplier,setexpensepersupplier]=useState([]);
      const { user } = useContext(UserContext);
  var date = new Date();
  const [billDate, setBillDate] = useState();
  const [billNo, setBillNo] = useState();
  const [Particulars, setParticulars] = useState();
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [BillAmnt, setBillAmnt] = useState(0);
  const [hostel, setHostel] = useState("MH");
  const [selectedDate, setSelectedDate] = useState(dateConverter(date).substring(0,7));
  const [messreqs, setMessreqs] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState();
  const [messexpenseList,setExpenseList]=useState([]);
  const { setLoading } = useContext(UserContext);
  const [checkeditems,setcheckeditems]=useState([])
  const [edit,setIsEdit]=useState(false)
      const backdropClickHandler = (event) => {
        if (event.target === event.currentTarget) {
            setModal(null)
        }
      }

      const StagesMap={
        '0':'At MTRN/SRGNT',
        '1':'At Clerk',
        '2':'At Hostel Office',
        '3':'Payment iniated',
        '4':'Hostel Office',
        '5':'At Warden',
        '6':'Payment Done',
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
                      <h1 className='text-center font-bold text-black mb-2'>Expense Status</h1>
                     <table className='w-full table-auto'>
                     <tr className='rounded-xl p-3 bg-primary text-center'>
                       <th className='p-3'>Status</th>
                       <th className='p-3'>Date</th>
                       {/* <th className='p-3'>To Date</th>
                       <th className='p-3'>Number of Days</th> */}
                     </tr>
                     {mayouts.dates.map((user, index)=>(
                       <tr 
                         className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                       >
                         <td className='p-3'>{StagesMap[index]}</td>
                         <td className='p-3'>{dateConverter(user)}</td>
                 
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
  



  const getData=async()=>{
    setLoading(true)
    if(user.designation=="faculty"){
        if(window.location.href.includes("/HO")){
          
            const status=paymentinitiated?4:2

            axios.get(`${baseUrl}/warden/get-mess-expense?hostel=${hostel}&&status=${status}&&isfaculty=${true}&&date=${selectedDate}`)
            .then(res=>{
              setExpenseList(res.data.data)
              setLoading(false)
            })
        }
        else if(window.location.href.includes("/WD"))
        {
            axios.get(`${baseUrl}/warden/get-mess-expense?hostel=MH&&status=${5}&&isfaculty=${true}&&date=${selectedDate}`)
            .then(res=>{
              setExpenseList(res.data.data)
              setLoading(false)
            })
        }
    //    if(user.roles.includes("MRTN")){

    //    }
    //    else if(user.roles.includes("WD")){}
    else if(window.location.href.includes("/MTRN")){
        axios.get(`${baseUrl}/warden/get-mess-expense?hostel=LH&&status=${0}&&isfaculty=${true}&&date=${selectedDate}`)
        .then(res=>{
          setExpenseList(res.data.data)
          setLoading(false)
        })
    }
    else if(window.location.href.includes("/SG")){
        axios.get(`${baseUrl}/warden/get-mess-expense?hostel=MH&&status=${1}&&isfaculty=${false}&&date=${selectedDate}`)
        .then(res=>{
          setExpenseList(res.data.data)
          setLoading(false)
        })
    }
    else if(window.location.href.includes("/CLRK")){
        const status=paymentinitiated?3:1
        axios.get(`${baseUrl}/warden/get-mess-expense?hostel=${hostel}&&status=${status}&&isfaculty=${true}&&date=${selectedDate}`)
        .then(res=>{
          setExpenseList(res.data.data)
          setLoading(false)
        })
    }

    
    }
    else{  
    const hostel=window.location.href.includes("/messdirector")?'MH':'LH'
    axios.get(`${baseUrl}/warden/get-mess-expense?hostel=${hostel}&&status=${0}&&isfaculty=${false}&&date=${selectedDate}`)
    .then(res=>{
      setExpenseList(res.data.data)
      setLoading(false)
    })

    }
  }
  useEffect(() => {
    // setLoading(true)
   if(modal!=null)
     RenderModal()
 }, [])
   useEffect(() => {
    getData()
    }, [hostel,selectedDate])

    const okAndProceed=async()=>{
        if(checkeditems.length>0)
        {   setLoading(true)
            axios.post(`${baseUrl}/warden/update-expense-status`,{
                ids:checkeditems
            })
            .then(res=>{
              setExpenseList([])
              alert("status updated succesfully");
            getData()
            })
        }else{
            alert("please choose an item")
        }
     
    }

    const ModifyandProceed=async()=>{
        if(checkeditems.length>1 || checkeditems.length==0)
        {
            alert("please choose an item")
        }
        else {
          setIsEdit(true)
        }
        console.log(checkeditems)
    }

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const downloadExcel = async () => {
    // using Java Script method to get PDF file
    const ws = XLSX.utils.json_to_sheet(messreqs);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Mess Out List ${selectedDate}.xlsx`);
  };
  return !edit?(
    <>
      <div className="w-3/4 mt-4 mr-4 ml-4 ">
    
      {modal&&modal}
          {window.location.href.includes("/HO") || window.location.href.includes("/CLRK") || window.location.href.includes("/WD")?<div className="flex items-center justify-between w-4/12">
            <select
              onChange={(e) => {
                setHostel(e.target.value);
              }}
              className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
            >
              <option value="MH">Mens Hostel</option>
              <option value="LH">Ladies Hostel</option>
            </select>

          </div> :""}
       

        <div className="flex items-center justify-end mb-5">
          <button
            className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5"
            onClick={() => {
              downloadExcel();
            }}
          >
            Download as Excel
          </button>
        </div>
        {
            user.designation=="faculty"?<div className="flex items-center justify-end mb-5">
        <button
            className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5"
            onClick={() => {
                okAndProceed();
            }}
          >
            Ok & Proceed
          </button>
          <button
            className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5"
            onClick={() => {
              ModifyandProceed();
            }}
          >
            Modify 
          </button>
        </div>:""
        }
        
        <h2 className="text-black font-semibold text-lg mt-5 mb-3">
          Mess Out Requests
        </h2>
        <div className="flex items-center justify-between w-4/12 py-4">
          <p className="font-semibold">Select Date </p>
          <input
          defaultValue={dateConverter(date).substring(0,7)}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            type="month"
          ></input>
        </div>
        <div className="flex items-center justify-between w-4/12 py-4">
          <p className="font-semibold">No Of Requests :</p>
          <p className="font-semibold">{messexpenseList.length} </p>
        </div>
        <table className="w-full relative table-auto">
          <tr  className="rounded-xl p-3 bg-primary text-center">
            <th className="p-3">Bill Date</th>
            <th className="p-3">Bill No.</th>
            <th className="p-3">Particulars</th>
            <th className="p-3">Supplier</th>
            <th className="p-3">Bill Amount</th>
            <th className="p-3">Status</th>
            {user.designation=="faculty"?<th className="p-3">View Details</th>:""}
          </tr>
          {messexpenseList.map((expense, index) => {
            console.log(expense)
            return (
              <tr
              onClick={()=>{
                    RenderModal(expense,expense.bill_amount)
                }} 
                key={index}
                className={
                  "border-b text-center border-slate-200 border-solid hover:bg-gray-300"
                }
              >
                <td className="p-3">{dateConverter(expense.bill_date)}</td>
                <td className="p-3">{expense.bill_no}</td>
                <td className="p-3">{expense.particulars.map(p=>p+",")}</td>
                <td className="p-3">{expense.supplier_id}</td>
                <td className="p-3">{expense.bill_amount}</td>
                <td className="p-3">{StagesMap[expense.status]}</td>
                {user.designation=="faculty"?     <td className="p-3">
                View Status
                </td>:""}
           
              </tr>
            );
          })}
        </table>
      </div>
    </>
  ):<EditPerDayMessExpense getData={getData} setIsEdit={setIsEdit} suppliers={suppliers} setSuppliers={setSuppliers} id={checkeditems[0]}/>;
}

export default MessExpenseHistoryStatus;
