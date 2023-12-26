const { pool } = require("../db");
const notification = require("../controllers/notification");
const { query } = require("express");

///////////////// UTILS FUNCTIONS ////////////////////////////

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

const get_inmate_messout_count_month=async(hostel_admission_no)=>{
    const countperMonth_query = await pool.query(
        `select  sum(case 
          when extract('month' from fromdate)=extract('month' from current_date) and extract('month' from todate)=extract('month' from current_date)  then (case when todate>current_date then  current_date- fromdate else todate-fromdate end) 
          when extract('month' from fromdate)=extract('month' from current_date)-1 and extract('month' from todate)=extract('month' from current_date) then (case when todate>current_date then extract('day' from current_date)-1 else extract('day' from todate)-1 end) 
          when extract('month' from fromdate)=extract('month' from current_date) and extract('month' from todate)=extract('month' from current_date)+1  then (case when todate>current_date then  current_date- fromdate else todate-fromdate end) 
          end) as  countpermonth from messout where fromdate<current_date and hostel_admission_no=$1`,
        [hostel_admission_no]
      );
      const count_per_month=countperMonth_query.rows[0].countpermonth 
      return count_per_month;
}

function getDaysDifference(startDateStr, endDateStr) {

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const timeDifference = endDate.getTime() - startDate.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }

//////////////////////////// UTILS FUNCTIONS   ////////////////////////////////////////////////

///////////////////////////ROUTE FUNCITONS ////////////////////////////////////////////

const applyHostelOut = async (req, res) => {
  try {
    const { user_id, fromDate, toDate, reason } = req.body;
    const getadmno = await pool.query(
      "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
      [user_id]
    );
    const hostel_admno = getadmno.rows[0].hostel_admission_no;
    const hostelout = await pool.query(
      "INSERT INTO hostel_out(hostel_admission_no,fromdate,todate,reason) VALUES($1,$2,$3,$4)",
      [hostel_admno, fromDate, toDate, reason]
    );
    res.json(hostelout);
  } catch (e) {
    console.error(e);
  }
};

