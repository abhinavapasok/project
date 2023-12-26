import React, { useContext, useEffect, useState } from 'react'
import {motion} from "framer-motion" 
import axios from 'axios'
import { UserContext } from '../../Contexts/UserContext'
import { baseUrl } from '../../baseUrl'
function HostelBlocks() {

    const seatMH={
        1:{
            blockName:"a block",
            floorData:[
                {
                    floorNo:0,
                    roomRange:"100-121"
                },
                {
                    floorNo:1,
                    roomRange:"200-221"
                },
                {
                    floorNo:2,
                    roomRange:"300-321"
                }
            ]
        },

        2:{
            blockName:"b block",
            floorData:[
                {
                    floorNo:0,
                    roomRange:"100-121"
                },
                {
                    floorNo:1,
                    roomRange:"200-221"
                },
                {
                    floorNo:2,
                    roomRange:"300-321"
                }
            ]
        },
      }
    
      const seatLH={
        "Old Block":{
            blockName:"a block",
            floorData:[
                {
                    floorNo:0,
                    roomRange:"100-121"
                },
                {
                    floorNo:1,
                    roomRange:"200-221"
                },
                {
                    floorNo:2,
                    roomRange:"300-321"
                }
            ]
        }
    }
  
  const tabs=["Mens Hostel", "Ladies Hostel"]

  const [seatMHData, setSeatMHData] = useState({})
  const [seatLHData, setSeatLHData] = useState({})

  const [blockSelected, setBlockSelected] = useState(null)
  const [addBlock, setAddBlock] = useState(false)
  const [newBlockName, setNewBlockName] = useState("")

  //modal fields
  const [rangeFrom, setRangeFrom] = useState(0)
  const [rangeTo, setRangeTo] = useState(0)

  const [tabSelected, setTabSelected] = useState(0) //selected tab index
  const [modal, setModal] = useState(null) //modal showing columns

  const [modalType, setModalType] = useState(0) //0 for existing attribute modal 1 for derived attribute modal

  const {setLoading} = useContext(UserContext)
  const backdropClickHandler = (event) => {
    if (event.target === event.currentTarget) {
        // setModal(<div/>)
        setModal(null)
    }
  }

  const getBlocksData=()=>{
    axios.get(`${baseUrl}/admin/getBlocks`,{
        params:{
            hostel: tabSelected==0?"MH":"LH"
        }
    })
    .then(function (response) {
       console.log(response.data)

       var tempData={}
       response.data.forEach(item => {
           console.log(item)
           if(tempData[item.block_id]==undefined)
           {
               tempData[item.block_id]={}
               tempData[item.block_id].blockName=item.block_name
               tempData[item.block_id].floorData=[]
           }

           if(item.floor_no!=null)
           {
               tempData[item.block_id].floorData.push(
                   {
                       floorNo:item.floor_no,
                       roomRange:item.rangefrom+"-"+item.rangeto
                   }
               )
           }
       });

       if(tabSelected==0) //MH
       {
            setSeatMHData(tempData)
       }
       else if(tabSelected==1) //LH
       {
            setSeatLHData(tempData)
       }
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  useEffect(() => {
    getBlocksData()
  }, [tabSelected])

  useEffect(() => {
    if(modal!=null)
      RenderModal()
  }, [rangeFrom, rangeTo, modalType])

  const RenderModal=(fieldInsertIndex)=>{
    
    if(modalType===0) //modaltype=0 to add floor
    {
        const hostelData=tabSelected==0?{...seatMHData}:{...seatLHData}
        setModal(
            <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
                <div className='flex flex-col bg-white rounded-2xl w-5/12 h-auto pt-3 relative overflow-hidden'>

                    <div
                        // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                        className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                        onClick={()=>{
                            setModal(null)
                            // setSelectedColumnIndex(-1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    
                    <div className='text-stone-800 border-b border-solid border-stone-800 text-lg p-2 font-semibold w-full'>
                        Enter Floor Details
                    </div>

                    <form className='flex flex-col h-full justify-center mt-2 bg-white rounded-lg text-sm px-2'>
                        <label className='text-stone-800 font-semibold'>Floor No</label>
                        <input 
                            type="number"
                            className='p-2 w-80 outline-none ring-slate-200 ring-2 rounded-xl'
                            disabled
                            // placeholder={hostelData[blockSelected].floorData.length}
                            required={true}
                            value={hostelData[blockSelected].floorData.length}
                        />

                        <label className='mt-2 text-stone-800 font-semibold'>Room Range</label>
                        <div className='flex flex-row space-x-2 mt-2'>
                            <div className='flex flex-row space-x-2'>
                                <label className='mt-2 text-stone-800 font-semibold'>From : </label>
                                <input 
                                    className='p-2 w-3/12 outline-none ring-slate-200 ring-2 rounded-xl'
                                    required={true}
                                    type="number"
                                    onChange={e=>setRangeFrom(e.target.value)}
                                    value={rangeFrom}
                                />
                            </div>

                            <div className='flex flex-row space-x-2'>
                                <label className='mt-2 text-stone-800 font-semibold'>To : </label>
                                <input 
                                    className='p-2 w-3/12 outline-none ring-slate-200 ring-2 rounded-xl'
                                    required={true}
                                    type="number"
                                    onChange={e=>setRangeTo(e.target.value)}
                                    value={rangeTo}
                                />
                            </div>
                        </div>
                        
                        {/* Add button */}
                        <div className='flex p-2 justify-end'>
                            <input
                            type="submit"
                            value="Add Floor"
                            className='button-blue self-end'
                            onClick={(e)=>{
                                e.preventDefault()
                                if(rangeFrom>=0&&rangeTo>=0)
                                {
                                    setLoading(true)
                                    axios.post('http://localhost:8080/admin/addFloor',{
                                        floorNo: hostelData[blockSelected].floorData.length,
                                        rangeFrom: rangeFrom,
                                        rangeTo: rangeTo,
                                        blockId: blockSelected
                                    })
                                    .then(function (response) {
                                        console.log(response)

                                        var updatedFloorData=[...hostelData[blockSelected].floorData]
                                        
                                        updatedFloorData.push({
                                            floorNo: response.data.floor_no,
                                            roomRange:response.data.rangefrom+"-"+response.data.rangeto
                                        })

                                        hostelData[blockSelected].floorData=[...updatedFloorData]
                                        
                                        if(tabSelected==0)
                                            setSeatMHData({...hostelData})
                                        else    
                                            setSeatLHData({...hostelData})

                                        setLoading(false)
                                    })
                                    .catch(function (error) {
                                        console.log("FAILED!!! ",error);
                                        setLoading(false)
                                    });

                                    // var newHostelData={...hostelData}
                                    // var newBlockData=[...newHostelData[blockSelected]]

                                    // newBlockData.push({
                                    //     floorNo:hostelData[blockSelected].length,
                                    //     roomRange:rangeFrom+"-"+rangeTo
                                    // })

                                    // newHostelData[blockSelected]=newBlockData
                                    
                                    // if(tabSelected==0)
                                    //     setSeatMHData({...newHostelData})
                                    // else
                                    //     setSeatLHData({...newHostelData})
                                    setModal(null)
                                    setRangeFrom(-1)
                                    setRangeTo(-1)
                                }
                            }}
                            />
                        </div>
                    </form>

                </div>
            </div>
        )
    }
    
  }

  //function to capitalize first letter of a word
  const capitalize=(word)=>{
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  //function to capitalize eaach word of a string joined using splitChar
  const capitalizeString=(str,splitChar)=>{
    return str.split(splitChar).map(word=>capitalize(word)).join(' ')
  }

  const renderBlocks=(hostelData)=>{
    var render=[]
    for(var blockId in hostelData)
    {
        render.push({
            blockId:blockId,
            blockName:hostelData[blockId].blockName,
            floorsData:[...hostelData[blockId].floorData]
        })
    }
    
    console.log(render)

    return render.map((item, index)=>(
        <tr 
        className='border-b border-slate-200 border-solid'
        >
            <td className='py-3'>{item.blockName}</td>
            <td className='py-2 flex flex-row space-x-2'>
                <div 
                className='flex flex-row space-x-1 cursor-pointer items-center w-fit p-3 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-xl'
                onClick={()=>{
                    // setblockSelected([...item.blockSelected])
                    setBlockSelected(item.blockId)
                    // console.log(JSON.parse(currentApplicationsData[index].fields))
                }}
                >
                    <div>View</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>

                {/* Delete Application */}
                <div 
                    className='button-red p-2 flex items-center justify-center'

                    onClick={()=>{
                      axios.get('http://localhost:8080/admin/deleteBlock',{
                        params:{
                            blockId: item.blockId
                        }
                      })
                      .then(function (response) {
                        getBlocksData()
                      })
                      .catch(function (error) {
                          console.log("FAILED!!! ",error);
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>                    
                  </div>
            </td>
        </tr>
    ))
  }

  const showBlocks=()=>{
    var hostelData=tabSelected==0?seatMHData:seatLHData
    return(
      <div className='w-full h-full flex flex-row text-sm overflow-hidden'>
          {/* <div className='w-1/2 flex flex-col overflow-hidden'>
            <div className='w-full overflow-y-auto'> */}
            <div className='flex flex-col overflow-y-auto w-1/2'>
                <table className='w-full table-auto'>
                    <tr className='bg-primary text-left sticky top-0'>
                        <th className='py-3'>Block Name</th>
                        <th>Block Details</th>
                    </tr>
                    {renderBlocks(hostelData)}
                    {addBlock&&(<tr 
                    className='border-b border-slate-200 border-solid'
                    >
                        <td className='py-3'>
                            <input 
                                className='p-2 w-8/12 outline-none ring-slate-200 ring-2 rounded-xl'
                                required={true}
                                placeholder="Block Name"
                                type="text"
                                onChange={e=>setNewBlockName(e.target.value)}
                                value={newBlockName}
                            />
                        </td>
                        <td className='py-2'>
                            <div 
                            className='flex flex-row space-x-2 items-center w-fit '
                            
                        >
                                <div 
                                    className='button-blue'
                                    onClick={()=>{
                                        axios.post('http://localhost:8080/admin/addBlock',{
                                            hostel: tabSelected==0?"MH":"LH",
                                            blockName: newBlockName
                                        })
                                        .then(function (response) {
                                            console.log(response.data)

                                            getBlocksData()
                                        
                                            setAddBlock(false)
                                            setNewBlockName("")
                                        })
                                        .catch(function (error) {
                                            console.log("FAILED!!! ",error);
                                        });

                                        // hostelData[newBlockName]=[]
                                        // if(tabSelected==0)//mh
                                        //     setSeatMHData({...hostelData})
                                        // else //lh
                                        //     setSeatLHData({...hostelData})
                                    }}
                                >Add Block
                                </div>
                                <div 
                                    className='rounded-lg p-2 bg-red-500 self-start text-white text-base font-medium hover:bg-red-700'
                                    onClick={()=>{
                                        setAddBlock(false)
                                    }}
                                >Delete
                                </div>
                            </div>
                        </td>
                    </tr>)}
                </table>

                <div 
                    className='p-3 w-fit self-end mt-2 mr-2 font-bold text-white rounded-xl bg-stone-800 cursor-pointer hover:bg-stone-600'
                    onClick={()=>{
                        setAddBlock(true)
                    }}
                >+ Add a new block
                </div>
            </div>
            {/* </div>
          </div> */}

          <div className='flex flex-col min-h-full bg-slate-100 w-1/2'>
            {blockSelected!=null?(
            <div className='w-full h-full flex flex-col overflow-hidden'>
                {/* <div className='w-full flex flex-row justify-between items-center px-3 text-center py-3 bg-slate-200 text-stone-800 font-bold'>
                    Block Details

                </div> */}
                <div className='flex flex-col overflow-y-auto w-full text-center'>
                    <table className='w-full table-auto'>
                        <tr className='bg-primary text-left sticky top-0 text-center'>
                            <th className='py-3'>Floor No</th>
                            <th>Room Range</th>
                        </tr>
                            {hostelData[blockSelected].floorData.map((item, index)=>(
                            <tr 
                                className='border-b border-slate-200 border-solid'
                            >
                                <td className='py-3'>{item.floorNo}</td>
                                <td className='py-2'>
                                <div 
                                    // className='flex flex-row space-x-1 cursor-pointer items-center w-fit p-3 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-xl'
                                    // onClick={()=>{
                                    //   setApplicationSelectedIndex(index)
                                    //   // console.log(JSON.parse(currentApplicationsData[index].fields))
                                    // }}
                                >
                                    {item.roomRange}
                                    {/* <div>Preview</div> */}
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg> */}
                                </div>
                                </td>
                            </tr>
                            ))}
                    </table>

                    <div 
                    className='p-3 w-fit self-end mt-2 mr-2 font-bold text-white rounded-xl bg-stone-800 cursor-pointer hover:bg-stone-600'
                    onClick={()=>{
                        setModalType(0)
                        RenderModal()
                    }}
                    >+ Add a new floor
                    </div>
                </div>
            </div>
            ):(
              <div className='w-full h-full flex flex-col'>
                <div className='w-full text-center py-3 bg-slate-200 text-stone-800 font-bold'>
                  Block Details
                </div>
                <div className='h-full flex flex-col items-center justify-center w-full'>
                  <div>Select a block to view</div>
                </div>
              </div>
            )}
          </div>
        </div>
    )
  }

  return (
    <div className='flex flex-col w-full items-center min-h-screen text-stone-800'>

      {/* modal for adding fields */}
      {modal&&modal}

      <div className='w-full flex justify-center pt-4'>
        <div className='flex flex-row justify-between w-11/12 items-center'>
          <div className='text-xl font-bold'>Hostel Blocks</div>
          <div className='flex flex-row space-x-4 items-center'>
              <div className='bg-white border rounded-full w-10 aspect-square'/>
              <div>user Name</div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 admin-dashbord-height bg-white rounded-xl'>
        <div className='flex flex-col w-11/12  h-full'>
          {/* white box nav bar */}
          <div className='flex flex-row tex-black text-sm font-bold relative'>
              {tabs.map((item, index)=>(
                <div
                  key={index}
                  className='mr-5 cursor-pointer'
                  onClick={()=>{
                    setBlockSelected(null)
                    setTabSelected(index)
                  }}
                >
                    <div>{item}</div>
                    <div className={tabSelected==index?'h-1 self-center w-full bg-stone-800 rounded-full':''}/>
                </div>
              ))}
          </div>

          <hr className='w-full mt-2 self-center h-0 bg-stone-800' />
          {/* navbar ends */}

          {showBlocks()}
          {/* {tabSelected==1&&updateRule()} */}

        </div>

          
      </div>
    </div>
  )
}

export default HostelBlocks