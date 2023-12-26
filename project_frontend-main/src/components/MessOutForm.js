import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import AlertDialog from "./AlertDialog";
import ConfirmDialog from "./ConfirmDialog";
import { baseUrl } from "../baseUrl";
function MessOutForm({
  noofkdaybefore,
  noofDays,
  noofMaxmessoutDays,
  noOfMaxMessOutsinMonth,
  messOutHistory,
  setMessOutHistory,
  setIsEmpty,
}) {
  const [fromDate, setFromDate] = useState("");
  const [allowableDays, setAllowableDays] = useState(31);
  const [cumulativeMessCount, setCumulativeMessCount] = useState(0);
  const [toDate, setToDate] = useState('');
  const [modalText, setModalText] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4,setOpen4]=useState(false);
  const [isMessout, setisMessOut] = useState(false);
  const [hasUpcomingMessout, setHasUpcomingMessout] = useState(false);
  const [messoutEntry, setMessoutEntry] = useState(null);
  const [messoutThisMonth,setMessoutsThisMonth]=useState(0);
  const [exceededLimit, setExceededLimit] = useState(false);
  const { user, setLoading } = useContext(UserContext);

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
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${baseUrl}/inmate/check/messout`, {
        user_id: user.user_id,
        hostel: user.hostel,
      })
      .then((res) => {
        if (res.data.status == "ok") {
          if (res.data.isMessout) {
            setisMessOut(true);
            if(res.data.currentMessoutDetails.showtodate){
                setToDate(dateConverter(res.data.currentMessoutDetails.todate));
            }
            setMessoutEntry(res.data.currentMessoutDetails);
          } else if (res.data.hasUpcomingMessout) {
            setHasUpcomingMessout(true);
            if(res.data.upcomingMessoutDetails.showtodate){
                setToDate(dateConverter(res.data.upcomingMessoutDetails.todate));
            }
            setMessoutEntry(res.data.upcomingMessoutDetails);
        
          }
          if (res.data.AllowableDays <noofDays) setExceededLimit(true);
        setAllowableDays(res.data.AllowableDays);
        setMessoutsThisMonth(res.data.monthlyMessoutCount);
        
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [messOutHistory]);

  const getToday = () => {
    const date = new Date();
    date.setDate(date.getDate() + noofkdaybefore);
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
  const getMessinStartDate = () => {
    let date, daysadd;
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const messoutfromdate = new Date(messoutEntry.fromdate);
    noofDays == 0 ? (daysadd = 1) : (daysadd = noofDays + 1);
    const messinMinDate = new Date(
      messoutfromdate.setDate(messoutfromdate.getDate() + daysadd - 1)
    ); 
    today < messinMinDate ? (date = messinMinDate) : (date = today);
    // date = messinMinDate;
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };
  const getMessInMaxDate = () => {
    let date = new Date();
    const fromdate_=new Date(messoutEntry.fromdate);
    if(fromdate_>date)
    {
        fromdate_.setDate(fromdate_.getDate()+allowableDays)
        date=fromdate_
    }
    else{
    fromdate_.setDate(fromdate_.getDate()+noofMaxmessoutDays)
    console.log(fromdate_)
    date.setDate(date.getDate() + allowableDays)
    console.log(date)
    date=date<fromdate_?date:fromdate_
    }
   
    
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  };
  const is_edit_messin_possible=()=>{
    const d=new Date();
    d.setDate(d.getDate() + 1);
    const d1=dateConverter(d)
    const mess_in_date=dateConverter(toDate)
    return mess_in_date==d1

  }

  const deleteMessOut = (req, res) => {
    setModalHeading("Confirmation");
    setModalText("Are you sure you want to delete the upcoming messout ");
    setOpen4(true);
  };
  const deleteMessOutHandler=async(req,res)=>{
    setLoading(true)
    axios
      .post(`${baseUrl}/inmate/cancel-messout`, {
        messout_id: messoutEntry.messout_id,
        user_id:user.user_id
      })
      .then((res) => {
        if (res.data.status == "ok") {
         const filteredMessouts =messOutHistory.filter(obj => obj.messout_id!=messoutEntry.messout_id);  
          setMessOutHistory(filteredMessouts);
          setHasUpcomingMessout(false);
          setMessoutEntry(null)
          setModalHeading("Request Completed")
          setModalText("Your request is deleted succesfully ");
          setOpen1(true)
        } else {
          setModalHeading("Something went wrong !");
          setModalText("Could not delete your request please try again later !");
          setOpen1(true);
        }  

    }).catch((err)=>{
        setModalHeading("Exceeded Limit");
        setModalText("You cannot apply for more messout this month.");
        setOpen1(true);
    }).finally(()=>{
        setLoading(false);
    })
  }
  
  const submitMessInDate=(e)=>{
    e.preventDefault();
    if(new Date(fromDate)>new Date(toDate) ||new Date(toDate)>new Date(getMessInMaxDate())){
        setModalHeading("Request Failed");
        setModalText("Please check your dates and apply !");
        setOpen1(true)
        return;
    }
    const date1=new Date(toDate);
    const date2=new Date(fromDate);
    const date1Millis = date1.getTime();
    const date2Millis = date2.getTime();

  // Calculate the difference in milliseconds
    const differenceMillis = Math.abs(date2Millis - date1Millis);

  // Convert the difference back to days
   const differenceDays = Math.ceil(differenceMillis / (1000 * 60 * 60 * 24));
    if(differenceDays>allowableDays){
        setModalHeading("Request Failed");
        setModalText("You have exceeded the limit you cannot apply for this range");
        return;
    }
    setModalHeading("Request Success");
    setModalText(
        "You have filled Mess in  from " +
          parseDateDDMMYYYY(toDate) +
          "\nDo you want to confirm?"
      )
      setOpen3(true)

  }

  const submitMessInDateHandler=async()=>{
    setLoading(true)
    axios
      .post(`${baseUrl}/inmate/apply-messin`, {
        messout_id: messoutEntry.messout_id,
        toDate:dateConverter(toDate),
      })
      .then((res) => {
        if (res.data.status == "ok") {
         const filteredMessouts =messOutHistory.filter(obj => obj.messout_id!=messoutEntry.messout_id);  
          setMessOutHistory([...filteredMessouts, res.data.data]);
          setModalHeading("Request Completed")
          setModalText("Your messin request is successfull ");
          setOpen1(true)
        } else {
          setModalHeading("Invalid Date");
          setModalText("You cannot apply messout for the given date");
          setOpen1(true);
        }  

    }).catch((err)=>{
        setModalHeading("Exceeded Limit");
        setModalText("You cannot apply for more messout this month.");
        setOpen1(true);
    }).finally(()=>{
        setLoading(false);
    })

  }

  const submitChangMessoutFromDate=(e)=>{
    e.preventDefault()
    const d=new Date();
    const f=new Date(fromDate);
    const t=new Date(messoutEntry.todate);
    const num=((t.getTime()-f.getTime())/(1000 * 3600 * 24))+1
    if(d>=f  || f>=t || num<noofDays ){
        setModalHeading("invalid date");
        setModalText("You cannot apply messout for this date");
        setOpen1(true);
        return;
    }
    const date = new Date(fromDate);
    let messinMaxDate = new Date(
      date.setDate(date.getDate() + allowableDays-1)
    );
    if(messoutEntry.showtodate){
        const previousTodate=new Date(messoutEntry.todate);
        if(messinMaxDate>previousTodate){
            messinMaxDate=previousTodate;
        }
       
    }
    if(allowableDays>31)
    {
        setModalText(
            "You have filled Mess Out  from " +
              parseDateDDMMYYYY(fromDate) +
              "\nDo you want to confirm?"
          )
    }
    allowableDays>31
      ? setModalText(
          "You have filled Mess Out  from " +
            parseDateDDMMYYYY(fromDate) +
            "\nDo you want to confirm?"
        )
      : setModalText(
          "You have Edited Mess Out  from " +
            parseDateDDMMYYYY(fromDate) +
            ". \n you will automatically entered to mess from " +
            parseDateDDMMYYYY(messinMaxDate) +
            "\nDo you want to confirm?"
        );
    setOpen2(true)

  }

  const submitEditMessoutFromDateRequest=async()=>{
    const date =new Date(fromDate);

    let calculatedMessInDate =allowableDays>31?new Date(
        messoutEntry.todate
      ):new Date(
      date.setDate(date.getDate() + allowableDays - 1)
    );
    if(messoutEntry.showtodate){
        const previousTodate=new Date(messoutEntry.todate);
        if(calculatedMessInDate>previousTodate)
        calculatedMessInDate=previousTodate;
    }
    axios
      .post(`${baseUrl}/inmate/edit/messout/fromdate`, {
        messout_id: messoutEntry.messout_id,
        fromDate: dateConverter(fromDate),
        toDate:dateConverter(calculatedMessInDate),
      })
      .then((res) => {
        if (res.data.status == "ok") {
         const filteredMessouts =messOutHistory.filter(obj => obj.messout_id!=messoutEntry.messout_id);  
          setMessOutHistory([...filteredMessouts, res.data.data]);
          setModalHeading("Request Completed")
          setModalText("Your messout request is successfully edited ");
          setOpen1(true)
        } else {
          setModalHeading("Invalid Date");
          setModalText("You cannot apply messout for the given date");
          setOpen1(true);
        }  

    }).catch((err)=>{
        setModalHeading("Exceeded Limit");
        setModalText("You cannot apply for more messout this month.");
        setOpen1(true);
    }).finally(()=>{
        setLoading(false);
    })
    
  }

  const renderMessInWithUpcomingMessout=()=>{
    return(<>
        <form onSubmit={submitChangMessoutFromDate}>
            <div className="grid grid-cols-2 w-100 gap-4 mb-3">
          <label htmlFor="">Edit From date:</label>{" "}
          <input
          required
          type="date"
            defaultValue={dateConverter(messoutEntry.fromdate)}
            min={getToday()}
            onChange={(e) => {
              setFromDate(e.target.value)
            }}
            className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
          />
        </div>
        {!isMessout && <div className="flex justify-end  p-4">
          <button
            type="button"
            onClick={()=>{
               deleteMessOut()
            }}
            className="p-3 m-3 bg-stone-800 text-white rounded-xl"
          >
            Delete
          </button>
          <button
            type="submit"
            className="p-3 m-3 bg-stone-800 text-white rounded-xl"
          >
            Submit
          </button>
        </div>}
        </form>
        

        <form onSubmit={submitMessInDate}>
        <div className="grid grid-cols-2 w-100 gap-4 mb-3 mt-5">
          <label htmlFor="">Mess in from:</label>{" "}
          <input
            type="date"
            value={toDate}
            readOnly={is_edit_messin_possible()}
            min={getMessinStartDate()}
            max={getMessInMaxDate()}
            onChange={(e) => {
              setToDate(e.target.value);
            }}
            className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
            required
          />
        </div>
        {noofDays>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" /> Minimum {noofDays} days of leave
          is required for Mess Out
        </p>:""}
        {noofMaxmessoutDays>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" /> Maximum {noofMaxmessoutDays}{" "}
          days of leave possible per Mess Out
        </p>:""}
        {noOfMaxMessOutsinMonth - cumulativeMessCount>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" />
          You can request {noOfMaxMessOutsinMonth - cumulativeMessCount} more
          mess out in this month
        </p>:""}

        <div className="w-full flex items-end justify-end mt-5">
          <button
            type="submit"
            className="ml-auto p-3 bg-stone-800 text-white rounded-xl"
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
        confirmFunction={submitEditMessoutFromDateRequest}
      />
        <ConfirmDialog
        open={open3}
        setOpen={setOpen3}
        modalHeading={modalHeading}
        modalText={modalText}
        confirmFunction={submitMessInDateHandler}
      />
        <ConfirmDialog
        open={open4}
        setOpen={setOpen4}
        modalHeading={modalHeading}
        modalText={modalText}
        confirmFunction={deleteMessOutHandler}
      />

       
    </>)
  }

  const submitMessoutHandler=(e)=>{
    e.preventDefault()
    try{
        const date = new Date(fromDate);
        if(date<new Date(getToday()))
        {
            setModalHeading("Invalid Date");
            setModalText("Please Check Your date and Apply Again .");
            setOpen1(true);
            return;
        }

        if(exceededLimit)
        {
            setModalHeading("Exceeded Limit");
            setModalText("You cannot apply for more messout this month.");
            setOpen1(true);
            return;
        }
       
        const messinMinDate = new Date(
          date.setDate(date.getDate() + allowableDays)
        );
        allowableDays>31
          ? setModalText(
              "You have filled Mess Out  from " +
                parseDateDDMMYYYY(fromDate) +
                "\nDo you want to confirm?"
            )
          : setModalText(
              "You have filled Mess Out  from " +
                parseDateDDMMYYYY(fromDate) +
                ". \n you will automatically entered to mess from " +
                parseDateDDMMYYYY(messinMinDate) +
                "\nDo you want to confirm?"
            );
        setOpen2(true)

    }catch(err){
        setModalHeading("Something went wrong");
        setModalText("Couldn't complete your request . Please proceed after some time");
        setOpen1(true);

    }
  }
  const submitMessoutRequest=async()=>{
    const date =new Date(fromDate);

    const calculatedMessInDate =allowableDays>31?new Date(
        date.setDate(date.getDate() + 10000)
      ):new Date(
      date.setDate(date.getDate() + allowableDays)
    );
    axios
      .post(`${baseUrl}/inmate/applymessout`, {
        user_id: user.user_id,
        fromDate: dateConverter(fromDate),
        toDate:dateConverter(calculatedMessInDate),
        hostel: user.hostel
      })
      .then((res) => {
        if (res.data.status == "ok") {
          setMessOutHistory([...messOutHistory, res.data.data[0]]);
          setModalHeading("Messout applied successfully")
          setModalText("Your messout request is completed ");
          setOpen1(true)
        } else {
          setModalHeading("Invalid Date");
          setModalText("You cannot apply messout for the given date");
          setOpen1(true);
        }  

    }).catch((err)=>{
        setModalHeading("Exceeded Limit");
        setModalText("You cannot apply for more messout this month.");
        setOpen1(true);
    }).finally(()=>{
        setLoading(false);
    })
  }

  
const renderMessInWithApplyToMessOut=()=>{
    return(<>
        <form onSubmit={submitMessoutHandler}>
         <div className="grid grid-cols-2 w-100 gap-4 mb-3">
          <label htmlFor="">Mess out from date:</label>{" "}
          <input
          required
            type="date"
            min={getToday()}
            onChange={(e)=>{
                setFromDate(e.target.value)
            }}
            className="w-12/12 py-2 px-3 rounded-xl ring-2 ring-slate-300 focus:outline-none"
          />
        </div>
        {noofDays>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" /> Minimum {noofDays} days of leave
          is required for Mess Out
        </p>:""}
        {noofMaxmessoutDays>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" /> Maximum {noofMaxmessoutDays}{" "}
          days of leave possible per Mess Out
        </p>:""}
        {noOfMaxMessOutsinMonth - cumulativeMessCount>0?<p className="flex items-center">
          <InfoIcon className="text-sm mr-1" />
          You can request {noOfMaxMessOutsinMonth - cumulativeMessCount} more
          mess out in this month
        </p>:""}
        <div className="w-full flex items-end justify-end mt-5">
          <button
            type="submit"
            className="ml-auto p-3 bg-stone-800 text-white rounded-xl"
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
        confirmFunction={submitMessoutRequest}
      />

        

       
    </>)
}
  
  return (
    <div className="mb-3">
      <h2 className="font-semibold text-lg mb-2">
        {!hasUpcomingMessout
          ? exceededLimit
            ? "Exceeded Monthly Limit for this month"
            : isMessout
            ? "Apply for Mess in"
            : "Apply for Mess Out"
          : "You Have upcoming Mess out "}
      </h2>
      {!isMessout&&hasUpcomingMessout&& messoutEntry &&renderMessInWithUpcomingMessout()}
      {isMessout&&messoutEntry &&renderMessInWithUpcomingMessout()}
      {!isMessout && !hasUpcomingMessout && renderMessInWithApplyToMessOut() }
    </div>
  );
  
}
export default MessOutForm;
