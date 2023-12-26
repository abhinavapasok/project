import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Ranklist1 from "./Ranklist1";
function GenerateRanklist() {
  const data = [
    {
      cols: [
        "Ancy sebastian S",
        "220349",
        "S3 CE",
        "Other",
        "9745906757",
        "851124",
        "30.9775",
        "Thiruvananthapuram",
        "Venkadampu (po) ,",
        "38",
        "4.5000",
        "35.4775",
        "20",
      ],
    },
    {
      cols: [
        "Nandana Krishna",
        "220418",
        "S35 ME",
        "Other",
        "8281822590",
        "1379016",
        "22.2098",
        "Kottayam",
        "Vaikaprayar",
        "176",
        "12.5333",
        "34.7432",
        "21",
      ],
    },
    {
      cols: [
        "Devanam Priya V",
        "220333",
        "S3 CE",
        "Other",
        "8891227702",
        "1495000",
        "21.0500",
        "Alappuzha",
        "Punnapra PO",
        "135",
        "11.1667",
        "32.2167",
        "22",
      ],
    },
    {
      cols: [
        "Arundhathi S Nair A C",
        "220369",
        "S3 IE",
        "Other",
        "7012069512",
        "3207312",
        "7.9634",
        "Kasaragod",
        "Kalanad Sub Post",
        "552.1",
        "23.6314",
        "31.5949",
        "23",
      ],
    },
    {
      cols: [
        "Pavithra R",
        "220217",
        "S3 CSE",
        "Other",
        "8078451071",
        "1500000",
        "21.0000",
        "Alappuzha",
        "Muthukulam South P.O.",
        "105",
        "10.1667",
        "31.1667",
        "24",
      ],
    },
    {
      cols: [
        "Ardra T J",
        "220382",
        "S3 IE",
        "Other",
        "8547871552",
        "1493088",
        "21.0691",
        "Pathanamthitta",
        "Pandalam",
        "93",
        "9.4167",
        "30.4858",
        "25",
      ],
    },
    {
      cols: [
        "Sivanandana P S",
        "221112",
        "S35 ME",
        "Other",
        "7909115994",
        "1985172",
        "16.1483",
        "Ernakulam",
        "North paravoor P O ,",
        "210",
        "13.6667",
        "29.8149",
        "26",
      ],
    },
    {
      cols: [
        "AARYA NANDA SAJAN",
        "U230753",
        "S3 CSE",
        "Other",
        "9142188887",
        "2881584",
        "9.5921",
        "Kannur",
        "Mambaram",
        "432",
        "20.2000",
        "29.7921",
        "27",
      ],
    },
    {
      cols: [
        "Dia Promod",
        "220195",
        "S3 CSE",
        "Other",
        "9400460585",
        "2084000",
        "15.1600",
        "Kottayam",
        "Ramapuram Bazar P.O",
        "175",
        "12.5000",
        "27.6600",
        "28",
      ],
    },
    {
      cols: [
        "LEKSHMI NANDANA S",
        "220274",
        "S3 CE",
        "Other",
        "9946642504",
        "1911600",
        "16.8840",
        "Alappuzha",
        "Pallickal(690503)",
        "103",
        "10.1000",
        "26.9840",
        "29",
      ],
    },
    {
      cols: [
        "Niha.p",
        "220522",
        "S3 EEE",
        "Other",
        "8075940495",
        "3115644",
        "8.4218",
        "Kozhikode",
        "Farook college post",
        "363.4",
        "18.2400",
        "26.6618",
        "30",
      ],
    },
    {
      cols: [
        "Durgapoorna",
        "220316",
        "S3 CE",
        "Other",
        "9995060432",
        "3615728",
        "5.9853",
        "Kozhikode",
        "Calicut Beach Post",
        "379.1",
        "18.6886",
        "24.6738",
        "31",
      ],
    },
    {
      cols: [
        "Merlin Shiby",
        "221161",
        "S3 EEE",
        "Other",
        "9072492427",
        "3878508",
        "5.7389",
        "Kozhikode",
        "Westhill",
        "384",
        "18.8286",
        "24.5675",
        "32",
      ],
    },
    {
      cols: [
        "Yogitha Sethu",
        "221072",
        "S3 AEI",
        "Other",
        "9895714222",
        "3800000",
        "5.8125",
        "Kozhikode",
        "Thiruvannur",
        "373",
        "18.5143",
        "24.3268",
        "33",
      ],
    },
    {
      cols: [
        "Bhavya Nair",
        "220879",
        "S3 EEE",
        "Other",
        "9074878915",
        "3899844",
        "5.7189",
        "Pallakkad",
        "Olavakkod",
        "337",
        "17.4857",
        "23.2046",
        "34",
      ],
    },
    {
      cols: [
        "KARTHIKA P V",
        "U230746",
        "S35 ME",
        "Other",
        "8590618304",
        "3260510",
        "7.6975",
        "Ernakulam",
        "THRIKKAKARA",
        "214",
        "13.8000",
        "21.4975",
        "35",
      ],
    },
    {
      cols: [
        "Serah Miya Ison",
        "220699",
        "S3 EEE",
        "Other",
        "7306250105",
        "3246828",
        "7.7659",
        "Kottayam",
        "Puliyannoor P.O.",
        "156",
        "11.8667",
        "19.6325",
        "36",
      ],
    },
    {
      cols: [
        "Shezma Bijumon",
        "220172",
        "S3 CSE",
        "Other",
        "9400301678",
        "4270032",
        "5.3718",
        "Ernakulam",
        "Mudickal Post",
        "219",
        "13.9667",
        "19.3385",
        "37",
      ],
    },
  ];

  let IncomeWeightage = [
    [undefined, 0, undefined],
    [0, 50000, 75],
    [50001, 100000, 66],
    [100001, 200000, 60],
    [200001, 300000, 54],
    [300001, 400000, 48],
    [400001, 600000, 42],
    [600001, 900000, 36],
    [900001, 1200000, 30],
    [1200001, 1800000, 24],
    [1800001, 2400000, 18],
    [2400001, 3600000, 12],
    [3600001, 10000000, 6],
    [undefined, undefined, 0],
  ];

  let DistanceWeightage = [
    [undefined, 0, 0],
    [0, 20, 0],
    [21, 40, 5],
    [41, 100, 10],
    [101, 250, 15],
    [251, 600, 25],
  ];

  const calcIncomeWeightage = (income) => {
    for (let i = 0; i < IncomeWeightage.length; i++) {
      if (income > IncomeWeightage[i][0] && income < IncomeWeightage[i][1]) {
        const value =
          IncomeWeightage[i][2] -
          ((income - IncomeWeightage[i - 1][1]) /
            (IncomeWeightage[i][1] - IncomeWeightage[i - 1][1])) *
            (IncomeWeightage[i][2] - IncomeWeightage[i + 1][2]);
        return value;
      }
    }
  };

  const calcDistanceWeightage = (distance) => {
    for (let i = 1; i < DistanceWeightage.length; i++) {
      if (distance < 20) return null;
      if (
        distance > DistanceWeightage[i][0] &&
        distance < DistanceWeightage[i][1]
      ) {
        const value =
          DistanceWeightage[i - 1][2] +
          ((distance - DistanceWeightage[i - 1][1]) /
            (DistanceWeightage[i][1] - DistanceWeightage[i - 1][1])) *
            (DistanceWeightage[i][2] - DistanceWeightage[i - 1][2]);
        return value;
      }
    }
  };

  const [ranklist, setranklist] = useState([])
  const calcRankList = (data) => {
    const ranklist = data.map((d) => {
      let w =
        calcDistanceWeightage(parseFloat(d.cols[9])) +
        calcIncomeWeightage(parseFloat(d.cols[5]));
      d.cols[12] = w.toFixed(3);
      return d;
    });

    ranklist.sort((a, b) => a.cols[13] - b.cols[13]);
    console.log("ranklist", ranklist);
    ranklist.map((d,i)=> d.cols[13]=i+1)
    setranklist(ranklist)
  };

useEffect(()=>{
  calcRankList(data)
},[])
  const GeneratePdf = () => {
    const doc = new jsPDF("p", "pt", "letter");

    autoTable(doc, { html: "#my-table" });

    console.log(data[0].cols[0]);
    doc.setLineWidth(2);

    // Or use javascript directly:
    autoTable(doc, {
      styles: { cellPadding: 0.5, fontSize: 7 },
      startY: 10,
      theme: "grid",
      head: [
        [
          "Name",
          "Coll. Adm.No.",
          "Class",
          "Category",
          "Mobile",
          "AFI",
          "W-AFI",
          "District",
          "Post Office",
          "Distance",
          "W-Distance",
          "total",
          "total",
          "rank"
        ],
      ],
      body: [
        ...ranklist.map(d => [...d.cols])

        // [...ranklist[0].cols],
        // [...ranklist[1].cols],
        // [...ranklist[2].cols],
        // [...ranklist[3].cols],
        // [...ranklist[4].cols],
        // [...ranklist[5].cols],
        // [...ranklist[6].cols],
        // [...ranklist[7].cols],
        // [...ranklist[8].cols],
        // [...ranklist[9].cols],
        // [...ranklist[10].cols],
        // [...ranklist[11].cols],
        // [...ranklist[12].cols],
        // [...ranklist[13].cols],
        // [...ranklist[14].cols],
        // [...ranklist[15].cols],
        
      ],
    });

    doc.save("table.pdf");
  };

  return (
    <div className="w-11/12">
      <div className="flex items-center justify-between w-4/12">
        <select className="p-3 ring-slate-200 ring-2 rounded-xl outline-none">
          <option value="mh">Mens Hostel</option>
          <option value="lh">Ladies Hostel</option>
        </select>
        <select className="p-3 ring-slate-200 ring-2 rounded-xl outline-none">
          <option value="firstyear">First Year</option>
          <option value="secondyear">Second Year</option>
          <option value="thirdyear">Third Year</option>
          <option value="fourthyear">Fourth Year</option>
        </select>
      </div>
      <div className="flex items-center justify-end mb-5">
        <button
          onClick={GeneratePdf}
          className="bg-stone-800 text-white p-2 rounded-lg text-sm mr-5"
        >
          Download
        </button>
        <button className="bg-stone-800 text-white p-2 rounded-lg text-sm">
          Publish Rank List
        </button>
      </div>
      <Ranklist1 data = {ranklist} />
    </div>
  );
}

export default GenerateRanklist;
