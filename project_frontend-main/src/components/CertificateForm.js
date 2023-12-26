import {useState} from 'react'
import ApplicationBoxes from './ApplicationBoxes'
function CertificateForm() {
  return (
    // <form action="" className="w-11/12">
    //         <div className="grid grid-cols-2 gap-y-4 w-6/12">
    //             <label htmlFor="">Nature of Certificate:</label>
    //             <select name="" id="" className="border-solid border-2 rounded-lg ml-3 p-1" required>
    //                 <option value="">Select Certificate</option>
    //                 <option value="inmate">Inmate Certificate</option>
    //                 <option value="nodue">No Due Certificate</option>
    //                 <option value="fee">Fee Structure Certificate</option>
    //             </select>
    //             <label htmlFor="">Purpose of Certificate:</label>
    //             <textarea placeholder="Enter the purpose for applying" className="border-solid border-2 rounded-lg ml-3 p-1" required/>
    //             <label htmlFor="">Remarks (if any):</label>
    //             <textarea placeholder="Enter remarks" className="border-solid border-2 rounded-lg ml-3 p-1"/>
    //         </div>
    //         <div className="w-full flex items-end justify-end mt-5">
    //             <button className="ml-auto p-3 bg-stone-800 text-white rounded-xl">Apply for certificate</button>
    //         </div>
    //       </form>
    <ApplicationBoxes/>
  )
}

export default CertificateForm