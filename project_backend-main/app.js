const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const cors = require("cors");
const app = express();
// const auth=require('./routes/auth')
const excelToJson = require("convert-excel-to-json");
const multer = require("multer");
const admin = require("./routes/admin");
const student = require("./routes/student");
const inmate = require("./routes/inmate");
const hod = require("./routes/hod");
const warden = require("./routes/warden");
const staffadvisor = require("./routes/staffadvisor");
const certificates = require("./routes/certificates");
const bodyParser = require("body-parser");
var passport = require("passport");
const bcryptjs = require("bcryptjs");
const { pool } = require("./db");
const bcrypt = require("bcryptjs");
const mailer = require("./controllers/mailer");
const CryptoJS = require("crypto-js");
const notification = require("./controllers/notification");
// const utils=require('./routes/utils')
require("dotenv").config();
//----------------------MIDDLEWARES-----------------------
//Body parser middleware - passport returned ad request without this
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://13.210.100.216",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
const key_encryption="hostel_Kjgnq9fpvH5zuOzlTGfxr_application"
//session middleware
app.use(
  sessions({
    secret: key_encryption,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(cookieParser(key_encryption));
app.use(passport.initialize());
// app.use(passport.session())

const configurePassport = require("./passportConfig");
configurePassport(passport);

const port = 8080;

app.get("/api", async (req, res) => {
  res.send("app is lbbbbive");
});

//----------------------auth routes----------------------
app.get("/api/auth", (req, res) => {
  res.send("Auth is up!");
});

app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {

  res.send(req.user);
});
app.get("/api/out", (req, res) => {

  try {
    req.session.destroy();
    req.logOut();
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/logout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      }
      res.send("success");
    });
  } catch (err) {
    next(err);
  }
});

//passport.session() middleware calls deSerializeUser function and passes the user to req.user if the user is authenticated
app.get("/api/auth/isAuthenticated", passport.session(), (req, res, next) => {
  //   console.log("req.user : ",req.session.passport)
  //Uncomment the follwing to retrieve username from the cookie from client browser
  // console.log("cookie is : ",req.signedCookies)
  if (req.user != undefined) res.send(req.user);
  else res.send(null);
});
//----------------------End of auth routes----------------------

//----------------------Auth routes--------------------------
app.post("/api/facultysignup", async (req, res, next) => {
  console.log(req.body);
  const saltRounds = 10;
  const hash = bcryptjs.hashSync(req.body.password, saltRounds);
  pool.query(
    `insert into users(user_id,password,name,email,mobile_no,designation,is_admin) 
  values($1,$2,$3,$4,$5,'faculty',FALSE) returning *`,
    [req.body.penNo, hash, req.body.name, req.body.email, req.body.phoneNo],
    (err, resp) => {
      if (err) throw err;
      user = resp.rows[0];

      pool.query(
        `insert into faculty(pen_no,designation) values($1,$2)`,
        [req.body.penNo, req.body.designation],
        (err, resp1) => {
          if (err) throw err;

          res.send({ message: "success" });
        }
      );
    }
  );
});

app.post("/api/studentsignup", async (req, res) => {
  try {
    const saltRounds = 10;
    const hash = bcryptjs.hashSync(req.body.password, saltRounds);
    console.log("here");
    const query = await pool.query(
      `insert into users(user_id,password,name,email,mobile_no,designation,is_admin) values($1,$2,$3,$4,$5,'student',FALSE)`,
      [
        req.body.admissionNo,
        hash,
        req.body.name,
        req.body.email,
        req.body.phoneNo,
      ]
    );
    console.log(req.body);
    const yod = await pool.query(`select year from batch where batchid=$1`, [
      req.body.batchId,
    ]);
    console.log(
      req.body.admissionNo,
      req.body.batchId,
      yod.rows[0].year,
      req.body.address
    );
    const secquery = await pool.query(
      `insert into student(admission_no,batchid,year_of_admission,address,stage) values($1,$2,$3,$4,'noninmate')`,
      [
        req.body.admissionNo,
        req.body.batchId,
        yod.rows[0].year,
        req.body.address,
      ]
    );
    console.log(secquery);
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/changepassword", async (req, res) => {
  const admission_no = req.body.admission_no;
  const newpassword = req.body.newpassword;
  const retypedpassword = req.body.retypedpassword;
  if (newpassword === retypedpassword) {
    try {
      const saltRounds = 10;
      const hash = bcryptjs.hashSync(newpassword, saltRounds);
      const updateUser = await pool.query(
        "update users set password =$1,changedpassword=$3 where user_id=$2 returning *",
        [hash, admission_no,true]
      );
      

      res.send({
        status: "ok",
        msg: "Succesfully updated the password",
      });
    } catch (err) {
      res.send({
        status: "failed",
        msg: err.msg,
      });
    }
  }
});

function encrypt(data, key) {
  let encJson = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
}
function decrypt(data,key){
    let decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
    return CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8);
  }


app.post("/api/forgot-password", async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const getUserData = await pool.query(
      `select * from users where user_id=$1`,
      [username]
    );
    if (getUserData.rowCount < 1) {
      throw new Error("User not found");
    }
    console.log(getUserData.rows[0].email)
    const data=getUserData.rows[0].email.toString('ascii');
    console.log(data);
    console.log(decrypt(data,key_encryption))
    if(decrypt(data,key_encryption).replace(/"/g, '')!=email)
    throw new Error ("User not Found")

    // console.log(getbatchId.rows)
    // var ptext=getbatchId.rows[0].batchid

    //     // Encrypt
    var text = username + ":" + email;
    console.log(text);
    //  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify({text}), 'secret key 123').toString();
    var ciphertext = encrypt(text, "secret key 123");
    console.log("Messge", ciphertext);
    var mailOptions = {
      from: "cethostelmanagement@outlook.com", // sender address (who sends)
      to: `${email}`, // list of receivers (who receives)
      subject: `Forgot Password`, // Subject line
      text: `Hi ${email}`, // plaintext body
      html: `<b>Hi ${email}</b> <br> <p>Please click on the Link to change password</p><br>
                       <a href="https://cethostel.in/set-new-password?cred=${ciphertext}">Click here</a>`, // html body
    };

    await mailer.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }

      console.log("Messge", mailOptions);
      console.log("Message sent: " + info.response);
      res.send({
        status: "ok",
        msg: "email send to client",
      });
    });
  } catch (err) {
    console.log(err.msg);
    res.send({
      status: "failed",
      msg: err.msg,
    });
  }
});

// app.use('/api/utils',utils)

//----------------------admin routes----------------------
app.use("/api/admin", admin);
//----------------------End of auth routes----------------------

//----------------------student routes----------------------
app.use("/api/student", student);
//----------------------End of student----------------------

//----------------------inmate routes----------------------
app.use("/api/inmate", inmate);

app.use("/api/staffadvisor", staffadvisor);
app.use("/api/hod", hod);
app.use("/api/warden", warden);

//----------------------certificate routes----------------------
app.use("/api/certificates", certificates);



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
//----------------------End of student----------------------
