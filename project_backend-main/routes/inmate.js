const express = require("express");
const router = express.Router();
const inmate = require("../controllers/inmate");
const { pool } = require("../db");

//Render certificate form
router.get("/formtemplate", inmate.renderFormTemplate);

//INMATE - HOSTEL ROUTES

//Hostel Out Form
router.post("/hostelout", inmate.applyHostelOut);

router.get("/get-inmate-details", inmate.getStudentDetails);

router.get(
  "/get-messout-history-of-inmate",
  inmate.get_inmate_messout_history_of_inmate
);

//////////////////// MESS SPECIAL EVENTS ROUTE ///////////////////////

router.post("/add-mess-special-events", inmate.add_mess_special_mess_events);

router.get("/get-mess-special-events", inmate.get_mess_special_events);

router.get("/get-event-bookings", inmate.get_event_bookings);

router.post("/book-special-events", inmate.inmate_purchase_mess_special_events);


router.post("/cancel-booking", inmate.cancel_purchase_mess_special_events);

router.get(
  "/get-inmates-special-mess-events",
  inmate.get_inmate_mess_special_events
);

router.get("/get-inmate-purchase-history",inmate.get_inmate_purchase_history)

router.get('/get-event-price', inmate.get_event_price)

router.post('/update-event-price',inmate.update_event_price)


//////////////////// MESS SPECIAL EVENTS ROUTE ///////////////////////

//////////////////////COMPLAINT BOX  ///////////////////////////////////
router.post("/complaint-box", inmate.submitComplaint);
router.get("/get-all-complaints", inmate.get_all_complaints);
router.post("/get-user-complaints", inmate.getUsersComplaints);
router.get("/get-complaint-id", inmate.getComplaintById);
router.post("/update-complaint", inmate.update_complaintStatus);

//Room Change
router.post("/roomchange", inmate.submitRoomChange);

//INMATE - MESSROUTES

//View Messbill-dues
router.get("/viewmessbill", inmate.viewMessBill);

//View MessOut history
router.get("/messouthistory", inmate.viewMessOutHistory);

//Cancel messout


//View MessOut days
router.get("/messoutpredaysk", inmate.messoutpredaysk);
router.get("/messoutdays", inmate.messOutDays);
router.get("/maximum-messoutdays", inmate.maxMessOutDays);
router.get("/maximum-messoutdays-month", inmate.maxMessoutDaysinMonth);

router.get("/mess-requirements", inmate.getMessRequirements);
router.get("/mess-requirements-LH", inmate.getMessRequirementsLH);

/////////MESS OUT ROUTES /////////////////////

router.post("/applymessout", inmate.applyMessOut);

router.post("/edit/messout/fromdate", inmate.editMessoutFromDate);

router.post("/check/messout", inmate.checkmessout);

router.post("/apply-messin", inmate.applyMessIn);

router.post("/cancel-messout", inmate.cancelMessOut);


////////////////MESS OUT ROUTEES///////////////////////






//INMATE - CERTIFICATE ROUTES

//View Certificates
router.get("/viewcertificates", inmate.viewCertificates);

//Apply for a certificate
router.post("/applycertificate", inmate.applyCertificate);

//MESS SECRETARY
//Update MessOut Rule
router.put("/messoutpredaysk", async (req, res) => {
  try {
    const { noofDays } = req.body;
    const query =
      req.query.hostel === "MH"
        ? "UPDATE messrequirements SET value=$1 WHERE key='messoutpredaysk'"
        : "UPDATE messrequirementsLH SET value=$1 WHERE key='messoutpredaysk'";
    const messout = await pool.query(query, [noofDays]);
    console.log(messout);
  } catch (e) {
    console.error(e);
  }
});

router.put("/messoutdays", async (req, res) => {
  try {
    const { noofDays } = req.body;
    const query =
      req.query.hostel === "MH"
        ? "UPDATE messrequirements SET value=$1 WHERE key='messoutdays'"
        : "UPDATE messrequirementsLH SET value=$1 WHERE key='messoutdays'";
    const messout = await pool.query(query, [noofDays]);
    console.log(messout);
  } catch (e) {
    console.error(e);
  }
});
router.put("/messoutmaximumdays", async (req, res) => {
  try {
    const { noofDays } = req.body;
    const query =
      req.query.hostel === "MH"
        ? "UPDATE messrequirements SET value=$1 WHERE key='messoutdaysmaximum' returning * "
        : "UPDATE messrequirementsLH SET value=$1 WHERE key='messoutdaysmaximum' returning * ";
    const messout = await pool.query(query, [noofDays]);
    res.json(messout);
  } catch (e) {
    console.error(e);
  }
});
router.put("/messoutmaximumdays-month", async (req, res) => {
  console.log(req.query.hostel);
  try {
    const { noofDays } = req.body;
    const query =
      req.query.hostel === "MH"
        ? "UPDATE messrequirements SET value=$1 WHERE key='messout_days_max_in_month' returning * "
        : "UPDATE messrequirementsLH SET value=$1 WHERE key='messout_days_max_in_month' returning * ";
    const messout = await pool.query(query, [noofDays]);
    res.json(messout);
  } catch (e) {
    console.error(e);
  }
});

//View Messout Requests
router.get("/messoutrequests", inmate.messOutRequests);

//View Current Inmates (Also for Mess Director)
router.get("/viewmessinmates", inmate.currentMessInmates);

//MESS DIRECTOR
router.post("/uploadbill", inmate.uploadMessBill);

module.exports = router;
