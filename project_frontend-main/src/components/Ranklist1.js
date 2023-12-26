import React, { useState } from 'react'

function Ranklist1(props) {
  console.log("data", props.data);
  return (

    <table className="w-full relative table-auto">
      <tr className="rounded-xl p-3 bg-primary text-center">
        <th className="p-3">Name</th>
        <th className="p-3">Admission No.</th>
        <th className="p-3">Class</th>
        <th className="p-3">Category</th>
        <th className="p-3">Mobile</th>
        <th className="p-3">Annual Income</th>
        <th className="p-3">District</th>
        <th className="p-3">Post Office</th>
        <th className="p-3">Distance</th>
        <th className="p-3">Total W</th>
        <th className="p-3">Rank</th>

      </tr>
      {props.data.map((user, index) => (
        <tr
          className={
            "border-b text-center border-slate-200 border-solid hover:bg-gray-300 " 
            // (user.AdmissionNo === props.admno
              // ? " bg-teal-200 hover:bg-teal-300"
              // : "")
          }
        >
          <td className="p-3">{user.cols[0]}</td>
          <td className="p-3">{user.cols[1]}</td>
          <td className="p-3">{user.cols[2]}</td>
          <td className="p-3">{user.cols[3]}</td>
          <td className="p-3">{user.cols[4]}</td>
          <td className="p-3">{user.cols[5]}</td>
          <td className="p-3">{user.cols[7]}</td>
          <td className="p-3">{user.cols[8]}</td>
          <td className="p-3">{user.cols[9]}</td>
          <td className="p-3">{user.cols[12]}</td>
          <td className="p-3">{user.cols[13]}</td>

        </tr>
      ))}
    </table>
  );
};


export default Ranklist1