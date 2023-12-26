import { UpdateTwoTone } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spreadsheet from "react-spreadsheet";
import { baseUrl } from '../../baseUrl';
function AllotmentRule() {
  
  const hostelCols=[
    "Keam Rank",
    "Location",
    "Family Annual Income",
    "col 1",
    "col 2",
    "col 3",
    "col 4",
    "col 5",
    "col 6"
  ]

  const columns=[]

  const derivedColumns=[
    {
      colName:"derivedCol1",
      equation:""
    },
    {
      colName:"derivedCol2",
      equation:""
    },
    {
      colName:"derivedCol3",
      equation:""
    }
  ]
  
  
  const tabs=["Current Rule", "Update Rule"]

  const [hostelColsData, setHostelColsData] = useState([])

  //current rules states
  //Every column is stored as an array of object

  // {
  //   columnName:newAttribute,
  //   columnLetter:"",
  //   formula:newEquation,
  // }
  const [columnsData, setColumnsData] = useState([]) //current existing cols retrieved from databse
  const [derivedColumnsData, setDerivedColumnsData] = useState([]) //current derived cols retrieved from databse
  const [combinedColumnsData, setCombinedColumnsData] = useState([])
  
  //udated rules states
  const [updatedColumnsData, setUpdatedColumnsData] = useState([])
  const [updatedDerivedColumnsData, setUpdatedDerivedColumnsData] = useState([])
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(-1)

  const [newEquation, setNewEquation] = useState("")
  const [newAttribute, setNewAttribute] = useState("")
  const [newOrder, setNewOrder] = useState("Asc")
  const [updatedRule, setUpdatedRule] = useState([])
{/* updatedRule, rankRule has the form : ['A:ColumnName1:Asc', 'B:ColumnName2:Asc'] */}
  const [rankRule, setRankRule] = useState([])
  const [allotmentOpen, setAllotmentOpen] = useState(null)
  const [rankSortOrder, setRankSortOrder] = useState("Ascending")
  
  
  const [tabSelected, setTabSelected] = useState(0) //selected tab index
  const [modal, setModal] = useState(null) //modal showing columns

  const [modalType, setModalType] = useState(0) //0 for existing attribute modal 1 for derived attribute modal

  const [altTextIndex, setAltTextIndex] = useState(-1) //to show the formula on hover

  const getAllotmentColumns=()=>{
    axios.get(`${baseUrl}/admin/getAllotmentColumns`)
    .then(function (response) {
      console.log("allotmnent cols: ",response.data)

      const cols=[...response.data.columnData]

      console.log("colsss:",cols.filter(col=>col.columnType=='existing'))

      setColumnsData(cols.filter(col=>col.columnType=='existing').map(item=>({...item})))
      setUpdatedColumnsData(cols.filter(col=>col.columnType=='existing').map(item=>({...item})))

      setDerivedColumnsData(cols.filter(col=>col.columnType=='derived').map(item=>({...item})))
      setUpdatedDerivedColumnsData(cols.filter(col=>col.columnType=='derived').map(item=>({...item})))

      //combining the exisiting columns and derived columns
      combineColsData(cols.filter(col=>col.columnType=='existing').map(item=>({...item})),
      cols.filter(col=>col.columnType=='derived').map(item=>({...item})))
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  const getHostelRequirements=(req, res)=>{
    axios.get(`${baseUrl}/admin/getHostelRequirements`)
    .then(function (response) {

      console.log("dsds",response.data["rankRule"].split(','))
      if(response.data["rankRule"]!="")
      {
        setRankRule(response.data["rankRule"].split(','))
        setUpdatedRule(response.data["rankRule"].split(','))
      }
      else
      {
        setRankRule([])
        setUpdatedRule([])
      }

      setAllotmentOpen(response.data.allotmentOpen)
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  useEffect(() => {
    axios.get(`${baseUrl}/admin/getHostelCols`)
    .then(function (response) {
       console.log(response.data)
       setHostelColsData(response.data) //filling the drop down of existing columns

    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });

    getAllotmentColumns()
    getHostelRequirements()
  }, [])

  const updateHostelAllotmentOpen=()=>{
    console.log(combinedColumnsData)
    axios.post(`${baseUrl}/admin/updateHostelAllotmentOpen`,{
      open:allotmentOpen==true?false:true//joining the array ['A:ColumnName1:Asc', 'B:ColumnName2:Asc']
    })
    .then(function (response) {
      console.log(response.data["hostel_allotment_open"])
      setAllotmentOpen(response.data["hostel_allotment_open"])
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  const postModification=()=>{
    console.log(combinedColumnsData)
    axios.post(`${baseUrl}/admin/updateRule`,{
      columnsData:combinedColumnsData,
      rankRuleData: updatedRule.join(',') //joining the array ['A:ColumnName1:Asc', 'B:ColumnName2:Asc']
    })
    .then(function (response) {
       console.log(response.data)
       alert("Success")

       getAllotmentColumns()
       getHostelRequirements()

    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }
  
  useEffect(() => {
    if(modal!=null)
      RenderModal()
  }, [selectedColumnIndex, modalType, newAttribute, newOrder, updatedRule, newEquation])

  const combineColsData=(existingCols, derivedCols) => {

    existingCols.forEach((item,index)=>{
      existingCols[index].columnLetter=String.fromCharCode(65+index)
    })

    derivedCols.forEach((item,index)=>{
      derivedCols[index].columnLetter=String.fromCharCode(existingCols.length+65+index) //derived cols start after existing cols
    })
    
    setUpdatedColumnsData([...existingCols])
    setUpdatedDerivedColumnsData([...derivedCols])
    
    setCombinedColumnsData([...existingCols,...derivedCols])

  }
  

  const backdropClickHandler = (event) => {
    if (event.target === event.currentTarget) {
        // setModal(<div/>)
        setModal(null)
        setSelectedColumnIndex(-1)
    }
  }
  const RenderModal=(item)=>{
    // Existing columns modal
    if(modalType===0)
    setModal(
          <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
              <div className='flex flex-col bg-white rounded-2xl w-5/12 h-1/2 pt-3 relative overflow-hidden'>

                  <div
                      // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                      className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                      onClick={()=>{
                          setModal(null)
                          setSelectedColumnIndex(-1)
                      }}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </div>
                  
                  <div className='text-stone-800 border-b border-solid border-stone-800 text-lg p-2 font-semibold w-full'>All Column Fields</div>

                  <div className='overflow-y-auto w-full'>
                    {hostelColsData.map((item, index)=>(
                      <div 
                        key={index} 
                        className={'text-stone-800 text-base font-medium w-full p-3'+(index==selectedColumnIndex?' bg-blue-300 ':' hover:bg-gray-300')}
                        onClick={()=>{
                          if(selectedColumnIndex!=index)
                            setSelectedColumnIndex(index)
                          else
                            selectedColumnIndex(-1)
                        }}
                      >
                        {/* Column names are in the form tablename.columnname */}
                        {item.split('.')[1]} 
                        {/* Only columnname is displayed */}
                      </div>
                    ))}
                  </div>

                  {/* Add button */}
                  <div className='flex p-2 justify-end'>
                    <button 
                      className='button-blue self-end'
                      onClick={()=>{
                        if(selectedColumnIndex!=-1)
                        {
                          //Each column stores the column name, the column letter(in excel sheet), and formula(blank for existing columns)
                          //combineColsData(existingCols, dervedCols)
                          combineColsData([...updatedColumnsData,
                            {
                              columnType:"existing",
                              columnName:hostelColsData[selectedColumnIndex],
                              columnLetter:"",
                              formula:""
                            }
                          ], updatedDerivedColumnsData) //combining existing columns and derived columns

                          setModal(null)
                        }
                      }}
                    >
                      Add column
                    </button>
                  </div>
              </div>
          </div>
      )

    //Derived columns modal
    else  if(modalType===1)
      setModal(
        <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
            <div className='flex flex-col bg-white rounded-2xl w-1/2 h-auto pt-3 relative overflow-hidden'>

                <div
                    // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                    className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                    onClick={()=>{
                        setModal(null)
                        setNewAttribute("")
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                
                <div className='text-stone-800 border-b border-solid border-stone-800 text-lg p-2 font-semibold w-full'>
                  Functions Available : SUM(), AVG(), COUNT(), MAX(), MIN()
                </div>

                <div className='w-fit text-stone-800 font-bold px-2 mt-2'>Columns :</div>
                <div className='text-stone-500 text-base px-2 font-semibold w-full flex flex-row flex-wrap'>
                  {/* All columns */}
                  {combinedColumnsData.map((col, index)=>(
                    // Existing columns will be stored in the form tablename.columnname
                    col.columnName.includes('.')?
                    <div className='mr-3'>{String.fromCharCode(65+index)} : {col.columnName.split('.')[1]}</div>
                    :
                    <div className='mr-3'>{String.fromCharCode(65+index)} : {col.columnName}</div>
                  ))}
                </div>

                <div className='flex flex-col mt-4 bg-white rounded-lg text-sm px-2'>
                    <div className='text-stone-800'>Coulmn Name</div>
                    <input 
                      placeholder='Search by name or by admission number'
                      className='p-2 w-80 outline-none ring-slate-200 ring-2 rounded-xl'
                      onChange={(e)=>{setNewAttribute(e.target.value)}}
                      value={newAttribute}
                    />

                    <div className='mt-2 text-stone-800'>Column Formula</div>
                    <input 
                      placeholder='Search by name or by admission number'
                      className='p-2 w-80 outline-none ring-slate-200 ring-2 rounded-xl'
                      onChange={(e)=>{setNewEquation(e.target.value)}}
                      value={newEquation}
                    />
                </div>

                {/* Add button */}
                <div className='flex p-2 self-end'>
                  <button 
                    className='button-blue self-end'
                    onClick={()=>{

                        //combineColsData(existingCols, dervedCols)
                        combineColsData(updatedColumnsData, [...updatedDerivedColumnsData,
                          {
                            columnType:"derived",
                            columnName:newAttribute,
                            columnLetter:"",
                            formula:newEquation,
                          }
                        ]) //combining existing columns and derived columns

                        setNewAttribute("")
                        setNewEquation("")
                        setModal(null)
                      }}
                  >
                    Add column
                  </button>
                </div>
            </div>
        </div>
      )

      //Rank rule modal
      else  if(modalType===2)
      setModal(
        <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
            <div className='flex flex-col bg-white rounded-2xl w-1/2 h-auto pt-3 relative overflow-hidden'>

                <div
                    // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                    className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                    onClick={()=>{
                        setModal(null)
                        setNewAttribute("")
                        setNewOrder("Asc")
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                
                <div className='text-stone-800 border-b border-solid border-stone-800 text-lg p-2 font-semibold w-full'>
                  Rank Rule - Add columns and order of sorting
                </div>

                <div className='flex flex-col text-stone-800 text-base p-2 font-semibold w-full'>

                  {/* updatedRule has the form : ['A:ColumnName1:Asc', 'B:ColumnName2:Asc'] */}
                  {updatedRule.length!=0&&updatedRule.map((item,index)=>
                    item.split(':')[1].includes('.')?
                    (
                      <div key={index}>{index+1} . {item.split(':')[1].split('.')[1]} - {item.split(':')[2]}</div>
                    ):
                    (
                      <div key={index}>{index+1} . {item.split(':')[1]} - {item.split(':')[2]}</div>
                    )
                  )}

                </div>
                <div className='flex flex-row w-full space-x-4 items-center ml-2'>
                  <div className='flex flex-col justify-start'>
                    <label className='mt-2 text-stone-800 font-semibold'>Column</label>
                    <select
                      className='p-2 w-72 outline-none ring-slate-200 ring-2 rounded-xl'
                      required={true}
                      onChange={e=>setNewAttribute(e.target.value)}
                      value={newAttribute}
                    >
                      <option value=""></option>
                      {combinedColumnsData.map((item,index)=>(
                        item.columnName.includes('.')?
                        <option value={index} key={index}>{item.columnName.split('.')[1]}</option>
                        :
                        <option value={index} key={index}>{item.columnName}</option>
                      ))}
                    </select>
                  </div>

                  <div className='flex flex-col'>
                    <label className='mt-2 text-stone-800 font-semibold'>Order By</label>
                    <select
                      className='p-2 w-24 outline-none ring-slate-200 ring-2 rounded-xl'
                      required={true}
                      onChange={e=>setNewOrder(e.target.value)}
                      value={newOrder}
                    >
                      <option value="Asc">Asc</option>
                      <option value="Desc">Desc</option>
                    </select>
                  </div>

                  <div 
                    className='rounded-lg p-2 bg-blue-500 self-end text-white text-base font-medium hover:bg-blue-700'
                    onClick={()=>{
                      setUpdatedRule([
                        ...updatedRule,
                        // eg : A:columnName:Asc 
                        combinedColumnsData[newAttribute].columnLetter+':'+combinedColumnsData[newAttribute].columnName+':'+newOrder
                      ])

                      console.log(updatedRule)
                    }}
                  >
                    Add
                  </div>
                </div>


                {/* Clear and Update buttons*/}
                <div className='flex p-2 w-full justify-between'>
                  {updatedRule.length>0&&(
                      <div 
                        className='button-blue'
                        onClick={()=>{
                          setUpdatedRule([])
                        }}
                      >
                        Clear All
                      </div>
                  )}

                  {updatedRule.length>0&&(
                    <button 
                      className='button-blue self-end'
                      onClick={()=>{
                        if(newAttribute!="")
                        {
                          setNewAttribute("")
                          setNewOrder("Asc")
                          setModal(null)
                        }
                      }}
                    >
                      Update
                    </button>
                  )}
                </div>
            </div>
        </div>
      )

  }

  const currentRule=()=>{
    return(
      <div className='w-full flex flex-col overflow-y-auto'>
        <div
          className='text-left w-11/12 text-stone-800 mt-3 text-lg font-bold mt-2 mb-1'
        >
          Existing Columns
        </div>

        <div className='flex flex-wrap w-full mt-5'>  

          {columnsData.map((item, index)=>(
            <div key={index} className='text-center mr-2 py-2 px-3 bg-stone-800 text-white text-sm font-medium rounded-full'>
              {item.columnLetter + ' : ' +item.columnName.split('.')[1]}
            </div>
          ))}
        </div>
        <hr className='w-full mt-7 self-center h-px bg-stone-800' />

        <div
          className='text-left w-11/12 text-stone-800 mt-3 text-lg font-bold mt-2 mb-1'
        >
          Derived Columns
        </div>

        <div className='flex flex-wrap w-full mt-5'>  
        {/* sfasfsdfsd */}
          {derivedColumnsData.map((item, index)=>(
            <div 
              key={index} 
              className='text-center mr-2 mt-2 py-2 px-3 bg-stone-800 text-white text-sm font-medium rounded-full relative cursor-pointer'
              onMouseEnter={()=>{setAltTextIndex(index)}} onMouseLeave={()=>{setAltTextIndex(-1)}}
            >
              {item.columnLetter + ' : ' + item.columnName}

              {altTextIndex==index&&(
                  <div className={'absolute left-0 text-white bg-stone-600 whitespace-nowrap rounded-full p-3 text-xs z-40 top-9 '}>formula : {item.formula}</div>
              )}
            </div>
          ))}
        </div>

        <hr className='w-full mt-7 self-center h-px bg-stone-800' />

        <div
          className='text-left w-11/12 text-stone-800 mt-3 text-lg font-bold mt-2 mb-1'
        >
          Rank Rule
        </div>
        
        <div className='mt-5 text-stone-800 font-semibold text-base flex flex-row flex-wrap space-x-2'>
          {rankRule.length!=0&&rankRule.map((item, index)=>
            item.split(':')[1].includes('.')?
            (
              <div key={index}>{item.split(':')[1].split('.')[1]} {item.split(':')[2]} ,</div>
            ):
            (
              <div key={index}>{item.split(':')[1]} {item.split(':')[2]} ,</div>
            )
          )}
        </div>
        
      </div>
    )
  }

  const updateRule=()=>{
    return(
      <div className='w-full flex flex-col overflow-y-auto'>
        <div
          className='text-left w-11/12 text-stone-800 mt-3 text-lg font-bold mt-2 mb-1'
        >
          Existing Column
        </div>

        <div className='flex flex-wrap w-full mt-5'>  
          {updatedColumnsData.map((item, index)=>(
            <div key={index} className='flex flex-row justify-between items-center mr-2 py-2 px-3 bg-stone-800 text-white text-sm font-medium rounded-full'>
              <div>{item.columnName.split('.')[1]}</div>
              {/* remove button */}
              <div
                  className='ml-2 text-white cursor-pointer rounded-full hover:text-red-600'
                  onClick={()=>{
                      var newUpdatedColumnsData=[...updatedColumnsData]
                      newUpdatedColumnsData.splice(index,1)
                      // setUpdatedColumnsData(newUpdatedColumnsData)
                      
                      combineColsData(newUpdatedColumnsData,updatedDerivedColumnsData) //combining existing columns and derived columns
                  }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
              </div>
            </div>
          ))}
          <button 
            className='button-blue'
            onClick={()=>{
              setModalType(0)
              RenderModal()
            }}
          >
            Add Column
          </button>
        </div>
        <hr className='w-full mt-7 self-center h-px bg-stone-800' />

        <div
          className='text-left w-11/12 text-stone-800 mt-3 text-lg font-bold mt-2 mb-1'
        >
          Derived Column
        </div>

        <div className='flex flex-wrap w-full mt-5'>  
          {updatedDerivedColumnsData.map((item, index)=>(
            <div key={index} className='flex flex-row justify-between items-center mr-2 py-2 px-3 bg-stone-800 text-white text-sm font-medium rounded-full'>
              <div>{item.columnName}</div>
              {/* remove button */}
              <div
                  className='ml-2 text-white cursor-pointer rounded-full hover:text-red-600'
                  onClick={()=>{
                      var newDerivedColumnsData=[...updatedDerivedColumnsData]
                      newDerivedColumnsData.splice(index,1)
                      // setUpdatedDerivedColumnsData(newDerivedColumnsData)

                      combineColsData(updatedColumnsData,newDerivedColumnsData) //combining existing columns and derived columns
                  }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
              </div>
            </div>
          ))}

          <button 
            className='button-blue'
            onClick={()=>{
              setModalType(1)
              RenderModal()
            }}
          >
            Add Derived Column
          </button>
        </div>

        <hr className='w-full mt-7 self-center h-px bg-stone-800' />

        <div
          className='text-left w-11/12 text-stone-800 mt-3 text-lg font-bold mt-2 mb-1'
        >
          Rank Rule
        </div>
        
          
        <div className='flex flex-col w-fit'>
          <div className='text-stone-800 font-semibold text-base flex flex-row flex-wrap space-x-2'>
            <div className=''>Current Rule : </div>
            {rankRule.length!=0&&rankRule.map((item, index)=>
            item.split(':')[1].includes('.')? //existing column will be stored in the form tablename.columnname
            (
              <div key={index}>{item.split(':')[1].split('.')[1]} {item.split(':')[2]} ,</div>
            ):
            (
              <div key={index}>{item.split(':')[1]} {item.split(':')[2]} ,</div>
            )
            )}
          </div>

          <div className='text-stone-800 font-semibold text-base flex flex-row flex-wrap space-x-2'>
            <div className=''>New Rule : </div>
            {updatedRule.length!=0&&updatedRule.map((item, index)=>
            item.split(':')[1].includes('.')? //existing column will be stored in the form tablename.columnname
            (
              <div key={index}>{item.split(':')[1].split('.')[1]} {item.split(':')[2]} ,</div>
            ):
            (
              <div key={index}>{item.split(':')[1]} {item.split(':')[2]} ,</div>
            )
            )}
          </div>
        </div>
        
        <div 
          className='button-blue mt-3'
          onClick={()=>{
            setModalType(2)
            RenderModal()
          }}
        >
          Update Rule
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full items-center min-h-screen text-stone-800'>

      {/* modal for selecting column */}
      {modal&&modal}

      <div className='flex flex-row justify-between w-11/12 pt-4 items-center'>
        <div className='text-xl font-bold'>Allotment Rule</div>
        <div className='flex flex-row space-x-4 items-center'>
            <div className='bg-white border rounded-full w-10 aspect-square'/>
            <div>user Name</div>
        </div>
      </div>

      <div className='flex flex-col items-center py-8 space-y-4 w-11/12 mt-8 admin-dashbord-height bg-white rounded-xl relative'>
        <div className='flex flex-col w-11/12  overflow-hidden '>
          {/* white box nav bar */}
          <div className='flex flex-row tex-black text-sm font-bold relative'>
              {tabs.map((item, index)=>(
                <div
                  key={index}
                  className='mr-5 cursor-pointer'
                  onClick={()=>{
                    setTabSelected(index)
                  }}
                >
                    <div>{item}</div>
                    <div className={tabSelected==index?'h-1 self-center w-full bg-stone-800 rounded-full':''}/>
                </div>
              ))}
          </div>

          <hr className='w-full mt-2 self-center h-px bg-stone-800' />
          {/* navbar ends */}

          {tabSelected==0&&currentRule()}
          {tabSelected==1&&updateRule()}


        </div>

        {tabSelected==0&&(<div className="w-11/12 flex sticky bottom-0">
          <button 
            className='button-blue self-start'
            onClick={updateHostelAllotmentOpen}
          >{
            allotmentOpen?"Close Application":"Open Application"
          }</button>
        </div>)}

          
      </div>

      {tabSelected==1&&(<div className='w-11/12 flex mt-2 justify-end'>
        <div 
          className='button-blue'
          onClick={postModification}
        >
          Update Modifications
        </div>
      </div>)}
    </div>
  )
}

export default AllotmentRule