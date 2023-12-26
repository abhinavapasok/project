import { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { Checkbox, MenuItem, Select } from "@mui/material";
import { baseUrl } from "../../baseUrl";
import EditPerDayMessExpense from "./EditPerDayMessExpenses";
function MessExpenseList({suppliers,setSuppliers,paymentinitiated}) {
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

  const StagesMap={
    '0':'Applied',
    '1':'At Clerk',
    '2':'At Hostel Office',
    '3':'Payment iniated',
    '4':'Hostel Office',
    '5':'At Warden',
    '6':'Payment Done',
}

  const getData=async()=>{
    setLoading(true)
    if(user.designation=="faculty"){
        setSelectedSupplier(suppliers[0])
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
        axios.get(`${baseUrl}/warden/get-mess-expense?hostel=MH&&status=${0}&&isfaculty=${true}&&date=${selectedDate}`)
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
          <tr className="rounded-xl p-3 bg-primary text-center">
            <th className="p-3">Bill Date</th>
            <th className="p-3">Bill No.</th>
            <th className="p-3">Particulars</th>
            <th className="p-3">Supplier</th>
            <th className="p-3">Bill Amount</th>
            <th className="p-3">Status</th>
            {user.designation=="faculty"?<th className="p-3">Select</th>:""}
          </tr>
          {messexpenseList.map((expense, index) => {
            return (
              <tr
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
                  <Checkbox onChange={(e)=>{
                    if(e.target.checked)
                    {
                         setcheckeditems([...checkeditems,expense.id])
                    }
                    else {
                         setcheckeditems(checkeditems.filter(item=>item!=expense.id))
                    }
                  }} />
                </td>:""}
           
              </tr>
            );
          })}
        </table>
      </div>
    </>
  ):<EditPerDayMessExpense getData={getData} setIsEdit={setIsEdit} suppliers={suppliers} setSuppliers={setSuppliers} id={checkeditems[0]}/>;
}

export default MessExpenseList;