const get_all_complaints = async (req, res) => {
  const status = req.query.status;
  try {
    const complaints = await pool.query(
      "select c.complaint_id,c.complaint,c.hostel_admission_no,hcs updated_date from complaints c,hostel_complaints_status hcs where c.complaint_id=hcs.complaint_id and hcs.status_code=$1",
      [status]
    );
    res.send({
      status: "ok",
      msg: "got complaints",
      data: complaints.rows,
    });
  } catch (err) {
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};
const getUsersComplaints = async (req, res) => {
  try {
    const { user_id, complaint } = req.body;
    const hostel_data = await pool.query(
      "select * from inmate_table where admission_no=$1",
      [user_id]
    );
    if (hostel_data.rowCount < 1) throw new Error("no user found");
    hostel_admission_no = hostel_data.rows[0].hostel_admission_no;
    const complaints = await pool.query(
      "select c.complaint_id,c.complaint,max(hcs.status_code) from hostel_complaints_status hcs,complaints c where hcs.complaint_id=c.complaint_id and c.hostel_admission_no=$1 group by c.complaint_id",
      [hostel_admission_no]
    );
    res.send({
      status: "ok",
      msg: "got data ",
      data: complaints.rows,
    });
  } catch (err) {
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};
const getComplaintById = async (req, res) => {
  try {
    const complaint_id = req.query.complaint_id;
    const complaint = await pool.query(
      "select c.complaint_id,c.hostel_admission_no,c.complaint,hcs.status_code,hcs.updated_date from complaints c,hostel_complaints_status hcs where hcs.complaint_id=c.complaint_id and  c.complaint_id=$1 order by hcs.status_code desc",
      [complaint_id]
    );
    res.send({
      status: "ok",
      msg: "got complaints",
      data: complaint,
    });
  } catch (err) {
    res.send({
      status: "failed",
      msg: "something went wrong",
    });
  }
};

const submitComplaint = async (req, res) => {
  try {
    const { user_id, complaint } = req.body;
    const hostel_data = await pool.query(
      "select * from inmate_table where admission_no=$1",
      [user_id]
    );
    if (hostel_data.rowCount < 1) throw new Error("no user found");
    hostel_admission_no = hostel_data.rows[0].hostel_admission_no;

    pool.query("begin");
    const insert_complaint = await pool.query(
      "insert into complaints(hostel_admission_no,complaint) values($1,$2) returning *",
      [hostel_admission_no, complaint]
    );
    if (insert_complaint.rowCount < 1) throw new Error("Something went wrong");
    const complaint_id = insert_complaint.rows[0].complaint_id;
    const insert_complaint_status = await pool.query(
      "insert into hostel_complaints_status (complaint_id) values($1) returning * ",
      [complaint_id]
    );
    if (insert_complaint_status.rowCount < 1)
      throw new Error("Something went wrong");
    pool.query("commit");
    res.send({
      status: "ok",
      msg: "added complaint",
    });
  } catch (e) {
    pool.query("rollback");
    res.send({
      status: "failed",
      msg: e.message,
    });
    console.error(e);
  }
};
const update_complaintStatus = async (req, res) => {
  try {
    const { complaint_id, status } = req.body;
    if (status > 5) throw new Error("Invalid Status");
    const update_Status = await pool.query(
      "insert into hostel_complaints_status(complaint_id,status_code) values($1,$2) returning*",
      [complaint_id, status]
    );
    if (update_Status.rowCount < 1) throw new Error("Something went wrong");
    res.send({
      msg: "Status updated",
      status: "ok",
      data: update_Status.rows[0],
    });
  } catch (err) {
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};
const getStudentDetails = async (req, res) => {
  try {
    const hostel_admission_no = req.query.hostel_admission_no;
    const user = await pool.query(
      "select admission_no from inmate_table where hostel_admission_no=$1",
      [hostel_admission_no]
    );
    if (user.rowCount < 1) throw new Error("No User Found");
    const user_id = user.rows[0].admission_no;
    const user_data = await pool.query(
      "select user_id,name from users where user_id=$1",
      [user_id]
    );
    if (user_data.rowCount < 1) {
      throw new Error("No User found");
    }
    res.status(200).send({
      status: "ok",
      msg: "got data",
      data: user_data.rows[0],
    });
  } catch (err) {
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const get_inmate_messout_history_of_inmate = async (req, res) => {
  try {
    const hostel_admission_no = req.query.hostel_admission_no;
    console.log(hostel_admission_no);
    const dateString = req.query.month;
    if (dateString.length < 1) throw new Error("No Date found");
    const get_messout_history_query = await pool.query(
      "select * from messout where hostel_admission_no=$1 and ( to_char(fromdate,'yyyy-mm')=$2 or to_char(todate,'yyyy-mm')=$2)",
      [hostel_admission_no, dateString]
    );
    const inmate_messout_history = get_messout_history_query.rows;
    res.send({
      data: inmate_messout_history,
      msg: "got the messout history of the user",
      status: "ok",
    });
  } catch (err) {
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const submitRoomChange = async (req, res) => {
  try {
    const { user_id, preferredRoom, changeReason } = req.body;
    const getadmno = await pool.query(
      "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
      [user_id]
    );
    const hostel_admno = getadmno.rows[0].hostel_admission_no;
    const currentroom = await pool.query(
      `select inmate_room.room_id from inmate_room where hostel_admission_no=$1`,
      [hostel_admno]
    );
    const croom = currentroom.rows[0].room_id;
    const roomchangereq = await pool.query(
      "INSERT INTO room_request values($1,$2,$3,FALSE) returning *",
      [hostel_admno, preferredRoom, changeReason]
    );
    res.json(roomchangereq);
  } catch (e) {
    console.error(e);
  }
};

const viewMessOutHistory = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const messoutUpdate = await pool.query(
      "update messout set showtodate=true where todate<current_date+1"
    );
    const today = new Date();
    const hostel_admission_no_query = await pool.query(
      "select * from inmate_table where admission_no=$1",
      [user_id]
    );
    const hostel_admission_no =
      hostel_admission_no_query.rows[0].hostel_admission_no;

    const user_mess_attendance_query = await pool.query(
      `select  
extract('day' from current_date)-
 sum(case 
when extract('month' from fromdate)=extract('month' from current_date) and extract('month' from todate)=extract('month' from current_date) then (case when todate>current_date then  current_date- fromdate+1 else todate-fromdate end) 
when extract('month' from fromdate)=extract('month' from current_date)-1 and extract('month' from todate)=extract('month' from current_date) then (case when todate>current_date then extract('day' from current_date) else extract('day' from todate)-1 end)
when extract('month' from fromdate)=extract('month' from current_date) and extract('month' from todate)=extract('month' from current_date)+1 then current_date-fromdate+1
end) as val from messout where fromdate<=current_date and hostel_admission_no=$1`,
      [hostel_admission_no]
    );
    const user_mess_attendance = user_mess_attendance_query.rows[0].val
      ? user_mess_attendance_query.rows[0].val
      : today.getDate();
    console.log("user mess attendance ", user_mess_attendance);
    const messouts = await pool.query(
      "SELECT * FROM messout WHERE hostel_admission_no=(SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1) order by fromdate desc",
      [user_id]
    );
    res.send({
      rows: messouts.rows,
      user_mess_attendance: user_mess_attendance,
    });
  } catch (e) {
    console.error(e);
  }
};
const messoutpredaysk = async (req, res) => {
  try {
    const query =
      req.query.hostel === "MH"
        ? "SELECT value FROM messrequirements WHERE key='messoutpredaysk'"
        : "SELECT value FROM messrequirementsLH WHERE key='messoutpredaysk'";
    const days = await pool.query(query);
    res.json(days.rows);
  } catch (e) {
    console.error(e);
  }
};

const messOutDays = async (req, res) => {
  try {
    const query =
      req.query.hostel === "MH"
        ? "SELECT value FROM messrequirements WHERE key='messoutdays'"
        : "SELECT value FROM messrequirementsLH WHERE key='messoutdays'";
    const days = await pool.query(query);
    res.json(days.rows);
  } catch (e) {
    console.error(e);
  }
};
const maxMessOutDays = async (req, res) => {
  try {
    const query =
      req.query.hostel == "MH"
        ? "SELECT value FROM messrequirements WHERE key='messoutdaysmaximum'"
        : "SELECT value FROM messrequirementsLH WHERE key='messoutdaysmaximum'";
    const days = await pool.query(query);
    res.json(days.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const maxMessoutDaysinMonth = async (req, res) => {
  try {
    const query =
      req.query.hostel === "MH"
        ? "SELECT value FROM messrequirements WHERE key='messout_days_max_in_month'"
        : "SELECT value FROM messrequirementsLH WHERE key='messout_days_max_in_month'";
    const days = await pool.query(query);
    res.json(days.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getMessRequirements = async (req, res) => {
  try {
    const daysK = await pool.query(
      "SELECT value FROM messrequirements WHERE key='messoutpredaysk'"
    );

    const days = await pool.query(
      "SELECT value FROM messrequirements WHERE key='messoutdays'"
    );
    const daysmax = await pool.query(
      "SELECT value FROM messrequirements WHERE key='messoutdaysmaximum'"
    );
    const daysmaxinmonth = await pool.query(
      "SELECT value FROM messrequirements WHERE key='messout_days_max_in_month'"
    );

    res.json({
      daysK: daysK.rows,
      min: days.rows,
      max: daysmax.rows,
      maxinmonth: daysmaxinmonth.rows,
    });
  } catch (e) {
    console.error(e);
  }
};
const getMessRequirementsLH = async (req, res) => {
  try {
    const daysK = await pool.query(
      "SELECT value FROM messrequirementsLH WHERE key='messoutpredaysk'"
    );
    const days = await pool.query(
      "SELECT value FROM messrequirementsLH WHERE key='messoutdays'"
    );
    const daysmax = await pool.query(
      "SELECT value FROM messrequirementsLH WHERE key='messoutdaysmaximum'"
    );
    const daysmaxinmonth = await pool.query(
      "SELECT value FROM messrequirementsLH WHERE key='messout_days_max_in_month'"
    );

    console.log({
      daysK: daysK.rows,
      min: days.rows,
      max: daysmax.rows,
      maxinmonth: daysmaxinmonth.rows,
    });

    res.json({
      daysK: daysK.rows,
      min: days.rows,
      max: daysmax.rows,
      maxinmonth: daysmaxinmonth.rows,
    });
  } catch (e) {
    console.error(e);
  }
};

const renderFormTemplate = async (req, res) => {
  try {
    const type = req.query.user_type;
    var usertype = "";
    switch (type) {
      case "inmate":
        usertype = "IN";
        break;
      case "noninmate":
        usertype = "NIN";
        break;
    }
    const query = await pool.query(
      "SELECT * FROM certificates,path where certificates.pathno=path.pathno AND (path.start_user=$1 or path.start_user='S')",
      [usertype]
    );
    res.json(query.rows);
  } catch (e) {
    console.error(e);
  }
};

const applyCertificate = async (req, res) => {
  try {
    const { user_id, certificate_id } = req.body;
    delete req.body.user_id;
    delete req.body.certificate_id;
    const applicationform = JSON.stringify(req.body);
    // const getadmno=await pool.query("SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",[user_id])
    // const hostel_admno=getadmno.rows[0].hostel_admission_no
    const date = new Date();
    const getPath = await pool.query(`select path from path p,certificates c 
        where p.pathno=c.pathno and c.certificate_id=${certificate_id}`);
    console.log(getPath);
    var approved = false;
    if (getPath.rows[0].path == null) {
      approved = true;
    }
    const query = await pool.query(
      "INSERT INTO certificate_application(admission_no,certificate_id,date,approved,rejected,status,application_form) VALUES($1,$2,$3,$4,FALSE,0,$5) RETURNING *",
      [user_id, certificate_id, date, approved, applicationform]
    );
    console.log(query);

    notification.notifyEmail(
      query.rows[0].admission_no,
      query.rows[0].certificate_id,
      query.rows[0].status,
      getPath.rows[0].path
    );
    res.send("success");
  } catch (e) {
    console.error(e);
  }
};

const viewCertificates = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const certificates = await pool.query(
      "SELECT CA.application_id,CA.certificate_id,CA.date,C.name,CA.approved,CA.rejected,CA.status,CA.feedback,CA.application_form,p.path FROM certificate_application as CA,certificates as C,path as P WHERE admission_no=$1 AND CA.certificate_id=C.certificate_id and C.pathno=P.pathno",
      [user_id]
    );
    console.log(certificates.rows);
    res.json(certificates.rows);
  } catch (e) {
    console.error(e);
  }
};

/////////////     MESS OUT FUNCTIONALITIES //////////////////////////////////

const checkmessout = async (req, res) => {
  try {
    const { user_id, hostel } = req.body;
    const getadmno = await pool.query(
      "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
      [user_id]
    );
    const date = new Date();
    const today = dateConverter(date);
    const datemonth = today[5] + today[6];
    const hostel_admno = getadmno.rows[0].hostel_admission_no;
    const updateMessTable = await pool.query(
      "update messout set showtodate=true where todate<=current_date+1 "
    );
    const messout = await pool.query(
      "select * from messout where hostel_admission_no=$1 and todate>$2",
      [hostel_admno, today]
    );
    const countperMonth = await pool.query(
      `select  sum(case 
        when extract('month' from fromdate)=extract('month' from current_date) and extract('month' from todate)=extract('month' from current_date)  then (case when todate>current_date then  current_date- fromdate else todate-fromdate end) 
        when extract('month' from fromdate)=extract('month' from current_date)-1 and extract('month' from todate)=extract('month' from current_date) then (case when todate>current_date then extract('day' from current_date)-1 else extract('day' from todate)-1 end) 
        when extract('month' from fromdate)=extract('month' from current_date) and extract('month' from todate)=extract('month' from current_date)+1  then (case when todate>current_date then  current_date- fromdate else todate-fromdate end) 
        end) as  countpermonth from messout where fromdate<current_date and hostel_admission_no=$1`,
      [hostel_admno]
    );
    console.log("users messout for this month ==  ", countperMonth.rows[0]);
    let permissibledays = 0,
    day1 = 10000,
    day2 = 10000;
    let max_count_month=0;
    let max_mess_in_stretch=0;
      if(hostel=="MH"){
        const max_count_month_query=await pool.query("select * from messrequirements where key='messout_days_max_in_month'")
        max_count_month=max_count_month_query.rows[0].value;
        const max_count_in_Stretch_query=await pool.query("select * from messrequirements where key='messoutdaysmaximum'")
        max_mess_in_stretch=max_count_in_Stretch_query.rows[0].value;        

      }
      else if(hostel=="LH"){
        const max_count_month_query=await pool.query("select * from messrequirementsLH where key='messout_days_max_in_month'")
        max_count_month=max_count_month_query.rows[0].value;
        const max_count_in_Stretch_query=await pool.query("select * from messrequirementsLH where key='messoutdaysmaximum'")
        max_mess_in_stretch=max_count_in_Stretch_query.rows[0].value; 

      }
    // const query =
    //   hostel === "MH"
    //     ? "select * from messrequirements where key='messout_days_max_in_month' union select * from messrequirements where key='messoutdaysmaximum'; "
    //     : "select * from messrequirementsLH where key='messout_days_max_in_month' union select * from messrequirementsLH where key='messoutdaysmaximum' order by key";
    // const messrequirements = await pool.query(query);
    // console.log(messrequirements.rows[0],"in month");
    // console.log(messrequirements.rows[1],"in days");
    if (max_count_month> 0) {
      day1 =max_count_month;
      if (countperMonth.rowCount > 0) {
        if (
          countperMonth.rows[0].countpermonth < max_count_month
        ) {
          day1 =
          max_count_month -
            countperMonth.rows[0].countpermonth;
        } else {
          day1 = -1;
        }
      }
    }
    if (max_mess_in_stretch > 0) {
      day2 = max_mess_in_stretch;
    }

    (day1 == day2) == 10000
      ? (permissibledays = permissibledays)
      : day1 < day2
      ? (permissibledays = day1)
      : (permissibledays = day2);

    console.log("permissible days in this STRETCH ", permissibledays);

    if (messout.rowCount < 1) {
      return res.send({
        status: "ok",
        msg: "obtained status",
        monthlyMessoutCount: 0,
        AllowableDays: permissibledays,
        isMessout: false,
        currentMessoutDetails: null,
        hasUpcomingMessout: false,
        upcomingMessoutDetails: null,
      });
    }
    const d = new Date(messout.rows[0].fromdate);
    d.setDate(d.getDate() - 1);
    if (dateConverter(d) <= today) {
      return res.send({
        status: "ok",
        msg: "obtained status",
        monthlyMessoutCount: countperMonth,
        AllowableDays: permissibledays,
        isMessout: true,
        currentMessoutDetails: messout.rows[0],
        hasUpcomingMessout: false,
        upcomingMessoutDetails: null,
      });
    }

    return res.send({
      status: "ok",
      msg: "obtained status",
      monthlyMessoutCount: countperMonth,
      AllowableDays: permissibledays,
      isMessout: false,
      currentMessoutDetails: null,
      hasUpcomingMessout: true,
      upcomingMessoutDetails: messout.rows[0],
    });
  } catch (err) {
    console.log(err.message);
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};

const checkMessOut = async (req, res) => {
    try {
      const { user_id, hostel } = req.body;
      const getadmno = await pool.query(
        "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
        [user_id]
      );
      const hostel_admno = getadmno.rows[0].hostel_admission_no;
      const updateMessTable = pool.query(
        "update messout set showtodate=true where todate<=current_date "
      );
      const messout = await pool.query(
        "select fromdate,todate,messout_id from messout where hostel_admission_no=$1 and showtodate=false",
        [hostel_admno]
      );
      const date=new Date();
      const today=dateConverter(date);
      const datemonth=today[5]+today[6]
      //const date=req.query.date+"-"+18
      const countperMonth=await pool.query("select m.hostel_admission_no,u.name,sum(case when extract(month from fromdate) = $1 then case when current_date>=todate then todate+1-fromdate else case when current_date>=fromdate then current_date+1-fromdate end end else case when extract(month from todate) = $1 then extract(day from todate) end end) as countpermonth from messout as m,users as u,inmate_table it where fromdate<=current_date and it.hostel_admission_no=m.hostel_admission_no and u.user_id=it.admission_no and m.hostel_admission_no=$2 group by m.hostel_admission_no,u.name;",[datemonth,hostel_admno]);
  
      let permissibledays = 0,
        day1 = 10000,
        day2 = 10000;
      const query =
        hostel === "MH"
          ? "select value from messrequirements where key='messout_days_max_in_month' or key='messoutdaysmaximum'"
          : "select value from messrequirementsLH where key='messout_days_max_in_month' or key='messoutdaysmaximum'";
      const messrequirements = await pool.query(query);
      if (messrequirements.rows[0].value > 0) {
        if (countperMonth.rowCount > 0) {
          if (
            countperMonth.rows[0].countpermonth < messrequirements.rows[0].value
          ) {
            day1 =
              messrequirements.rows[0].value -
              countperMonth.rows[0].countpermonth;
          } else {
              console.log("pro");
            throw new Error("exceeded monthly limit");
          }
        }
      }
      if (messrequirements.rows[1].value > 0) {
        day2 = messrequirements.rows[1].value;
      }
  
      (day1 == day2) == 10000
        ? (permissibledays = permissibledays)
        : day1 < day2
        ? (permissibledays = day1)
        : (permissibledays = day2);
      if (messout.rows.length > 0) {
          console.log({
              AllowableDays: permissibledays,
              NomessOutDaysinMonth:countperMonth.rowCount > 0?countperMonth.rows[0].countpermonth:0,
              isMessout: true,
              status: true,
              data: messout.rows[0],
            },"condition where a mess out with fromdate is waiting or is occuring currently ");
        res.json({
          AllowableDays: permissibledays,
          NomessOutDaysinMonth:countperMonth.rowCount > 0?countperMonth.rows[0].countpermonth:0,
          isMessout: true,
          status: true,
          data: messout.rows[0],
          messout_id:messout.rows[0].messout_id,
        });
      } else {
        const checkIsEditable = await pool.query(
          "select * from messout where todate>current_date and hostel_admission_no=$1",
          [hostel_admno]
        );
        const messoutHistory=await pool.query(
          "select * from messout where hostel_admission_no=$1",
          [hostel_admno]
        );
        if (checkIsEditable.rowCount > 0 && messoutHistory.rowCount>0) {
          console.log({
              AllowableDays: permissibledays,
              fromdate: checkIsEditable.rows[0].fromdate,
              todate: checkIsEditable.rows[0].todate,
              messout_id:checkIsEditable.rows[0].messout_id,
              isMessout: false,
              status: false,
              iseditable: false,
            },"condition where messout is waiting with both the mess in and mess out days entered")
          res.json({
              AllowableDays: permissibledays,
              messout_id:checkIsEditable.rows[0].messout_id,
            fromdate: checkIsEditable.rows[0].fromdate,
            todate: checkIsEditable.rows[0].todate,
            isMessout: false,
            status: false,
            iseditable: false,
          });
        } else {
          console.log({
              NomessOutDaysinMonth:countperMonth.rowCount > 0?countperMonth.rows[0].countpermonth:0,
              AllowableDays: permissibledays,
              isMessout: false,
              status: false,
              iseditable: true,
            },"condition where he can apply for new messout");
          res.json({
            NomessOutDaysinMonth:countperMonth.rowCount > 0?countperMonth.rows[0].countpermonth:0,
            AllowableDays: permissibledays,
            isMessout: false,
            status: false,
            iseditable: true,
          });
        }
      }
    } catch (err) {
      console.log(err.message,'hy');
      res.status(200).json({
        status: "failed",
        msg: "exceeded monthly limit cannot apply for messout",
      });
    }
  };
  
//   const applyMessOut = async (req, res) => {
//     try {
//       const { user_id, fromDate, toDate, hostel } = req.body;
//       const getadmno = await pool.query(
//         "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
//         [user_id]
//       );
//       const hostel_admno = getadmno.rows[0].hostel_admission_no;
//        const query =
//         hostel === "MH"
//           ? "select value from messrequirements where key='messoutdays'"
//           : "select value from messrequirementsLH where key='messoutdays'";
//       // const messrequirements = await pool.query(query);
//       const messOutHistory2 = await pool.query(
//         " select count(*) from messout where $1 between fromdate and todate and hostel_admission_no=$2",
//         [fromDate, hostel_admno]
//       );
//       if (messOutHistory2.rows[0].count > 0) {
//         throw new Error("Seems like applied for an existing messout days");
//       }
//       const messout = await pool.query(
//         "INSERT INTO messout VALUES($1,$2,$3,false) RETURNING *",
//         [hostel_admno, fromDate, toDate]
//       );
//       res.status(200).json({
//         status: "ok",
//         msg: "succesfully requested messout",
//         data: messout.rows,
//       });
//     } catch (e) {
//       res.json({
//         status: "failed",
//         msg: e.message,
//       });
//       console.log(e.message);
//     }
//   };
  
//   const applyMessIn=async(req,res)=>{
//       try{
//           const messout_id=req.body.messout_id;
//           const todate=req.body.toDate;
//           const updateMessout=await pool.query("update messout set todate=$1,showtodate=true where messout_id=$2 returning *",[todate,messout_id])
//           if(updateMessout.rowCount<1){
//               throw new Error("no record found");
  
//           }
//           res.send({
//               status:'ok',
//               msg:"successfully updated the record",
//               data:updateMessout.rows[0]
      
//       })
  
//       }catch(err){
//           res.send({
//               status:'failed',
//               msg:err.message
//           })
//       }
//   }
  
//   const editMessoutFromDate = async (req, res) => {
//       try{
//           const messout_id=req.body.messout_id;
//           const fromdate=req.body.fromDate;
//           const todate=req.body.toDate;
//           const update=await pool.query("update messout set fromdate=$1,todate=$2 where messout_id=$3 returning *",[fromdate,todate,messout_id])
//           console.log(update)
//           if(update.rowCount<1)
//           throw new Error("no record found");
//           res.send({
//               status:"ok",
//               msg:"succesfully updated the messout",
//               data:update.rows[0]
//           })
//       }catch(err){
//           res.send({
//               status:"failed",
//               msg:err.message
//           })
//       }
//   }
//   const applyMessin = async (req, res) => {
//     try {
//       const { user_id, toDate } = req.body;
//       const getadmno = await pool.query(
//         "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
//         [user_id]
//       );
//       const hostel_admno = getadmno.rows[0].hostel_admission_no;
//       const messout = await pool.query(
//         "update messout set todate=$1,showtodate=true where hostel_admission_no=$2 and showtodate=false returning *",
//         [toDate, hostel_admno]
//       );
//       const tdate = new Date(messout.rows[0].todate);
//       const fdate = new Date(messout.rows[0].fromdate);
//       const dif = (tdate.getTime() - fdate.getTime()) / (1000 * 3600 * 24) + 1;
//       const updateCumulativeCount = await pool.query(
//         "update cumulativemessoutinmate set  countpermonth=countpermonth+$1 where hostel_admission_no=$2 ",
//         [dif, hostel_admno]
//       );
//       // res.json(messout.rows[0])
//       res.json({
//         status: "ok",
//         msg: "succcesfully send mess in request",
//         data: messout,
//       });
//     } catch (err) {
//       res.json({
//         status: "failed",
//         msg: err.message,
//       });
//     }
//   };
  
//   const viewMessBill = async (req, res) => {
//     try {
//       const query = await pool.query(
//         `select * from messbill where hostel_admission_no=(select hostel_admission_no from inmate_table where admission_no=$1)`,
//         [req.query.user_id]
//       );
//       res.json(query.rows);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const editMessoutData = async (req, res) => {
//     try {
//       const todate = req.body.todate;
//       const editedMessoutFromdate = req.body.editedMessoutFromdate;
//       const editedMessouttodate = req.body.editedMessouttodate;
//       const { user_id, hostel } = req.body;
//       const getadmno = await pool.query(
//         "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
//         [user_id]
//       );
//       const hostel_admno = getadmno.rows[0].hostel_admission_no;
//       const updateMessTable = pool.query(
//         "update messout set showtodate=true where todate<=current_date and hostel_admission_no=$1",
//         [hostel_admno]
//       );
//       const messout = await pool.query(
//         "select fromdate,todate from messout where hostel_admission_no=$1 and showtodate=false",
//         [hostel_admno]
//       );
//       const date=new Date();
//       const today=dateConverter(date);
//       const datemonth=today[5]+today[6]
//       const countperMonth=await pool.query("select m.hostel_admission_no,u.name,sum(case when extract(month from fromdate) = $1 then case when current_date>=todate then todate+1-fromdate else case when current_date>=fromdate then current_date+1-fromdate end end else case when extract(month from todate) = $1 then extract(day from todate) end end) as countpermonth from messout as m,users as u,inmate_table it where fromdate<=current_date and it.hostel_admission_no=m.hostel_admission_no and u.user_id=it.admission_no and m.hostel_admission_no=$2 group by m.hostel_admission_no,u.name;",[datemonth,hostel_admno]);
//       let permissibledays = 0,
//         day1 = 10000,
//         day2 = 10000;
//       const query =
//         hostel === "MH"
//           ? "select value from messrequirements where key='messout_days_max_in_month' or key='messoutdaysmaximum'"
//           : "select value from messrequirementsLH where key='messout_days_max_in_month' or key='messoutdaysmaximum'";
//       const minimumValueQUery=hostel ==="MH" ? "select value from messrequirements where key='messoutdays'": "select value from messrequirementsLH where key='messoutdays'";
//       const minimumValue=await pool.query(minimumValueQUery);
//       const messrequirements = await pool.query(query); //mess requiremets.rows has first month max value and then mess out max
//       if (messrequirements.rows[1].value > 0) {
//         if (countperMonth.rowCount > 0) {
//           if (
//             countperMonth.rows[0].countpermonth < messrequirements.rows[0].value
//           ) {
//             day1 =
//               messrequirements.rows[0].value -
//               countperMonth.rows[0].countpermonth;
//               if((todate - today) /(1000 * 3600 * 24) + 1>day1){
//                   throw new Error("exceeded monthly limit");
//               }
//           } else {
//             throw new Error("exceeded monthly limit");
//           }
//         }
//       }
//       if (messrequirements.rows[1].value > 0) {
//         day2 = messrequirements.rows[1].value;
//       }
  
//       (day1 == day2) == 10000
//         ? (permissibledays = permissibledays)
//         : day1 < day2
//         ? (permissibledays = day1)
//         : (permissibledays = day2);
//       const Fromdate = new Date(editedMessoutFromdate);
//       const Todate = new Date(editedMessouttodate);
//       console.log("hyy",permissibledays, (Todate - Fromdate) / (1000 * 3600 * 24) + 1);
//       if (permissibledays < (Todate - Fromdate) / (1000 * 3600 * 24)) {
//           console.log("exceeded monthly limit");
//         throw new Error("exceeded monthly limit");
//       }
//       else if((Todate - Fromdate) / (1000 * 3600 * 24) + 1<minimumValue.rows[0].value){
//           console.log("Date selected is low");
//           throw new Error("Date selected is low")
//       }
//       //update messout set fromdate=$1 and todate=$2
//       else {
//         const EditedFromdate = dateConverter(editedMessoutFromdate);
//         const EditedTodate = dateConverter(editedMessouttodate);
  
//         const EditData = await pool.query(
//           "update messout set fromdate=$1,todate=$2  where hostel_admission_no=$3 and fromdate=$4 and todate=$5 returning *",
//           [EditedFromdate, EditedTodate, hostel_admno,dateConverter(req.body.fromdate),dateConverter(req.body.todate)]
//         );
//         res.send({
//           status: "ok",
//           msg: "updated mess data",
//           data: EditData.rows,
//         });
//       }
//     } catch (err) {
//       res.send({
//         status: "failed",
//         msg: "error updating mess data",
//       });
//     }
//   };
  
//   const editPrevMessData = async (req, res) => {
//     try {
//       const fromdate = req.body.prevfromdate;
//       const todate = req.body.prevtodate;
//       const newfromdate = req.body.newfromdate;
//       const newtodate = req.body.newtodate;
//       const user_id=req.body.user_id;
//       console.log(dateConverter(fromdate), dateConverter(todate),dateConverter(newfromdate), dateConverter(newtodate));
//       const getadmno = await pool.query(
//           "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
//           [user_id]
//         );
//       const hostel_admno = getadmno.rows[0].hostel_admission_no;
//       const update=await pool.query("update messout set fromdate=$4,todate=$5 where hostel_admission_no=$1 and fromdate=$2 and todate=$3 returning *",[hostel_admno,dateConverter(fromdate),dateConverter(todate),dateConverter(newfromdate),dateConverter(newtodate)])
//       console.log(update.rows)
//       res.send({
//           data:update.rows,
//           status:"ok"
//       })
//     } catch (err) {
//       res.send({
//         status: "failed",
//         failed: err.message,
//       });
//     }
//   };

const applyMessOut = async (req, res) => {
  try {
    const { user_id, fromDate, toDate, hostel } = req.body;
    await pool.query("begin")
    const getadmno = await pool.query(
      "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
      [user_id]
    );
    const hostel_admno = getadmno.rows[0].hostel_admission_no;

    const messOutHistory2 = await pool.query(
      " select count(*) from messout where $1 between fromdate and todate and hostel_admission_no=$2",
      [fromDate, hostel_admno]
    );
    if (messOutHistory2.rows[0].count > 0) {
      throw new Error("Seems like applied for an existing messout days");
    }
    
    const messout = await pool.query(
      "INSERT INTO messout VALUES($1,$2,$3,false) RETURNING *",
      [hostel_admno, fromDate, toDate]
    );
    const messout_count=await get_inmate_messout_count_month(hostel_admno)
    const query =
    hostel === "MH"
      ? "select value from messrequirements where key='messout_days_max_in_month'"
      : "select value from messrequirementsLH where key='messout_days_max_in_month'";
    const max_messout_count_month_query=await pool.query(query)
    const max_messout_count_month=max_messout_count_month_query.rows[0].value
    if(messout_count>max_messout_count_month)
    throw new Error("Oops cannot apply for this dates ")
    await pool.query("commit")
    console.log("mess out application log commited ")
    res.status(200).send({
      status: "ok",
      msg: "succesfully requested messout",
      data: messout.rows,
    });
  } catch (e) {
    await pool.query("rollback")
    console.log(e.message)
    res.status(400).send({
      status: "failed",
      msg: e.message,
    });
  }
};

const applyMessIn = async (req, res) => {
  try {
    const messout_id = req.body.messout_id;
    const user_id=req.body.user_id;
    const hostel=req.body.hostel;
    const todate = req.body.toDate;
    const getadmno = await pool.query(
        "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
        [user_id]
      );
    const hostel_admno = getadmno.rows[0].hostel_admission_no;
    await pool.query("begin")
    
    const updateMessout = await pool.query(
      "update messout set todate=$1,showtodate=true where messout_id=$2 and hostel_admission_no=$3 returning *",
      [todate, messout_id,hostel_admno]
    );

    if (updateMessout.rowCount < 1) {
        throw new Error("no record found");
      }
    const messout_count=await get_inmate_messout_count_month(hostel_admno)
    const query =
    hostel === "MH"
      ? "select value from messrequirements where key='messout_days_max_in_month'"
      : "select value from messrequirementsLH where key='messout_days_max_in_month'";
    const max_messout_count_month_query=await pool.query(query)
    const max_messout_count_month=max_messout_count_month_query.rows[0].value
    if(messout_count>max_messout_count_month)
    throw new Error("oops cannot apply for the given date");
    await pool.query("commit")
    res.send({
      status: "ok",
      msg: "successfully updated the record",
      data: updateMessout.rows[0],
    });
  } catch (err) {
    console.log(err.message)
    await pool.query("rollback")
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};

const editMessoutFromDate = async (req, res) => {
  try {
    const messout_id = req.body.messout_id;
    const user_id=req.body.user_id;
    const hostel=req.body.hostel;
    const getadmno = await pool.query(
        "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
        [user_id]
      );
    const hostel_admno = getadmno.rows[0].hostel_admission_no;
    const fromdate = req.body.fromDate;
    const todate = req.body.toDate;
    await pool.query("begin")
    const update = await pool.query(
      "update messout set fromdate=$1,todate=$2 where messout_id=$3 and hostel_admission_no=$4 returning *",
      [fromdate, todate, messout_id,hostel_admno]
    );
    if (update.rowCount < 1) 
    throw new Error("no record found");
    const messout_count=await get_inmate_messout_count_month(hostel_admno)
    const query =
    hostel === "MH"
      ? "select value from messrequirements where key='messout_days_max_in_month'"
      : "select value from messrequirementsLH where key='messout_days_max_in_month'";
    const max_messout_count_month_query=await pool.query(query)
    const max_messout_count_month=max_messout_count_month_query.rows[0].value
    if(messout_count>max_messout_count_month)
    throw new Error("oops cannot apply for the given date");
    await pool.query("commit")
    res.send({
      status: "ok",
      msg: "succesfully updated the messout",
      data: update.rows[0],
    });
  } catch (err) {
    await pool.query("rollback")
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};


/////////////     MESS OUT FUNCTIONALITIES //////////////////////////////////

const viewMessBill = async (req, res) => {
  try {
    const query = await pool.query(
      `select * from messbill where hostel_admission_no=(select hostel_admission_no from inmate_table where admission_no=$1)`,
      [req.query.user_id]
    );
    res.json(query.rows);
  } catch (e) {
    console.log(e);
  }
};
const editMessoutData = async (req, res) => {
  try {
    const todate = req.body.todate;
    const editedMessoutFromdate = req.body.editedMessoutFromdate;
    const editedMessouttodate = req.body.editedMessouttodate;
    const { user_id, hostel } = req.body;
    const getadmno = await pool.query(
      "SELECT hostel_admission_no FROM inmate_table WHERE admission_no=$1",
      [user_id]
    );
    const hostel_admno = getadmno.rows[0].hostel_admission_no;
    const updateMessTable = pool.query(
      "update messout set showtodate=true where todate<=current_date and hostel_admission_no=$1",
      [hostel_admno]
    );
    const messout = await pool.query(
      "select fromdate,todate from messout where hostel_admission_no=$1 and showtodate=false",
      [hostel_admno]
    );
    const date = new Date();
    const today = dateConverter(date);
    const datemonth = today[5] + today[6];
    const countperMonth = await pool.query(
      "select m.hostel_admission_no,u.name,sum(case when extract(month from fromdate) = $1 then case when current_date>=todate then todate+1-fromdate else case when current_date>=fromdate then current_date+1-fromdate end end else case when extract(month from todate) = $1 then extract(day from todate) end end) as countpermonth from messout as m,users as u,inmate_table it where fromdate<=current_date and it.hostel_admission_no=m.hostel_admission_no and u.user_id=it.admission_no and m.hostel_admission_no=$2 group by m.hostel_admission_no,u.name;",
      [datemonth, hostel_admno]
    );
    let permissibledays = 0,
      day1 = 10000,
      day2 = 10000;
    const query =
      hostel === "MH"
        ? "select value from messrequirements where key='messout_days_max_in_month' or key='messoutdaysmaximum'"
        : "select value from messrequirementsLH where key='messout_days_max_in_month' or key='messoutdaysmaximum'";
    const minimumValueQUery =
      hostel === "MH"
        ? "select value from messrequirements where key='messoutdays'"
        : "select value from messrequirementsLH where key='messoutdays'";
    const minimumValue = await pool.query(minimumValueQUery);
    const messrequirements = await pool.query(query); //mess requiremets.rows has first month max value and then mess out max
    if (messrequirements.rows[1].value > 0) {
      if (countperMonth.rowCount > 0) {
        if (
          countperMonth.rows[0].countpermonth < messrequirements.rows[0].value
        ) {
          day1 =
            messrequirements.rows[0].value -
            countperMonth.rows[0].countpermonth;
          if ((todate - today) / (1000 * 3600 * 24) + 1 > day1) {
            throw new Error("exceeded monthly limit");
          }
        } else {
          throw new Error("exceeded monthly limit");
        }
      }
    }
    if (messrequirements.rows[1].value > 0) {
      day2 = messrequirements.rows[1].value;
    }

    (day1 == day2) == 10000
      ? (permissibledays = permissibledays)
      : day1 < day2
      ? (permissibledays = day1)
      : (permissibledays = day2);
    const Fromdate = new Date(editedMessoutFromdate);
    const Todate = new Date(editedMessouttodate);
    console.log(
      "hyy",
      permissibledays,
      (Todate - Fromdate) / (1000 * 3600 * 24) + 1
    );
    if (permissibledays < (Todate - Fromdate) / (1000 * 3600 * 24)) {
      console.log("exceeded monthly limit");
      throw new Error("exceeded monthly limit");
    } else if (
      (Todate - Fromdate) / (1000 * 3600 * 24) + 1 <
      minimumValue.rows[0].value
    ) {
      console.log("Date selected is low");
      throw new Error("Date selected is low");
    }
    //update messout set fromdate=$1 and todate=$2
    else {
      const EditedFromdate = dateConverter(editedMessoutFromdate);
      const EditedTodate = dateConverter(editedMessouttodate);

      const EditData = await pool.query(
        "update messout set fromdate=$1,todate=$2  where hostel_admission_no=$3 and fromdate=$4 and todate=$5 returning *",
        [
          EditedFromdate,
          EditedTodate,
          hostel_admno,
          dateConverter(req.body.fromdate),
          dateConverter(req.body.todate),
        ]
      );
      res.send({
        status: "ok",
        msg: "updated mess data",
        data: EditData.rows,
      });
    }
  } catch (err) {
    res.send({
      status: "failed",
      msg: "error updating mess data",
    });
  }
};


const messOutRequests = async (req, res) => {
  try {
    let requests = await pool.query(
      `SELECT mo.hostel_admission_no,mo.fromdate,mo.todate,u.name from messout as mo,inmate_table as it,inmate_room as ir,hostel_room as hr,hostel_blocks as hb,users as u
        WHERE mo.hostel_admission_no=it.hostel_admission_no AND it.admission_no = u.user_id AND it.hostel_admission_no=ir.hostel_admission_no AND ir.room_id=hr.room_id
        AND hr.block_id=hb.block_id AND hb.hostel=$1 order by mo.hostel_admission_no`,
      [req.query.hostel]
    );
    if (req.query.date != 0) {
      requests = await pool.query(
        `SELECT mo.hostel_admission_no,mo.fromdate,mo.todate,u.name,hr.room_no,hb.block_name from messout as mo,inmate_table as it,inmate_room as ir,hostel_room as hr,hostel_blocks as hb,users as u
              WHERE mo.hostel_admission_no=it.hostel_admission_no AND it.admission_no = u.user_id AND it.hostel_admission_no=ir.hostel_admission_no AND ir.room_id=hr.room_id
              AND hr.block_id=hb.block_id AND hb.hostel=$1 AND $2 >=fromdate and $2<todate order by mo.hostel_admission_no`,
        [req.query.hostel, req.query.date]
      );
    }
    res.json(requests);
  } catch (e) {
    console.log(e);
  }
};

const currentMessInmates = async (req, res) => {
  try {
    const hostel = req.query.hostel;
    const date = new Date(req.query.date);
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    let year = date.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    const inputdate = [year, month, day].join("-");
    const query = await pool.query(
      `SELECT users.name,inmate_table.hostel_admission_no, hostel_room.room_no,hostel_blocks.block_name
        FROM inmate_table,users,inmate_room,hostel_room,hostel_blocks
        WHERE inmate_table.hostel_admission_no NOT IN(SELECT messout.hostel_admission_no from messout where $1 >= messout.fromdate and $1<messout.todate)
        and inmate_table.admission_no = users.user_id 
        and inmate_table.hostel_admission_no = inmate_room.hostel_admission_no 
        and inmate_room.room_id = hostel_room.room_id 
        and hostel_room.block_id = hostel_blocks.block_id
        and hostel_blocks.hostel=$2`,
      [inputdate, hostel]
    );

    res.send(query.rows);
  } catch (e) {
    console.log(e);
  }
};

const uploadMessBill = async (req, res) => {
  try {
    console.log(req.body);
    req.body.jsonData.map(async (item) => {
      const query = await pool.query(
        "INSERT INTO messbill(hostel_admission_no,month,attendance,mess_charge,extras,feast,lf,af,total,dues) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        [
          item.Hostel_Admission_No,
          req.body.date.toString(),
          item.Attendance,
          item.Mess_Charge,
          item.Extras,
          item.Feast,
          item.LF,
          item.AF,
          item.Total,
          item.Dues,
        ]
      );
      console.log(query);
      res.send("Success");
    });
  } catch (e) {
    console.log(e);
  }
};

const cancelMessOut = async (req, res) => {
  try {
    const { user_id, messout_id } = req.body;
    const record = await pool.query(
      "select * from messout where messout_id=$1 and (fromdate >current_date or todate<current_date)",
      [messout_id]
    );
    if (record.rowCount < 1) {
      throw new Error("no record found");
    }
    const query = await pool.query(
      "DELETE FROM messout WHERE hostel_admission_no=(SELECT hostel_admission_no from inmate_table where admission_no=$1) and messout_id=$2 returning *",
      [user_id, messout_id]
    );
    res.send({
      status: "ok",
      msg: "successfully deleted the record",
    });
  } catch (e) {
    res.send({
      status: "failed",
      msg: e.message,
    });
  }
};

//////////////// MESS OUT FUNCTIONS /////////////////////////////////////////

//////////////////// MESS SPECIAL EVENTS FUNCTIONS  /////////////////////////////////

const add_mess_special_mess_events = async (req, res) => {
  try {
    const event_date = req.body.event_date;
    const book_before_date = req.body.book_before_date;
    const item = req.body.item;
    const served_time = req.body.served_time;
    console.log(req.body);

    const create_event_query = await pool.query(
      "insert into mess_special_events(event_date,book_before_date,item,served_time) values($1,$2,$3,$4) returning *",
      [event_date, book_before_date, item, served_time]
    );
    if (create_event_query.rowCount < 1)
      throw new Error("something went wrong");
    res.status(201).send({
      status: "ok",
      msg: "event created successfully",
    });
  } catch (err) {
    console.log("error occured ", err.message);
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const get_mess_special_events = async (req, res) => {
  try {
    const status =
      typeof req.query.status === "undefined" ? "0" : req.query.status;
    console.log(status);
    const date = new Date();
    const today = dateConverter(date);
    let get_mess_special_event_query;
    switch (status) {
      case "0": {
        get_mess_special_event_query = await pool.query(
          "select * from mess_special_events"
        );
        break;
      }
      case "1": {
        get_mess_special_event_query = await pool.query(
          "select * from mess_special_events where event_date<$1",
          [today]
        );
        break;
      }
      case "2": {
        get_mess_special_event_query = await pool.query(
          "select * from mess_special_events where event_date>=$1",
          [today]
        );
        break;
      }
      default: {
        throw new Error("invalid Status");
      }
    }
    res.status(200).send({
      data: get_mess_special_event_query.rows,
      msg: "got the mess special events",
      status: "ok",
    });
  } catch (err) {
    console.log("error occured ", err.message);
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const get_event_bookings = async (req, res) => {
  try {
    const event_id = req.query.event_id;
    console.log(event_id);
    const get_bookings_query = await pool.query(
      "select mseb.id,u.name,it.hostel_admission_no,mseb.created_at from mess_special_event_bookings mseb,users u,inmate_table it where mseb.event_id=$1 and mseb.hostel_admission_no=it.hostel_admission_no and it.admission_no=u.user_id",
      [event_id]
    );
    res.status(200).send({
      status: "ok",
      msg: "got the booking",
      data: get_bookings_query.rows,
    });
  } catch (err) {
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const inmate_purchase_mess_special_events = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const event_id = req.body.event_id;
    console.log(req.body);
    const hostel_admission_no_query = await pool.query(
      "select * from inmate_table where admission_no=$1",
      [user_id]
    );
    if (hostel_admission_no_query.rowCount < 1)
      throw new Error("Inmate Data not found");
    const hostel_admission_no =
      hostel_admission_no_query.rows[0].hostel_admission_no;
    const insert_event_purchase = await pool.query(
      "insert into mess_special_event_bookings(hostel_admission_no,event_id) values ($1,$2) returning *",
      [hostel_admission_no, event_id]
    );
    if (insert_event_purchase.rowCount < 1)
      throw new Error("could not complete request");
    res.status(201).send({
      status: "failed",
      msg: "added the booking",
    });
  } catch (err) {
    console.log("Error occured ", err.message);
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const cancel_purchase_mess_special_events = async (req, res) => {
  try {
    console.log("hy");
    const user_id = req.body.user_id;
    const event_id = req.body.event_id;
    console.log(req.body);
    const hostel_admission_no_query = await pool.query(
      "select * from inmate_table where admission_no=$1",
      [user_id]
    );
    if (hostel_admission_no_query.rowCount < 1)
      throw new Error("Inmate Data not found");
    const hostel_admission_no =
      hostel_admission_no_query.rows[0].hostel_admission_no;
    const insert_event_purchase = await pool.query(
      "delete from mess_special_event_bookings where hostel_admission_no=$1 and event_id=$2 returning *",
      [hostel_admission_no, event_id]
    );
    if (insert_event_purchase.rowCount < 1)
      throw new Error("No booking found for deleting");
    res.status(201).send({
      status: "failed",
      msg: "canceled  the booking",
    });
  } catch (err) {
    console.log("Error occured ", err.message);
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const get_inmate_mess_special_events = async (req, res) => {
  try {
    /////////   TO REPRESENT ACTIVE  PURCHASES AND OTHERS //////////////////////
    const status =
      typeof req.query.status === "undefined" ? "0" : req.query.status;

    const purchased =
      typeof req.query.purchased === "undefined" ? "0" : req.query.purchased;
    const user_id = req.query.user_id;
    const hostel_admission_no_query = await pool.query(
      "select * from inmate_table where admission_no=$1",
      [user_id]
    );
    if (hostel_admission_no_query.rowCount < 1)
      throw new Error("Inmate Data not found");
    const hostel_admission_no =
      hostel_admission_no_query.rows[0].hostel_admission_no;

    let mess_special_events_query;
    switch (purchased) {
      case "0": {
        ////////GET THE EVENTS TO BE PURCHASED BY THE INMATE /////////////
        mess_special_events_query = await pool.query(
          "select * from mess_special_events mse where book_before_date>current_date and id not in (select event_id from mess_special_event_bookings where hostel_admission_no=$1) order by event_date desc",
          [hostel_admission_no]
        );
        break;
      }
      case "1": {
        if (status == "1") {
          /// THIS WILL GET ONLY THE ACTIVE PURCHASES OF THE IMATE ///////////////////////////
          mess_special_events_query = await pool.query(
            "select * from mess_special_events where event_date>=current_date and id in (select event_id from mess_special_event_bookings where hostel_admission_no=$1) order by event_date desc",
            [hostel_admission_no]
          );
        } else {
          /// THIS WILL GET  ALL THE PURCHASES OF THE IMATE ///////////////////////////
          mess_special_events_query = await pool.query(
            "select * from mess_special_events where id in (select event_id from mess_special_event_bookings where hostel_admission_no=$1) order by event_date desc",
            [hostel_admission_no]
          );
        }
        break;
      }
      default: {
        throw new Error("invalid status");
      }
    }
    console.log(mess_special_events_query.rows);
    res.status(200).send({
      status: "ok",
      msg: "Got the mess events",
      data: mess_special_events_query.rows,
    });
  } catch (err) {
    console.log("error occured ", err.message);
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const get_inmate_purchase_history = async (req, res) => {
  try {
    const is_active = req.query.is_active;
    const user_id=req.query.user_id;
    const hostel_admission_no_query=await pool.query("select * from inmate_table where admission_no=$1",[user_id]);
    if(hostel_admission_no_query.rowCount<1)
    throw new Error("invalid User id")
    const hostel_admission_no = hostel_admission_no_query.rows[0].hostel_admission_no;
    let inmate_purchase_history;
    switch (is_active) {
      case '1': {
        inmate_purchase_history = await pool.query(
          "select mseb.id as booking_id,mse.event_date,mse.event_price,mse.item,mse.served_time,mseb.created_at as booking_date from mess_special_events mse,mess_special_event_bookings mseb where mseb.hostel_admission_no=$1 and mseb.event_id=mse.id and mse.event_date>=current_date order by mse.event_date desc ",
          [hostel_admission_no]
        );
        break;
      }
      default: {
        inmate_purchase_history = await pool.query(
          "select mseb.id as booking_id,mse.event_date,mse.item,mse.event_price,mse.served_time,mseb.created_at as booking_date from mess_special_events mse,mess_special_event_bookings mseb where mseb.hostel_admission_no=$1 and mseb.event_id=mse.id order by mse.event_date desc ",
          [hostel_admission_no]
        );
        break;
      }
    }
    res.status(200).send({
        status:"ok",
        msg:"got the booking history",
        data:inmate_purchase_history.rows
    })
  } catch (err) {
    console.log("error occured  " + err.message);
    res.status(400).send({
      status: "failed",
      msg: err.message,
    });
  }
};

const get_event_price=async(req,res)=>{
    try{
        const event_id=req.query.event_id;
        const get_event_price_query=await pool.query("select event_price from mess_special_events where id=$1",[event_id]);
        const event_price=get_event_price_query.rows[0].event_price;
        if(event_price==null)
        {
            throw new Error("Price not found")
        }
        res.status(200).send({
            status:"ok",
            msg:"got item price",
            data:event_price
        })

    }catch(err){
        console.log("error occured " + err.message)
        res.status(400).send({
            status:"failed",
            msg:err.message
        })
    }
}

const update_event_price=async(req,res)=>{
    try{
        const userid=req.body.user_id;
        const hostel_admission_no_query=await pool.query("select * from inmate_table where admission_no=$1",[userid]);
        if(hostel_admission_no_query.rows<1)
        throw new Error("Not authenticated")
        const event_id=req.body.event_id;
        const event_price=req.body.event_price
        const update_price=await pool.query("update mess_special_events set event_price=$1 where id=$2 returning *",[event_price,event_id]);
        if(update_price.rowCount<1)
        throw new Error("No data found to update")
        res.status(201).send({
            status:"ok",
            msg:"updated the price of the event"
        })
        
    }catch(err){
        console.log(err.message)
        res.send({
            status:"failed",
            msg:err.message
        })
    }
}

////////////////////// END OF MESS SPECIAL EVENTS //////////////////////////////

module.exports = {
  applyHostelOut,
  submitComplaint,
  update_complaintStatus,
  get_all_complaints,
  getComplaintById,
  getUsersComplaints,
  submitRoomChange,
  viewMessOutHistory,
  get_inmate_messout_history_of_inmate,
  getMessRequirements,
  getMessRequirementsLH,
  messoutpredaysk,
  getStudentDetails,
  messOutDays,
  maxMessoutDaysinMonth,
  maxMessOutDays,
  editMessoutFromDate,
  checkmessout,
  cancelMessOut,
  renderFormTemplate,
  applyCertificate,
  viewCertificates,
  applyMessOut,
  applyMessIn,
  editMessoutData,
  messOutRequests,
  currentMessInmates,
  uploadMessBill,
  cancelMessOut,
  viewMessBill,
  add_mess_special_mess_events,
  get_mess_special_events,
  get_event_bookings,
  get_inmate_mess_special_events,
  inmate_purchase_mess_special_events,
  cancel_purchase_mess_special_events,
  get_inmate_purchase_history,
  get_event_price,
  update_event_price,
};
