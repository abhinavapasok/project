const ViewComplaintList = ({complaintHistory}) => {
    console.log(complaintHistory)
    return ( 
        <div className='w-full m-2 px-2 py-2 overflow-x-scroll'>
             <h1 className="font-semibold text-black text-lg mb-3 mt-3">Complaint History</h1>
             {<table className='w-full relative table-auto'>
                 <tr className='rounded-xl p-3 bg-primary text-center'>
                   <th className='p-3'>Sl.No</th>
                   <th className='p-3'>Complaint</th>
                   <th className='p-3'>Status</th>
                   <th className='p-3'>View</th>
                 </tr>
             </table>}
             {complaintHistory && complaintHistory.map((complaint,index)=>{
                return <tr 
                      key={index}
                      className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300'}
                    >
                      <td className='p-3'>{index}</td>
                      <td className='p-3'>{complaint.complaint}</td>
                      <td className='p-3'>{complaint.max}</td>
                      <td className='p-3'>View</td>
                     
    
                    </tr>
             })}
           </div>
     );
}
 
export default ViewComplaintList;