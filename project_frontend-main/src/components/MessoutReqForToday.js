import { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { UserContext } from "../Contexts/UserContext";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import AlertDialog from "./AlertDialog";
function MessOutReqsforToday() {
  const {user}=useContext(UserContext)
  
  const getMin = () => {
    const date = new Date();;
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };
  const getMax = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };

    var date = new Date();
    const currentDate = new Date();

    // Format date in yyyy-mm-dd
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateFormat=`${year}-${month}-${day}`
  const [messreqs, setMessreqs] = useState([]);
  const { setLoading } = useContext(UserContext);
  const [selectedDate,setSelectedDate]=useState(getMin());
  const [modalText, setModalText] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [open1, setOpen1] = useState(false);

  const parseDateDDMMYYYY = (inputdate) => {
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
    return day + "-" + month + "-" + year;
  };

  useEffect(() => {
    if(new Date(selectedDate)>new Date(getMax()) || new Date(selectedDate)<new Date(getMin())){
        setModalText("Invalid Date");
        setModalText("Please Choose Either Today , Tommorow , or the day after that .")
        setSelectedDate(getMin());
        setOpen1(true)
        return;
    }
    setLoading(true);
    axios
      .get(
        `${baseUrl}/inmate/messoutrequests?hostel=${user.hostel}&&date=${selectedDate}`
      )
      .then((res) => {
        setMessreqs(res.data.rows);
        setLoading(false);
      });
  }, [selectedDate]);
  

  
  const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
  const downloadExcel=async()=>{
        // using Java Script method to get PDF file
      const ws=XLSX.utils.json_to_sheet(messreqs);
      const wb={Sheets:{'data':ws},SheetNames:['data']};
      const excelBuffer=XLSX.write(wb,{bookType:'xlsx',type:'array'});
      const data=new Blob([excelBuffer],{type:fileType});
      FileSaver.saveAs(data,`Mess Out List ${parseDateDDMMYYYY(selectedDate)}.xlsx`)
    
  }

  const downloadPDF = () => {
    const pdf = new jsPDF();
    if(messreqs.length<1)
    return alert("nothing to download");
    const date=new Date();
     
    const mp={
        MH:"MENS HOSTEL",
        LH:"LADIES HOSTEL"
    }
    const today=parseDateDDMMYYYY(date)
   
    const title = `Mess Out List ${today}`;
    pdf.text(title, 14, 15); 

    const columns = ["hostel_admission_no","name","block_name","room_no"];
    
    const header = ["Admission No","Name","Block","Hostel Room No"];

    const rows = messreqs.map(row => columns.map(column => row[column]));
    pdf.autoTable({
        head: [header],
        body: rows,
        startY: 25,
    });

    pdf.save(`CET ${mp[user.hostel]} Mess Out List ${parseDateDDMMYYYY(selectedDate)}.pdf`, { returnPromise: true, type: 'blob' })
    .then((blob) => {
        FileSaver.saveAs(blob, `CET ${user.hostel} Mess Out List ${parseDateDDMMYYYY(selectedDate)}.pdf`);
    });
};

  return (
    <>
      <div className="w-11/12">
      {
        user.stage=='inmate'? <div className="flex items-center justify-between w-4/12">
          <select
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option >{user.hostel=='MH'?'Mens Hostel':'Ladies Hostel'}</option>
          </select>
          {/* <select className='p-3 ring-slate-200 ring-2 rounded-xl outline-none'>
            <option value="firstyear">First Year</option>
            <option value="secondyear">Second Year</option>
            <option value="thirdyear">Third Year</option>
            <option value="fourthyear">Fourth Year</option>
      </select>  */}
        </div>:""}
        <div className="flex items-center justify-between w-12/12 lg:w-4/12 py-4">
    
    <p className="font-semibold">Select Date </p>
    <input
    className="w-full py-2 px-2 rounded-xl ring-2 ring-slate-300 focus:outline-none"
     defaultValue={selectedDate}
     min={getMin()}
     max={getMax()}
      onChange={(e) => {
        setSelectedDate(e.target.value);
      }}
      type="date"
    ></input>
  </div>

       
        <div className="flex items-center justify-end mb-5">
          <button className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5" onClick={()=>{
            downloadExcel()
          }}>
            Download as Excel
          </button>
        </div>
         
        <div className="flex items-center justify-end mb-5">
          <button className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5" onClick={()=>{
            downloadPDF()
          }}>
            Download as PDF
          </button>
        </div>
        <h2 className="text-black font-semibold text-lg mt-5 mb-3">
          Mess Out Requests For Today
        </h2>
        <div className="flex items-center justify-between w-4/12 py-4">
          <p className="font-semibold">No Of Requests :</p>
          <p className="font-semibold">{messreqs.length} </p>
        </div>
        <div className='w-12/12 overflow-x-scroll'>
        <table className="w-full relative table-auto">
          <tr className="rounded-xl p-3 bg-primary text-center">
            <th className="p-3">Sl.No</th>
            <th className="p-3">Hostel Admission No.</th>
            <th className="p-3">Name</th>
            <th className="p-3">Block Name</th>
            <th className="p-3">Room No :</th>
            <th className="p-3">Number of Days</th>
          </tr>
          {messreqs.map((user, index) => {
            var fdate = new Date(user.fromdate);
            var tdate = new Date(user.todate);
            return (
              <tr
                key={index}
                className={
                  "border-b text-center border-slate-200 border-solid hover:bg-gray-300"
                }
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{user.hostel_admission_no}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">
                {user.block_name }
                </td>
                <td className="p-3">
                {user.room_no}
                </td>
                <td className="p-3">
                  {(tdate.getTime() - fdate.getTime()) / (1000 * 3600 * 24)}
                </td>
              </tr>
            );
          })}
        </table>
        </div>
        <AlertDialog
        open={open1}
        setOpen={setOpen1}
        modalHeading={modalHeading}
        modalText={modalText}
      />
      </div>
    </>
  );
}

export default  MessOutReqsforToday;
