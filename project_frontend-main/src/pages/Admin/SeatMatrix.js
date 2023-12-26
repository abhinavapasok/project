import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion" 
import axios from 'axios'
import { baseUrl } from '../../baseUrl'
function SeatMatrix() {

    const seatMH={
        "A Block":[
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
        ],
        "B Block":[
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
    
    const seatLH={
        "Old Block":[
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
        ],
        "New Block":[
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
  
    const tabs=["Mens Hostel", "Ladies Hostel"]

    const [seatMHData, setSeatMHData] = useState({})
    const [seatLHData, setSeatLHData] = useState({})

    const [blockSelected, setBlockSelected] = useState(null)
    const [floorIndexSelected, setFloorIndexSelected] = useState(null)
    const [selectAll, setSelectAll] = useState(false)
    const [selectedCount, setSelectedCount] = useState(0)
    const [roomData, setRoomData] = useState([])
    const [userType, setUserType] = useState("First Year")

    //modal fields
    const [rangeFrom, setRangeFrom] = useState(0)
    const [rangeTo, setRangeTo] = useState(0)

    const [tabSelected, setTabSelected] = useState(0) //selected tab index
    const [modal, setModal] = useState(null) //modal showing columns

    const [modalType, setModalType] = useState(0) //0 for existing attribute modal 1 for derived attribute modal
    const [maximumInmates, setMaximumInmates] = useState(0)
    const [hoverIndex, setHoverIndex] = useState(-1)

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
    
           console.log(tempData)
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

    // useEffect(() => {
    //     //Fetch this data from database hostel_room table
    //     const rangeArray = [...Array(rangeTo - rangeFrom + 1).keys()].map(x => x + rangeFrom);
    //     var roomDataFetched=[]
    //     rangeArray.forEach((roomNo, index)=>{
    //         roomDataFetched.push({
    //             roomNo:roomNo,
    //             selected:false,
    //             userType:null,
    //             maximumInmates: null
    //         })
    //     })

    //     setRoomData([...roomDataFetched])
    // }, [rangeFrom, rangeTo])
    
    useEffect(() => {
        var hostelData=tabSelected==0?{...seatMHData}:{...seatLHData}
        if(hostelData[blockSelected]!=undefined && hostelData[blockSelected].floorData[floorIndexSelected]!=undefined)
        {
            var range=hostelData[blockSelected].floorData[floorIndexSelected].roomRange.split('-')
            setRangeFrom(parseInt(range[0]))
            setRangeTo(parseInt(range[1]))
         
            getRoomsInfo();
            
        }
    }, [blockSelected, floorIndexSelected])

    useEffect(() => {
        var hostelData=tabSelected==0?{...seatMHData}:{...seatLHData}
        if(hostelData[blockSelected]!=undefined && hostelData[blockSelected].floorData[floorIndexSelected]!=undefined)
        {
            var newRoomData=[...roomData]
         
            if(selectAll==false)
            {
                newRoomData.forEach((room, index)=>{
                    newRoomData[index].selected=false
                })

                setSelectedCount(0)
            }
            else
            {
                newRoomData.forEach((room, index)=>{
                    newRoomData[index].selected=true
                })

                setSelectedCount(rangeTo-rangeFrom+1)
            }

            setRoomData([...newRoomData])
            
        }
    }, [selectAll])
    
    const getRoomsInfo=()=>{
        var hostelData=tabSelected==0?{...seatMHData}:{...seatLHData}

        axios.get(`${baseUrl}/admin/getRoomsInfo`,{
            params:{
                blockId: blockSelected,
                floorNo: hostelData[blockSelected].floorData[floorIndexSelected].floorNo
            }
        })
        .then(function (response) {
            console.log("success" , response.data ,"response.data");

            var roomDataFetched=[]
            response.data.forEach((room, index)=>{
                roomDataFetched.push({
                    roomId:room.room_id,
                    roomNo:room.room_no,
                    selected:false,
                    userType:room.user_type,
                    maximumInmates: room.maximum_inmates,
                    currentInmates: room.current_inmates
                })
            })

            setRoomData([...roomDataFetched])
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
        });
    }

    const updateSeatMatrix=()=>{
        var hostelData=tabSelected==0?{...seatMHData}:{...seatLHData}

        axios.post(`${baseUrl}/admin/updateSeatMatrix`,{
            roomData:roomData,
            blockId: blockSelected,
            floorNo: hostelData[blockSelected].floorData[floorIndexSelected].floorNo
        })
        .then(function (response) {
            console.log("success" , response ,"response.data");
            getRoomsInfo()
            alert("Updated")
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
        });
    }
    
    const Matrix=({hostelData})=>{
        if(hostelData[blockSelected]!=undefined && hostelData[blockSelected].floorData[floorIndexSelected]!=undefined)
        {

            return(
                <div className='w-full p-3'>
                    <div classNaSme='font-bold text-stone-800 text-base'>{hostelData[blockSelected].blockName} : Floor No - {hostelData[blockSelected].floorData[floorIndexSelected].floorNo}</div>

                    <div className='flex flex-row w-full justify-between items-start'>

                        <div className='flex flex-col space-y-2'>
                            <div className='flex flex-row space-x-2 items-center'>
                                <div className='text-stone-800 text-sm font-bold'>Assign To</div>
                                <select 
                                    className=' p-2 outline-none rounded-xl '
                                    value={userType}
                                    onChange={e=>{setUserType(e.target.value)}}
                                >
                                    <option value="1">First year</option>
                                    <option value="2">Second year</option>
                                    <option value="3">Third year</option>
                                    <option value="4">Fourth year</option>
                                    <option value="5">Fifth year</option>
                                    <option value="pg 1">PG first year</option>
                                    <option value="pg 1">PG second year</option>
                                    <option value="phd">PHD</option>
                                </select>

                                <div 
                                    className='button-blue'
                                    onClick={()=>{
                                        var newRoomData=[...roomData]
                                        newRoomData.forEach((room,index)=>{
                                            if(room.selected==true)
                                            {
                                                newRoomData[index].userType=userType
                                            }
                                        })
                                        setRoomData([...roomData])
                                    }}
                                >
                                    Assign selected rooms
                                </div>
                            </div>

                            <div className='flex flex-col w-fit'>
                                <div className='text-stone-800 text-sm font-bold'>Maximum Inmates</div>
                                <div className='flex flex-row space-x-2 items-center'>
                                    <input 
                                        type='number' 
                                        min={0} 
                                        placeholder="Maximum inmates"
                                        className='p-2 w-52 outline-none ring-slate-200 ring-2 rounded-xl'
                                        value={maximumInmates}
                                        onChange={(e)=>{setMaximumInmates(e.target.value)}}
                                    />

                                    <div 
                                        className='button-blue'
                                        onClick={()=>{
                                            var newRoomData=[...roomData]
                                            newRoomData.forEach((room,index)=>{
                                                if(room.selected==true)
                                                {
                                                    newRoomData[index].maximumInmates=maximumInmates
                                                }
                                            })
                                            setRoomData([...roomData])
                                        }}
                                    >
                                        Assign selected rooms
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-row space-x-2 items-center'>
                            <input 
                                type="checkbox" 
                                value={selectAll} 
                                onChange={(e)=>{setSelectAll(value=>!value)}}
                                checked={selectAll}
                            />
                            <div className='text-stone-800 text-sm font-bold'>Select All</div>
                        </div>
                        
                    </div>
                    <div className='mt-8 grid grid-cols-10 gap-4 '>
                        {roomData.length!=0&&roomData.map((room, index)=>(
                            <div 
                                key={index} 
                                className={'flex rounded-xl items-center cursor-pointer justify-center font-bold w-10 h-10 relative '+(room.selected?'bg-blue-500 text-white':'bg-blue-200 text-stone-800')}
                                onClick={()=>{
                                    var newRoomData=[...roomData]
                                    if(newRoomData[index].selected==true)
                                    {
                                        setSelectedCount(count=>count-1)
                                    }
                                    else
                                    {
                                        if(selectedCount==rangeTo-rangeFrom)
                                            setSelectAll(true)
                                        setSelectedCount(count=>count+1)
                                    }

                                    newRoomData[index].selected=!newRoomData[index].selected
                                    setRoomData([...newRoomData])
                                }}
                                onMouseEnter={()=>{setHoverIndex(index)}}
                                onMouseLeave={()=>setHoverIndex(-1)}
                            >
                                <div>{room.roomNo}</div>

                                <div className='absolute flex items-center justify-center text-xs -bottom-4 -left-4 bg-green-500 h-8 w-8 p-1 text-white font-bold rounded-full'>
                                    <div>{room.userType?room.userType:"nil"}</div>
                                </div>

                                {room.maximumInmates&&(<div className='absolute flex items-center justify-center text-xs -top-4 -right-4 bg-blue-500 h-8 w-8 p-1 text-white font-bold rounded-full'>
                                    <div>{room.maximumInmates}</div>
                                </div>)}

                                {hoverIndex==index&&(
                                    <div className='inset-0 bg-stone-800/80 flex items-center justify-center text-white font-bold rounded-xl absolute'>
                                        <div>{room.currentInmates}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        else
            return (<></>)
    }

    //Function to show select the block and floor and to show seat matrix
    const showMatrix=()=>{
        var hostelData=tabSelected==0?{...seatMHData}:{...seatLHData}
        var blocks=[]

        for(var blockId in hostelData)
        {
            blocks.push({
                blockId: blockId,
                blockName: hostelData[blockId].blockName
            })
        }

        console.log(blocks)

        return(
        <div className='w-full h-full flex flex-row text-sm overflow-hidden'>
            <div className='flex flex-col overflow-y-auto w-full'>

                <div className='flex flex-row space-x-4 w-full'>
                    <div className='flex flex-col w-3/12'>
                        <div className='text-stone-800 font-bold text-md'>Select the block</div>
                        <select 
                            className=' p-2 outline-none rounded-xl w-full'
                            onChange={(e)=>{setBlockSelected(e.target.value)}}
                        >
                            <option value={null}>-- select --</option>
                            {blocks.map((block, index)=>(
                                <option key={index} value={block.blockId}>{block.blockName}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col w-3/12'>
                        <div className='text-stone-800 font-bold text-md'>Select a floor</div>
                        <select 
                            className=' p-2 outline-none rounded-xl w-full'
                            onChange={(e)=>{setFloorIndexSelected(e.target.value)}}
                        >
                            <option value={null}>-- select --</option>
                            {hostelData[blockSelected]&&hostelData[blockSelected].floorData.map((floorItem, floorIndex)=>(
                                <option key={floorIndex} value={floorIndex}>{floorItem.floorNo}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='w-full h-full overflow-y-auto bg-slate-100 rounded-xl mt-4'>
                    {/* show seat matrix */}
                    {Matrix({hostelData})} 
                </div>

                <div 
                    className='button-blue self-end mt-2'
                    onClick={updateSeatMatrix}
                >
                    Update
                </div>
            </div>
            {/* </div>
            </div> */}

            
        </div>
    )
    }

    return (
    <div className='flex flex-col w-full items-center min-h-screen text-stone-800'>

      {/* modal for adding fields */}
      {modal&&modal}

        <div className='w-full flex justify-center pt-4'>
            <div className='flex flex-row justify-between w-11/12 items-center'>
            <div className='text-xl font-bold'>Seat Matrix</div>
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
                            setFloorIndexSelected(null)
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

                {showMatrix()}
                {/* {tabSelected==1&&updateRule()} */}

            </div>
      
        </div>
    </div>
  )
}

export default SeatMatrix