import axios from 'axios'
import { useEffect,useContext, useState } from 'react'
import { baseUrl } from '../baseUrl'
import {UserContext} from '../Contexts/UserContext'
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 


const MessAttendance = (props)=>{
    const {user,setLoading} = useContext(UserContext)
    const currentDate = new Date();

    // Format date in yyyy-mm // as attendance is displayed based on month
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
     var formattedDate = `${year}-${month}`;
 
    const [selectedDate, setSelectedDate] = useState(formattedDate);
    const[selectedHostel,setSelectedHostel]=useState("MH");
    const [allStudents,setAllStudents]=useState(props.allInmates.slice())

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
    setLoading(true)
    let url=`${baseUrl}/warden/get-mess-attendance?hostel=${selectedHostel}&&date=${selectedDate}`
    if(user.designation=="student")
    {
        url=`${baseUrl}/warden/get-mess-attendance?hostel=${user.hostel}&&date=${selectedDate}`
        setSelectedHostel(user.hostel)
    }
  
    axios.get(url).then(res=>{
      props.setAllInmates(res.data.data)
      setLoading(false)
    })
  }, [selectedHostel,selectedDate])

  const fileType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8';
  const downloadExcel=async()=>{
      const ws=XLSX.utils.json_to_sheet(props.allInmates);
      const wb={Sheets:{'data':ws},SheetNames:['data']};
      const excelBuffer=XLSX.write(wb,{bookType:'xlsx',type:'array'});
      const data=new Blob([excelBuffer],{type:fileType});
      FileSaver.saveAs(data,`Mess Attendance ${selectedDate}.xlsx`)
    
  }
  const downloadPDF = () => {
    const pdf = new jsPDF();
    if(props.allInmates<1)
    return alert("nothing to download");
    const date=new Date();
    const today=parseDateDDMMYYYY(date)
   
    const title = `Attendance List of ${selectedHostel} ${today}`;
    pdf.text(title, 14, 15); 

    const columns = ["hostel_admission_no","name","val","block_name","room_no"];
    
    const header = ["Hostel Admission No","Name","Attendance","Hostel Block","Room No"];

    const rows = props.allInmates.map(row => columns.map(column => row[column]));
    pdf.autoTable({
        head: [header],
        body: rows,
        startY: 25,
    });

    pdf.save(`Mess Attendance ${selectedDate}.pdf`, { returnPromise: true, type: 'blob' })
    .then((blob) => {
        FileSaver.saveAs(blob, `Mess Attendance ${selectedDate}.pdf`);
    });
};
const searchStudents = (searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();
    alert(allStudents.length)
    props.setAllInmates(allStudents.filter((student) =>
      student.name.toLowerCase().includes(searchTermLower)
    ));
  };
    
    return(
        <div className="w-11/12">
         <div className="flex items-center justify-between">
          {user.stage=="inmate"?<select
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option >{user.hostel==="MH"?'Mens Hostel':'Ladies Hostel'}</option>
          </select>:<select
          defaultValue={selectedHostel}
            onChange={(e) => {
              setSelectedHostel(e.target.value);
            }}
            className="p-3 ring-slate-200 ring-2 rounded-xl outline-none"
          >
            <option value="MH">Mens Hostel</option>
            <option value="LH">Ladies Hostel</option>
          </select>}      
        </div>
        <div className="flex items-center justify-between w-9/12 py-4">
    
          <p className="font-semibold">Select Date </p>
          <input
           defaultValue={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            type="month"
          ></input>
        </div>
        <div className='w-4/5 p-2 border rounded'>
        <input
    className="w-4/5 p-2 border rounded"
    type="text"
    placeholder="Search by name"
    onChange={(e) => {
        searchStudents(e.target.value)

    }}
  ></input>

        </div>
   
        <div className="flex items-center justify-between w-8/12 py-4">
          <p className="font-semibold">No Of Requests : {props.allInmates.length} </p>
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
        <div className='w-11/12 overflow-x-scroll'>
   
        
        <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Hostel Admission No.</th>
                
                <th className='p-3'>Attendance.</th>
                <th className='p-3'>Room No.</th>
              </tr>
              {props.allInmates.map((user, index)=>(
                <tr 
                  key={index}
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                >
                  <td className='p-3'>{index+1}</td>
                  <td className='p-3'>{user.name}</td>
                  <td className='p-3'>{user.hostel_admission_no}</td>
                  <td className='p-3'>{user.val}</td>
                  <td className='p-3'>{user.block_name} - {user.room_no}</td>
                </tr>
              ))}
          </table>
          </div>
          </div>
          
    )
}
export default MessAttendance;