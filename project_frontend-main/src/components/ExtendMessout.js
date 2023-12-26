import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import AlertDialog from "./AlertDialog";
import ConfirmDialog from "./ConfirmDialog";
import { baseUrl } from "../baseUrl";
function ExtendMessOutAdminForm() {
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
        return [year, month, day].join("-");
      };

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
  const today=new Date()
  const { setLoading } = useContext(UserContext);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [hostelAdmissionNo, setHostelAdmissionNo] = useState(null);
  const [studentName, setStudentName] = useState(null);
  const [open1, setOpen1] = useState("");
  const [open2, setOpen2] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [requestRecievedDate, setRequestRecievedDate] = useState("");
  const [reason, SetReasonType] = useState(1);
  const [otherReason, setOtherReason] = useState("");
  const [hasPermission,setHasPermission]=useState(false);
  const [maxDate,setMaxDate]=useState(dateConverter(today))
  const [maxPermissbleDays,setMaxPermissibleDays]=useState(0)
  const mp = {
    1: "Special Request",
    2: "Forgot to Add in Software",
    3: "Other",
  };
  const getMinDate=()=>{
    const d=new Date();
    d.setDate(d.getDate()+1);
    return dateConverter(d);
  }

  


  const extendMessoutRequest = async () => {
    const reason_statement=reason!=3?mp[reason]:otherReason;
    setLoading(true)
    axios
      .post(`${baseUrl}/warden/extend-mess-out-special`, {
        hostel_admission_no: hostelAdmissionNo,
        fromdate: fromDate,
        todate: toDate,
        hard_copy_date:requestRecievedDate,
        reason: reason_statement,
        permitted:hasPermission
      })
      .then((res) => {
        alert(res.status)
        if(res.status==201){
            setModalHeading("Request Edited And Completed ");
            // setModalText(" Messout Cannot be Done for the given limit as it exceeds the limit . messout has been extended Messout From "+  dateConverter(res.data.data.fromdate)+" Mess In From "+ dateConverter(res.data.data.todate));
            setOpen1(true);

        }else {
            setModalHeading("Messout Extended Successfully");
            // setModalText("The Messout Extended Mess out from "+  dateConverter(res.data.data.fromdate)+" Mess In From "+ dateConverter(res.data.data.todate));
            setOpen1(true);

        }
   
      })
      .catch((err) => {
        setModalHeading("Invalid Date ");
        setModalText("No Data found for Extending.");
        setOpen1(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const submitHandler = (e) => {
    e.preventDefault()
    if(studentName==null || hostelAdmissionNo==null || studentName=="" ){
        setModalHeading("Invalid input");
        setModalText("Please Provide a Valid input .");
        setOpen1(true);
        return;
    }
    if(requestRecievedDate==null|| requestRecievedDate==""|| fromDate==null || toDate==null || new Date(fromDate)>new Date(toDate)){
        setModalHeading("Invalid date");
        setModalText("Please choose a valid date .");
        setOpen1(true);
        return;
    }
    setModalHeading("Submit Request");
    setModalText(
      "Are You Sure You Want To Add messout from " +  parseDateDDMMYYYY(fromDate)+ " and Mess In From " +  parseDateDDMMYYYY(toDate));
    setOpen2(true);
  };

  const extendMessOut = () => {
    return (
      <div className="m-2 p-2">
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 w-100 gap-4 mb-3">
            <label htmlFor="">Hostel Admission No :</label>{" "}
            <input
              required
              type="text"
              onChange={(e) => {
                setHostelAdmissionNo(e.target.value);
                setStudentName("");
                setMaxPermissibleDays(0);
                if (e.target.value.length > 6) {
                  setLoading(true);
                  axios
                    .get(
                      `${baseUrl}/inmate/get-inmate-details?hostel_admission_no=${e.target.value}`
                    )
                    .then((res) => {
                    if(res.data.status=="ok")
                    {
                        axios.post(`${baseUrl}/warden/get-extend-messout-max-days`,{hostel_admission_no:e.target.value}).then((response)=>{
                            
                            // setMaxDate(dateConverter(response.data.max_date))
                            setMaxPermissibleDays(response.data.data);
                        }).catch((err)=>{
                            console.log(err)
                        }).finally(()=>{
                            setStudentName(res.data.data.name)
              
                        })

                    }
                     
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }
              }}
              className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 w-100 gap-4 mb-3">
            <label htmlFor="">Student Name :</label>{" "}
            <input
              required
              type="text"
              value={studentName}
              className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 w-100 gap-4 mb-3">
            <label htmlFor="">Mess out from date:</label>{" "}
            <input
              required
              min={getMinDate()}
              type="date"
              onChange={(e) => {
                setFromDate(e.target.value);
                const d=new Date(e.target.value);
                d.setDate(d.getDate()+maxPermissbleDays);
                setMaxDate(dateConverter(d))
              }}
              className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 w-100 gap-4 mb-3 mt-5">
            <label htmlFor="">Mess in from:</label>{" "}
            <input
              type="date"
              min={getMinDate()}
              max={maxDate}
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
              }}
              className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
              required
            />
          </div>
       
          <div className="grid grid-cols-2 w-100 gap-4 mb-3 mt-5">
            <label htmlFor="">Hard Copy Requested On :</label>{" "}
            <input
              type="date"
              value={requestRecievedDate}
              onChange={(e) => {
                setRequestRecievedDate(e.target.value);
              }}
              className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="">Reason</label>
            <select
              onChange={(e) => {
                SetReasonType(e.target.value);
              }}
              name="reason-dropdown"
              id="reason-dropdown"
              className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
            >
              <option value={1}>Special Request</option>
              <option value={2}>Forgot to Add in Software</option>
              <option value={3}>Other</option>
            </select>
          </div>
          {reason == 3 && (
            <div className="flex flex-col mt-2">
              <label htmlFor="">Reason</label>
              <input
                onChange={(e) => {
                  setOtherReason(e.target.value);
                }}
                type="text"
                className="py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
                placeholder="Enter The Reason"
              />
            </div>
          )}
          <div className="grid grid-cols-2 w-100 gap-4 mb-3 mt-5">
            <label className="font-bold text-xl" htmlFor="">Has Permission From Principle:</label>{" "}
            <input
              type="checkbox"
              onChange={(e)=>{
                if(e.target.checked)
                setHasPermission(true);
                else
                setHasPermission(false)
              }}
            />
          </div>
          <div className="w-full flex items-end justify-end mt-5">
            <button
              type="submit"
              className=" w-2/6 ml-auto p-3 bg-stone-800 text-white rounded-xl"
            >
              Submit
            </button>
          </div>
        </form>
        <AlertDialog
          open={open1}
          setOpen={setOpen1}
          modalHeading={modalHeading}
          modalText={modalText}
        />
        <ConfirmDialog
          open={open2}
          setOpen={setOpen2}
          modalHeading={modalHeading}
          modalText={modalText}
          confirmFunction={extendMessoutRequest}
        />
      </div>
    );
  };

  return (
    <div className="mb-3">
      <h2 className="font-semibold text-lg m-2">Extend Messout</h2>
      {extendMessOut()}
    </div>
  );
}
export default ExtendMessOutAdminForm;
