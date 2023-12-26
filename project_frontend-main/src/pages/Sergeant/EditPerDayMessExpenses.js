import { Link } from "react-router-dom";
import Hostel from "../../icons/hostel-image.jpeg";
import AddPerDayMessExpenseForm from "../../components/AddPerDayMessExpenseForm";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
function EditPerDayMessExpense({ getData,setIsEdit,id,suppliers,setSuppliers}) {
  const { setLoading } = useContext(UserContext);
  const [billDate, setBillDate] = useState();
  const [billNo, setBillNo] = useState();
  const [Particulars, setParticulars] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);
  const [BillAmnt, setBillAmnt] = useState(0);
  const [hostel, setHostel] = useState("MH");
  const [submitted, setSubmitted] = useState(false);
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
  useEffect(()=>{
   setLoading(true)
   axios.get(`${baseUrl}/warden/get-expense-info?id=${id}`)
   .then(res=>{
     console.log(res.data)
     setBillDate(dateConverter(res.data.data[0].bill_date));
     setBillNo(res.data.data[0].bill_no);
     setParticulars(res.data.data[0].particulars);
     setSelectedSupplier(res.data.data[0].supplier_id);
     setBillAmnt(res.data.data[0].bill_amount);

    //  setExpenseList(res.data.data)
     console.log(res.data.data[0].bill_date)
     setLoading(false)
   })

  },[])
  const submitForm = (e) => {
    setLoading(true);
    console.log(Particulars)
    let arr=Particulars
    if(typeof(Particulars)=="string")
    {
         arr = Particulars.split(",");
    }
   
    const data = {
      bill_date: billDate,
      bill_no: billNo,
      particulars: arr,
      bill_amount: BillAmnt,
    };
    console.log(data);
    console.log(id);
    axios
      .post(`${baseUrl}/warden/update-expense-info?id=${id}`, data)
      .then((res) =>{
        setLoading(false)
        alert("data added")
        setSubmitted(false);
       
        setIsEdit(false);
        getData()
        setBillAmnt('');
        setBillDate('');
        setBillNo('');
        setSelectedSupplier(suppliers[0]);
        setHostel('MH')
    }).catch((err)=>{
        console.log(err)
      });
  };
  return (
    <div className="bg-slate-200 w-11/12 min-h-screen">
      {!submitted ? (
        <div
          className=" items-center justify-between m-auto w-10/12 h-72 p-5 "
          style={{ minHeight: "80vh" }}
        >
          <AddPerDayMessExpenseForm
            submitted={submitted}
            setSubmitted={setSubmitted}
            billDate={billDate}
            setBillDate={setBillDate}
            billNo={billNo}
            setBillNo={setBillNo}
            Particulars={Particulars}
            setParticulars={setParticulars}
            BillAmnt={BillAmnt}
            setBillAmnt={setBillAmnt}
            suppliers={suppliers}
            setSuppliers={setSuppliers}
            selectedSupplier={selectedSupplier}
            setSelectedSupplier={setSelectedSupplier}
          />
        </div>
      ) : (
        ""
      )}
      {submitted ? (
        <div
          id="home_section"
          className="items-center justify-between m-auto w-10/12 h-72 p-5 bg-white mt-5"
        >
          <h2 className="font-bold text-3xl mb-5 pb-5">
            Are you sure want to submit ?
          </h2>
          <table className="w-full relative table-auto">
            <tr className="rounded-xl p-2 bg-primary text-center px-2">
              <th className="p-3">Bill Date</th>
              <th className="p-3">Bill No</th>
              <th className="p-3">Particulars</th>
              <th className="p-3">Supplier</th>
              <th className="p-3">Bill Amount</th>
            </tr>
            <tr
              key={1}
              className={
                "border-b text-center border-slate-200 border-solid hover:bg-gray-300"
              }
            >
              <td className="p-3">{billDate}</td>
              <td className="p-3 flex items-center">{billNo}</td>
              <td className="p-3">{Particulars}</td>
              <td className="p-3">{selectedSupplier.name}</td>
              <td className="p-3">{BillAmnt}</td>
            </tr>
          </table>
          <div className="flex  mt-4">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
              }}
              className="rounded-xl text-white py-2 px-4  bg-stone-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                submitForm();
              }}
              className="rounded-xl  ml-8 text-white py-2 px-4  bg-stone-800"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default EditPerDayMessExpense;
