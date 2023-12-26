import axios from 'axios'
import React, { useEffect, useState } from 'react'
import optimizedSearch from '../../components/Search'
import { baseUrl } from '../../baseUrl'
function AdminNonInmates() {
  const dummyData=[
    {
      admNo:"1234",
      name:"xyz",
      dept:"cse",
      batch:"batchId",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      admNo:"1234",
      name:"xyz",
      dept:"cse",
      batch:"batchId",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      admNo:"1234",
      name:"xyz",
      dept:"cse",
      batch:"batchId",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      admNo:"1234",
      name:"xyz",
      dept:"cse",
      batch:"batchId",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      admNo:"1234",
      name:"xyz",
      dept:"cse",
      batch:"batchId",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      admNo:"1234",
      name:"xyz",
      dept:"cse",
      batch:"batchId",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      admNo:"1234",
      name:"xyz",
      dept:"cse",
      batch:"batchId",
      phone:"9876857465",
      email:"xyz@gmail.com"
    },
    {
      admNo:"1234",
      name:"xyz",
      dept:"cse",
      batch:"batchId",
      phone:"9876857465",
      email:"xyz@gmail.com"
    }
  ]

  const [nonInmates, setNonInmates] = useState([])
  const [nonInmatesOriginal, setNonInmatesOriginal] = useState([])

  const [searchText, setSearchText] = useState("")
  const [filter, setFilter] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/admin/noninmates`)
    .then(function (response) {
        console.log("success" , response ,"response.data");
        setNonInmatesOriginal(response.data.map(item=>({...item})))
        setNonInmates(optimizedSearch(
          {
            searchText:searchText, 
            originalData:response.data.map(item=>({...item})), 
            filters:filter
          }))
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }, [])

  useEffect(() => {
    setNonInmates(optimizedSearch({
      searchText:searchText, 
      originalData:nonInmatesOriginal, 
      filters:filter
    }))
  }, [filter])


  return (
    <div className='flex flex-col w-full items-center min-h-screen'>
      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Non Inmates</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 admin-dashbord-height bg-white rounded-xl'>
        {/* white box nav bar */}
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='flex flex-row tex-black text-sm font-bold'>
              <div
                className='cursor-pointer '
              >
                  <div>Non Inmates<span className='ml-2 p-2 text-white bg-stone-800 rounded-lg cursor-default'>{nonInmatesOriginal.length}</span></div>
                  <div className='h-1 self-center w-8/12 bg-stone-800 rounded-full'/>
              </div>
          </div>

          {/* <div className='text-sm mb-2'>Showing 1-8 out of 200 results</div> */}
        </div>

        {/* search and filter */}
        <div className='flex flex-col w-11/12 bg-primary rounded-lg '>
          <div className='flex flex-row w-full w-full items-center p-3 justify-between'>
            {/* search */}
            <div className='flex flex-row items-center bg-white rounded-lg text-sm px-2'>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                  placeholder='Search by name or by admission number'
                  type="text"
                  className='p-2 w-80 outline-none'
                  value={searchText}
      
                  onChange={(e)=>{
                    setSearchText(e.target.value)
                    setNonInmates(optimizedSearch(
                    {
                      searchText:e.target.value, 
                      originalData:nonInmatesOriginal, 
                      filters:filter
                    }))
                  }}
                />
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            {/* filter and export*/}
            <div className='flex flex-row space-x-2 items-center'>
              <div className='font-bold text-base text-stone-800'>Filter </div>
              {nonInmatesOriginal[0]&&(
              <select 
                onChange={e=>{setFilter(f=>[...f,e.target.value])}}
                className='p-2 w-40 outline-none ring-slate-200 ring-2 rounded-xl'
              >
                <option>-- select --</option>
                {Object.keys(nonInmatesOriginal[0]).
                              filter(item=>(
                                  item!="password"&&
                                  item!="designation"&&
                                  item!="is_admin"&&
                                  item!="stage")).map(item=>(<option>{item}</option>))}
              </select>)}
              {/* <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Filter</div> */}
              {/* <div className='py-2 cursor-pointer hover:bg-stone-600 px-3 bg-stone-800 text-white text-sm font-semibold rounded-2xl'>Export</div> */}
            </div>
          </div>

          {filter.length>0&&(<div className='w-full px-3 py-2 flex flex-wrap space-x-1'>
            {filter.map((item, index)=>(
              <div key={index} className='flex flex-row w-fit justify-between items-center py-2 px-3 bg-stone-800 text-white text-sm font-medium rounded-full'>
                <div>{item}</div>
                {/* remove button */}
                <div
                    className='ml-2 text-white cursor-pointer rounded-full hover:text-red-600'
                    onClick={()=>{
                        var newFilter=[...filter]
                        newFilter.splice(index,1)

                        setFilter([...newFilter])
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
              </div>
            ))}
          </div>)}
        </div>

        {/* inmates list */}
        <div className='w-11/12 overflow-y-scroll no-scrollbar'>
          <table className='w-full'>
              <tr className='bg-primary py-3 text-left sticky top-0'>
                <th className='py-3'>Admission Number</th>
                <th>Name</th>
                <th>Department</th>
                <th>Batch</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
              {nonInmates.map(user=>(
                <tr className='border-b border-slate-200 border-solid'>
                  <td className='py-3'>{user.user_id}</td>
                  <td className='py-3'>{user.name}</td>
                  <td className='py-3'>{user.dept}</td>
                  <td className='py-3'>{user.batch_name}</td>
                  <td className='py-3'>{user.mobile_no}</td>
                  <td className='py-3'>{user.email}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminNonInmates