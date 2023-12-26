const { reset } = require("nodemon");
const { pool } = require("../db");
const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
//insert into perdaymessexpenses(bill_date,bill_no,particulars,supplier_id,bill_amount,hostel) values('2020-10-20',2,array['aa','a'],'2',290,'MH');
//create table supplier_list(supplier_id int,name varchar(20));
//create table perdaymessexpenses (id serial primary key,bill_date date,bill_no bigint,particulars varchar(50)[],supplier_id varchar(20),bill_amount float,hostel varchar(20),status int default 0,FOREIGN KEY(supplier_id) REFERENCES supplier_list(supplier_id) ON DELETE CASCADE ON UPDATE CASCADE);
const getSuplierList = async (req, res) => {
  try {
    const data = await pool.query("select * from supplier_list");
   
    res.send({
      status: "ok",
      msg: "succesfully obained data",
      data: data.rows,
    });
  } catch (err) {
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};

const getexpenseperSupplier=async(req,res)=>{
    try{

        const id=req.query.id;
        const data=await pool.query("select * from perdaymessexpenses where supplier_id=$1",[id]);
        const sum= await pool.query("select sum(bill_amount) from perdaymessexpenses where supplier_id=$1",[id]);

        console.log(data.rows);
        res.send({
            status:"ok",
            msg:"got data",
            data:data.rows,
            sum:sum.rows
        })

    }catch(err){
        res.send({
            status:"failed",
            msg:err.message
        })
    }
}

const addPerDayExpenses = async (req, res) => {
    const date=new Date();

  try {
    const {
      bill_date,
      bill_number,
      particulars,
      supplier,
      bill_amount,
      hostel,
    } = req.body;
    console.log(req.body);
    if (!supplier.supplier_id) {
      const insertSupplier = await pool.query(
        "insert into supplier_list(name) values($1) returning *",
        [supplier.name]
      );
      console.log(insertSupplier.rows[0].supplier_id);
      const insertExp = await pool.query(
        "insert into perdaymessexpenses(bill_date,bill_no,particulars,supplier_id,bill_amount,hostel,dates) values($1,$2,$3,$4,$5,$6,array[date($7)]) returning *",
        [
          bill_date,
          bill_number,
          particulars,
          insertSupplier.rows[0].supplier_id,
          bill_amount,
          hostel,
          dateConverter(date)
        ]
      );
      res.send({
        status: "ok",
        msg: "expense added",
        data: insertExp.rows[0],
      });
    } else {
      const insertExp = await pool.query(
        "insert into perdaymessexpenses(bill_date,bill_no,particulars,supplier_id,bill_amount,hostel,dates) values($1,$2,$3,$4,$5,$6,array[date($7)]) returning *",
        [
          bill_date,
          bill_number,
          particulars,
          supplier.supplier_id,
          bill_amount,
          hostel,
          dateConverter(date)
        ]
      );
      res.send({
        status: "ok",
        msg: "expense added",
        data: insertExp.rows[0],
      });
    }
  } catch (err) {
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};

const getExpenseList = async (req, res) => {
  try {
    const date=req.query.date;
    console.log(date,date.substring(0,4),date.substring(5,7));
    // console.log(date.subString(0,3),date.subString(5,6));
    const isfaculty = req.query.isfaculty;
    console.log(isfaculty);
    if (isfaculty=='true' || isfaculty==true) {
      const status = req.query.status;
      const hostel = req.query.hostel;
      const expenseList = await pool.query(
        "select * from perdaymessexpenses where hostel=$1 and status=$2 and EXTRACT(month FROM bill_date) = $4 and  EXTRACT(year FROM bill_date)=$3",
        [hostel, status,date.substring(0,4),date.substring(5,7)]
      );
      res.send({
        status: "ok",
        msg: "succesfully got data",
        data: expenseList.rows,
      });
    } else {
      const status = req.query.status;
      const hostel = req.query.hostel;
      const expenseList = await pool.query(
        "select * from perdaymessexpenses where hostel=$1 and status>=$2 and EXTRACT(month FROM bill_date) = $4 and  EXTRACT(year FROM bill_date)=$3",
        [hostel, status,date.substring(0,4),date.substring(5,7)]
      );
      res.send({
        status: "ok",
        msg: "succesfully got data",
        data: expenseList.rows,
      });
    }
  } catch (err) {
    console.log({
        status: "failed",
        msg: err.message,
      });;
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};
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
const updateExpenseList = async (req, res) => {
  try {
    const date=new Date();

    const ids = req.body.ids;
    ids.map(async (id, index) => {
      const update = await pool.query(
        "update perdaymessexpenses set status=status+1,dates=array_append(dates,date($2)) where id =$1 returning *",
        [id,dateConverter(date)]
      );
      console.log(update.rows);
    });

    res.send({
      status: "ok",
      msg: "updated succesfully",
    });
  } catch (err) {
    res.send({
      status: "failed",
      msg: "something went wrong",
    });
  }
};
function updateProductByID(id, cols) {
  // Setup static beginning of query
  var query = ["UPDATE perdaymessexpenses"];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push("WHERE id = " + id);

  // Return a complete query string
  return query.join(" ");
}
const updateExpense = async (req, res) => {
  try {
    var query = updateProductByID(req.query.id, req.body);
    console.log(query);
    var colValues = Object.keys(req.body).map(function (key) {
      return req.body[key];
    });
    const update = await pool.query(query, colValues);
    res.send({
      status: "ok",
      msg: "updates",
    });
  } catch (err) {
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};

const getExpenseInfo = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(id);
    const data = await pool.query(
      "select * from perdaymessexpenses where id=$1",
      [id]
    );
    res.send({
      status: "ok",
      msg: "got data",
      data: data.rows,
    });
  } catch (err) {
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};

const hostelRegistry = async (req, res) => {
  try {
    const query =
      await pool.query(`SELECT users.name,hostel_out.hostel_admission_no,batch.department,users.mobile_no,users.email,hostel_out.fromdate,hostel_out.todate,hostel_out.reason,hostel_blocks.hostel
        FROM users,inmate_table,hostel_out,batch,student,inmate_room,hostel_room,hostel_blocks WHERE hostel_out.hostel_admission_no=inmate_table.hostel_admission_no and inmate_table.admission_no=users.user_id and inmate_table.admission_no=student.admission_no and student.batchid=batch.batchid and hostel_out.hostel_admission_no=inmate_room.hostel_admission_no and inmate_room.room_id=hostel_room.room_id and hostel_room.block_id=hostel_blocks.block_id`);
    console.log("hyy", query.rows);
    res.json(query.rows);
  } catch (e) {
    console.log(e);
  }
};

const getHostelApplications = async (req, res) => {
  try {
    const query = await pool.query(
      "SELECT * from hostel_application,users where hostel_application.user_id=users.user_id"
    );
    console.log(query.rows, "hyy");
    res.json(query.rows);
  } catch (e) {}
};

//function to find the mess attendance for each user for any month

const getMessAttendance = async (req, res) => {
  try {
    const hostel = req.query.hostel;
    const datemonth = req.query.date[5] + req.query.date[6];
    const date = req.query.date+'-18';
    const messList = await pool.query(
        `select u.name,a.hostel_admission_no,a.val,hr.room_no,hb.block_name from 
        (select it.hostel_admission_no,case (
            select extract (month from current_date)) when $2 then (select extract (days from current_date)) 
            else (SELECT DATE_PART('days',DATE_TRUNC('month', date($1))+ '1 MONTH'::INTERVAL - '1 DAY'::INTERVAL)) end-
            sum(case when extract('month' from fromdate)=$2 and extract('month' from todate)=$2 then (case when todate>current_date then  current_date- fromdate+1 else todate-fromdate end) 
            when extract('month' from fromdate)=$2-1 and extract('month' from todate)=$2 then (case when todate>current_date then extract('day' from current_date) else extract('day' from todate)-1 end)
            when extract('month' from fromdate)=$2 and extract('month' from todate)=$2+1 then current_date-fromdate+1
            else 0
            end) as val
            
            from inmate_table it left join messout m on it.hostel_admission_no=m.hostel_admission_no  group by it.hostel_admission_no) as a,
            users u,inmate_table it,inmate_room ir,hostel_room hr,hostel_blocks hb where a.hostel_admission_no=it.hostel_admission_no and it.admission_no=u.user_id and it.hostel_admission_no=ir.hostel_admission_no and ir.room_id=hr.room_id and hr.block_id=hb.block_id and hb.hostel=$3 order by it.hostel_admission_no`,
        [date, datemonth,hostel]
      );
    res.send({
      status: "ok",
      msg: "got mess attendance",
      data: messList.rows,
    });
  } catch (err) {
    console.log({
      status: "failed",
      msg: err.message,
    });
    res.send({
      status: "failed",
      msg: err.message,
    });
  }
};

const generateRankList = async (req, res) => {
  try {
    const headerquery = await pool.query(
      `SELECT * from allotment_columns order by column_letter`
    );
    const existingcolquery = await pool.query(
      `SELECT * from allotment_columns where column_type='existing'`
    );
    const colData = existingcolquery.rows.map((col) => col.columns);
    console.log(colData.join(","), "nenj");
    const queryText =
      "SELECT " +
      colData.join(",") +
      ",users.user_id from hostel_application, student_progress, users where hostel_application.user_id=users.user_id";
    const query = await pool.query(queryText);
    console.log(queryText, "nad");
    const worksheet = workbook.addWorksheet("RankList");
    worksheet.columns = [];
    var temp = [];
    headerquery.rows.forEach((element) => {
      if (element.column_type === "existing") {
        temp.push({
          header: element.columns.split(".")[1],
          key: element.columns.split(".")[1],
        });
        //Existing column format : 'table.columnname'
      } else {
        temp.push({ header: element.columns, key: element.columns });
        //Derived column format : 'columnname'
      }
    });
    temp.push({ header: "user_id", key: "user_id" });
    temp.push({ header: "rank", key: "rank" });

    worksheet.columns = [...temp];
    console.log(worksheet.columns, "hu");
    const noofrows = query.rows.length;
    console.log(headerquery, "Hyeye");
    var rows = [];
    for (let i = 0; i < noofrows; i++) {
      var row = [];
      headerquery.rows.forEach((col) => {
        if (col.column_type === "existing") {
          row.push(query.rows[i][col.columns.split(".")[1]]);
        }
      });
      row.push(query.rows[i]["user_id"]);
      // Object.keys(query.rows[i]).forEach(colHeader => {
      //     row.push(query.rows[i][colHeader])
      // });
      rows.push(row);
    }

    console.log(rows, "rowstest");
    worksheet.addRows(rows);
    worksheet.eachRow((row, rowNo) => {
      console.log(rowNo);

      if (rowNo != 1) {
        headerquery.rows.forEach((col) => {
          if (col.column_type === "derived") {
            var matchesArray = col.formula.match(/<.*?>/g);

            console.log(matchesArray);
            var formula = col.formula;

            matchesArray.forEach((pattern) => {
              formula = formula.replace(
                pattern,
                pattern.slice(1, -1) + "" + rowNo
              );
            });

            console.log(formula);

            worksheet.getCell(col.column_letter + "" + rowNo).value = {
              formula: formula,
            };
          }
        });
      }
    });

    var sortedRows = [];
    worksheet.eachRow((row, rowNo) => {
      console.log(rowNo);

      if (rowNo != 1) {
        var newRow = [];
        row.eachCell((cell, cellNo) => {
          console.log(cell.value, "value");
          newRow.push(cell.value ? cell.value : "");
        });

        sortedRows.push(newRow);
      }
    });

    console.log(sortedRows, "sce");
    const hostelRequirements = await pool.query(
      "select rank_rule from hostel_requirements"
    );
    console.log(hostelRequirements.rows[0].rank_rule, "rule");
    const colLetter = hostelRequirements.rows[0].rank_rule.split(":")[0];
    const order = hostelRequirements.rows[0].rank_rule.split(":")[2];

    sortedRows = sortedRows.sort(function (a, b) {
      console.log(a, "endoo");
      if (order == "Asc")
        return (
          a[colLetter.charPointAt(0) - 65] - b[colLetter.charPointAt(0) - 65]
        );
      else
        return (
          a[colLetter.charPointAt(0) - 65] - b[colLetter.charPointAt(0) - 65]
        );
    });
    const sorted_worksheet = workbook.addWorksheet("RankList-Sorted-test");

    sorted_worksheet.columns = [...temp];
    sorted_worksheet.addRows(sortedRows);

    sorted_worksheet.eachRow(async (row, rowNo) => {
      console.log(rowNo, row);
      if (rowNo != 1) {
        var newRow = [];
        const userId = row.getCell("user_id").value;
        row.getCell("rank").value = rowNo - 1;

        const hostelRequirements = await pool.query(
          `INSERT INTO rank_list(user_id, rank, verified)
                values($1, $2, $3)`,
          [userId, rowNo - 1, false]
        );
      }
    });
    ///commented
    // const rankCol = worksheet.getColumn('rank');
    // rankCol.eachCell(async function(cell, rowNumber) {
    //     cell.value=rowNumber
    //     worksheet.getRow(rowNumber).getCell('rank').value={rowNumber}
    //     // const userId=worksheet.getRow(rowNumber).getCell("user_id").value
    //     // const hostelRequirements=await pool.query(`INSERT INTO rank_list(user_id, rank, verified)
    //     // values($1, $2, $3)`,[userId, rowNumber, false])

    // });

    workbook.removeWorksheet("RankList");
    console.log("running");
    await workbook.xlsx.writeFile("Ranklist.xlsx");
  } catch (e) {
    console.log(e);
  }
};

const getCertificateApplications = async (req, res) => {
  const certificates = await pool.query(
    `SELECT ST.admission_no,u.name as studentname,B.programme,C.name as certificatename,CA.application_id,CA.date,CA.status,CA.application_form,p.path FROM student as ST, certificate_application as CA, certificates as C, path as P, users as U,batch as B WHERE B.batchid=ST.batchid and ST.admission_no = CA.admission_no and CA.certificate_id=C.certificate_id and ST.admission_no=u.user_id and C.pathno=P.pathno`
  );
  console.log(certificates.rows);
  var requiredCertificates = [];
  for (var i = 0; i < certificates.rows.length; i++) {
    var myArray = certificates.rows[i].path.split("-");
    console.log(myArray);
    if (myArray[certificates.rows[i].status] == "WD") {
      requiredCertificates.push(certificates.rows[i]);
    }
  }
  res.json(requiredCertificates);
};

const addSpecialMessout=async(req,res)=>{
    try{
        const hostel_admission_no=req.body.hostel_admission_no;
        const fromdate=req.body.fromdate;
        const todate=req.body.todate;
        const reason=req.body.reason;
        const hard_copy_date=req.body.hard_copy_date


        const prevMessout=await pool.query("select * from messout where hostel_admission_no=$1 and ((fromdate<=$2 and todate>$2) or  (fromdate<$3 and todate>$3))",[hostel_admission_no,fromdate,todate]);
        if(prevMessout.rowCount>0){
            console.log(prevMessout.rows)
            throw new Error("Cannot Add Messout for this Period");
        }

        const addMessout=await pool.query("insert into messout values($1,$2,$3) returning *",[hostel_admission_no,fromdate,todate]);
        if(addMessout.rowCount<1)
        throw new Error("Something Went Wrong");
        const messout_id=addMessout.rows[0].messout_id;
        const addReson=await pool.query("insert into special_messout values($1,$2,$3) returning *",[messout_id,reason,hard_copy_date]);
        if(addReson.rowCount<1)
        throw new Error("Something Went Wrong");

        res.send({
            status:"ok",
            msg:"added special request",
            data:addMessout
        })


    
    }catch(err){
        res.status(409).send({
            status:"failed",
            msg:err.message
        })
    }
}
const get_extend_messout_max_days=async(req,res)=>{
    try{
        const is_permitted_20=req.query.permitted;
        const max_perissible_days=is_permitted_20?20:15
        const fromdate=new Date(req.body.fromdate);
        const todate=new Data(req.body.todate);
        const hostel_admission_no=req.body.hostel_admission_no;
        const date=new Date();
        const currentMonth = (date.getMonth() + 1).toString();
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        const previousMonth = (currentDate.getMonth() + 1).toString();
        currentDate.setMonth(currentDate.getMonth() + 2);
        const nextMonth=(currentDate.getMonth() + 1).toString();
        const select_month_prev_messout=await pool.query("select * from messout where to_char(fromdate,'mm')=$1 or to_char(todate,'mm')=$1",[currentMonth])
        const no_of_daysof_prev_messout=await pool.query("select sum(case when to_char(fromdate,'mm')=$1 and to_char(todate,'mm')=$1 then (cast(to_char(todate,'dd') as integer)-cast(to_char(fromdate,'dd') as integer))  when (to_char(fromdate,'mm')=$2) then cast(to_char(todate,'dd') as integer)-1  when (to_char(todate,'mm')=$3) then 30-cast(to_char(fromdate,'dd') as integer)+1 end) from messout  group by hostel_admission_no having hostel_admission_no=$4",[currentMonth,previousMonth,nextMonth,hostel_admission_no])
        const permissible_days=max_perissible_days-no_of_daysof_prev_messout.rows[0].sum 
        const date1Ms = todate.getTime();
        const date2Ms = fromdate.getTime();
        const differenceMs = Math.abs(date1Ms - date2Ms);
        const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
        console.log(daysDifference)
        res.send({
            status:"ok",
            msg:"got mas days for extending",
            data:permissible_days,
            messoutHistory:select_month_prev_messout.rows
        })
    
    }catch(err){
        res.send({
            status:"failed",
            msg:err.message
        })
    }
}

const extend_special_messout=async(req,res)=>{
    try{
        const is_permitted_20=req.body.permitted;
        const max_perissible_days=is_permitted_20?20:15
        const fromdate=new Date(req.body.fromdate);
        const todate=new Date(req.body.todate);
        const hostel_admission_no=req.body.hostel_admission_no;
        const reason=req.body.reason;
        const hard_copy_date=req.body.hard_copy_date;
        const date=new Date();
        const currentMonth = (date.getMonth() + 1).toString();
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1);
        const previousMonth = (currentDate.getMonth() + 1).toString();
        currentDate.setMonth(currentDate.getMonth() + 2);
        const nextMonth=(currentDate.getMonth() + 1).toString();
        var daysInCurrentMonth=new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
        
        const no_of_daysof_prev_messout=await pool.query("select sum(case when to_char(fromdate,'mm')=$1 and to_char(todate,'mm')=$1 then (cast(to_char(todate,'dd') as integer)-cast(to_char(fromdate,'dd') as integer))  when (to_char(fromdate,'mm')=$2  and to_char(todate,'mm')=$1) then cast(to_char(todate,'dd') as integer)-1  when (to_char(todate,'mm')=$3  and to_char(todate,'mm')=$1) then $5-cast(to_char(fromdate,'dd') as integer)+1 end) from messout  group by hostel_admission_no having hostel_admission_no=$4",[currentMonth,previousMonth,nextMonth,hostel_admission_no,daysInCurrentMonth])
        const permissible_days=max_perissible_days-no_of_daysof_prev_messout.rows[0].sum 
        console.log("no of permissible days = ",permissible_days)
        if(permissible_days<1)
        throw new Error("You cannot apply for more messout")
        const date1Ms = todate.getTime();
        const date2Ms = fromdate.getTime();
        const differenceMs = Math.abs(date1Ms - date2Ms);
        const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
        const current_date = new Date(fromdate);
        const lastDayOfMonth = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0);
        const days_remaining_month = lastDayOfMonth.getDate() - current_date.getDate()+1;
        console.log("remaining days in month = ",days_remaining_month)
        if(daysDifference<=permissible_days || days_remaining_month<=permissible_days ){
            const d=new Date();
            const today=dateConverter(d);
            const messout_to_extend=await pool.query("update messout set todate=$1 where todate=$2 and hostel_admission_no=$3 returning *",[todate,fromdate,hostel_admission_no]);
            console.log(messout_to_extend.rowCount)
            if(messout_to_extend.rowCount<1)
            {
                console.log("fghjkl")
                throw new Error("No messout to extend")
            }

            const messout_id=messout_to_extend.rows[0].messout_id
            const insert_special_messout=await pool.query("insert into special_messout values($1,$2,$3)",[messout_id,reason,hard_copy_date]);
 
            res.status(200).send({
                status:"ok",
                msg:"messout extended succesfully",
                messout_to_extend:messout_to_extend.rows[0]
            })
            await pool.query("commit")
        }
        else{
            await pool.query("begin")
            const calculated_todate=new Date(fromdate);
            calculated_todate.setDate(calculated_todate.getDate()+permissible_days);
            console.log("calculated mess in date = ",calculated_todate)
            console.log(fromdate)
            const messoutaa=await pool.query("select * from messout where todate=$1 and hostel_admission_no=$2",[fromdate,hostel_admission_no]);
           console.log(messoutaa.rows) 
            const update_messout=await pool.query("update messout set todate=$1 where todate=$2 and hostel_admission_no=$3 returning *",[calculated_todate,fromdate,hostel_admission_no]);
            if(update_messout.rowCount<1){
                console.log("er")
                throw new Error("no messout found to extend")
            }
            const messout_id=update_messout.rows[0].messout_id
            const insert_special_messout=await pool.query("insert into special_messout values($1,$2,$3)",[messout_id,reason,hard_copy_date]);
            await pool.query("commit");
            res.status(201).send({
                status:"ok",
                msg:"extended",
                data:update_messout.rows[0]
            })
           
        
        }
    
    }catch(err){
        console.log("hy")
        await pool.query("rollback")
        console.log(err.message)
        res.status(404).send({
            status:"failed",
            msg:err.message
        })
    }
}

module.exports = {
  getSuplierList,
  addPerDayExpenses,
  getExpenseInfo,
  getExpenseList,
  updateExpense,
  addSpecialMessout,
  get_extend_messout_max_days,
  extend_special_messout,
  updateExpenseList,
  getexpenseperSupplier,
  getMessAttendance,
  hostelRegistry,
  getHostelApplications,
  generateRankList,
  getCertificateApplications,
};
