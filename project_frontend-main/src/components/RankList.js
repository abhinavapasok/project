import {useState} from 'react'
const RankList = (props)=>{
    const applications=[
        {
          SlNo:1,
          Name:"Marc",
          AdmissionNo:180245,
          Income:10000,
          ExamRank:510,
          Branch:"CSE",
          Rank:1
        },
        {
          SlNo:2,
          Name:"Steven",
          AdmissionNo:180287,
          Income:100000,
          ExamRank:610,
          Branch:"CSE",
          Rank:2
        },
        {
          SlNo:3,
          Name:"Jake",
          AdmissionNo:180201,
          Income:100000,
          ExamRank:710,
          Branch:"CSE",
          Rank:3
        },
        {
          SlNo:4,
          Name:"Jake",
          AdmissionNo:180201,
          Income:100000,
          ExamRank:710,
          Branch:"CSE",
          Rank:4
        },
        {
          SlNo:5,
          Name:"Jake",
          AdmissionNo:180201,
          Income:100000,
          ExamRank:710,
          Branch:"CSE",
          Rank:5
        },
        {
          SlNo:6,
          Name:"Jake",
          AdmissionNo:180201,
          Income:100000,
          ExamRank:710,
          Branch:"CSE",
          Rank:6
        }
        
        
    ]
      const [ranks, setRanks] = useState(applications)
    return(
        <table className='w-full relative table-auto'>
              <tr className='rounded-xl p-3 bg-primary text-center'>
                <th className='p-3'>Sl.No</th>
                <th className='p-3'>Name</th>
                <th className='p-3'>Admission No.</th>
                <th className='p-3'>Annual Income</th>
                <th className='p-3'>Qualifying Exam Rank</th>
                <th className='p-3'>Branch</th>
                <th className='p-3'>Rank</th>
              </tr>
              {ranks.map((user, index)=>(
                <tr 
                  className={'border-b text-center border-slate-200 border-solid hover:bg-gray-300 '+(user.AdmissionNo===props.admno?' bg-teal-200 hover:bg-teal-300':'')}
                >
                  <td className='p-3'>{user.SlNo}</td>
                  <td className='p-3'>{user.Name}</td>
                  <td className='p-3'>{user.AdmissionNo}</td>
                  <td className='p-3'>{user.Income}</td>
                  <td className='p-3'>{user.ExamRank}</td>
                  <td className='p-3'>{user.Branch}</td>
                  <td className='p-3'>{user.Rank}</td>
                </tr>
              ))}
          </table>
    )
}
export default RankList