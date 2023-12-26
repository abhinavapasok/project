import React, { useContext, useEffect, useState } from 'react'
import {motion} from "framer-motion" 
import axios from 'axios'
import { ListItemSecondaryAction } from '@mui/material'
import { UserContext } from '../../Contexts/UserContext'
import { baseUrl } from '../../baseUrl'
function CreateApplications() {

  const currentApplications=[
  {
      // All spaces in the appplication name and field names are replaced with underscore (_)
      applicationName :"application_name_1",
      //All fields are stored in the database in the form of json string
      //field name is used as field key
      fields:`{
        "field1": {
                      "tag": "input",
                      "label":"Field 1",
                      "name":"field1",
                      "type":"text"
                    },
        "field2": {
                      "tag": "textarea",
                      "label":"Field 2",
                      "name":"field2",
                      "type": "text"
                    },
        "field3": {
                      "tag": "input",
                      "label":"Field 3",
                      "name":"field3",
                      "type":"text"
                    },
        "field4": {
                      "tag": "input",
                      "label":"Field 4",
                      "name":"field4",
                      "type":"text"
                    },
        "field5": {
                      "tag": "input",
                      "label":"Field 5",
                      "name":"field5",
                      "type":"text"
                    },
        "field6": {
                      "tag": "input",
                      "label":"Field 6",
                      "name":"field6",
                      "type":"text"
                    },
        "field7": {
                      "tag": "input",
                      "label":"Field 7",
                      "name":"field7",
                      "type":"text"
                    }
      }`
    },
    {
      // All spaces in the appplication name and field names are replaced with underscore (_)
      applicationName :"application_name_2",
      //All fields are stored in the database in the form of json string
      fields:`{
        "field1": {
                      "tag": "input",
                      "label":"Field 1",
                      "name":"field1",
                      "type":"text"
                    },
        "field2": {
                      "tag": "input",
                      "label":"Field 2",
                      "name":"field2",
                      "type":"text"
                    },
        "field3": {
                      "tag": "input",
                      "label":"Field 3",
                      "name":"field3",
                      "type":"text"
                    },
        "field4": {
                      "tag": "input",
                      "label":"Field 4",
                      "name":"field4",
                      "type":"text"
                    },
        "field5": {
                      "tag": "input",
                      "label":"Field 5",
                      "name":"field5",
                      "type":"text"
                    },
        "field6": {
                      "tag": "input",
                      "label":"Field 6",
                      "name":"field6",
                      "type":"text"
                    },
        "field7": {
                      "tag": "input",
                      "label":"Field 7",
                      "name":"field7",
                      "type":"text"
                    }
      }`
    }
  ]
  
  const tabs=["Edit Application", "Create Application"]

  // const [currentApplicationsData, setCurrentApplicationsData] = useState([...currentApplications])
  const [currentApplicationsData, setCurrentApplicationsData] = useState([])
  const [applicationSelectedIndex, setApplicationSelectedIndex] = useState(-1)
  const [createdApplicationIndex, setCreatedApplicationIndex] = useState(-1)

  //modal fields
  const [newLabel, setNewLabel] = useState("")
  const [newName, setNewName] = useState("")
  const [newType, setNewType] = useState("text")
  const [radioFields, setRadioFields] = useState([])
  const [radioItem, setRadioItem] = useState("")
  const [newTag, setNewTag] = useState("input")

  const [applicationNameInput, setApplicationNameInput] = useState("")
  const [newApplicationName, setNewApplicationName] = useState("")

  const [tabSelected, setTabSelected] = useState(0) //selected tab index
  const [modal, setModal] = useState(null) //modal showing columns

  const [modalType, setModalType] = useState(-1) //0 for existing attribute modal 1 for derived attribute modal

  //for certificate template text editing
  const [certificateTemplateText, setCertificateTemplateText] = useState("")
  const [tablesReturned, setTablesReturned] = useState([])
  const [columnsReturned, setColumnsReturned] = useState([])

  const backdropClickHandler = (event) => {
    if (event.target === event.currentTarget) {
        // setModal(<div/>)
        setModal(null)
        setModalType(-1)
    }
  }

  const getAndSetCertificates=()=>{
    axios.get(`${baseUrl}/admin/getCertificates`)
    .then(function (response) {
        var tempData=[]
        console.log(response.data)
        response.data.forEach((item)=>{
          tempData.push({
            certificateId: item.certificate_id,
            applicationName: item.name,
            fields: item.application_template
          })
        })

        setCurrentApplicationsData([...tempData])
    })
    .catch(function (error) {
        console.log("FAILED!!! ",error);
    });
  }

  useEffect(() => {
    getAndSetCertificates()
  }, [])
  

  useEffect(() => {
    if(modal!=null)
      RenderModal()
  }, [newLabel, newName, newType, radioItem, radioFields, modalType, certificateTemplateText])
  

  const {setLoading} =useContext(UserContext)


  const getAndSetTablesCols=()=>{
    const applicationIndex=tabSelected==0?applicationSelectedIndex:createdApplicationIndex

    setLoading(true)
    axios.get(`${baseUrl}/admin/getTableAndCols`,{
        params:{
          certificateId: currentApplicationsData[applicationIndex].certificateId
        }
      })
      .then(function (response) {

          setCertificateTemplateText(response.data["templateText"])
          setTablesReturned(response.data["tables"])
          setColumnsReturned(response.data["columnsData"])

          console.log("calling render modal modaltype : ",modalType)
          setModalType(1)  //rendering modal for certificate template
          
          setLoading(false)
          console.log("response is : ",response.data)
      })
      .catch(function (error) {
          setLoading(false)
          console.log("FAILED!!! ",error);
      });
  }

  useEffect(() => {
    if(modalType!=-1)
      RenderModal() //when directly called there was bug (modal was rendering on alternative clicks)
                            //RenderModal() is called inside getAndSetTablesCols() after the data is fetched
  }, [modalType])
  
  const RenderModal=()=>{

    console.log("RenderModal called modaltype is", modalType)
    if(modalType===0)//add  new field
    {
      //created application index if we are in 'create application' tab
      //application selected index if we are in 'edit application' tab 
      const applicationIndex=tabSelected==0?applicationSelectedIndex:createdApplicationIndex

      setModal(
            <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
                <div className='flex flex-col bg-white rounded-2xl w-5/12 h-auto pt-3 relative overflow-hidden'>

                    <div
                        // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                        className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                        onClick={()=>{
                            setModal(null)
                            // setSelectedColumnIndex(-1)
                            setModalType(-1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    
                    <div className='text-stone-800 border-b border-solid border-stone-800 text-lg p-2 font-semibold w-full'>
                    Enter Field Details
                    </div>

                    <form className='flex flex-col h-full justify-center mt-2 bg-white rounded-lg text-sm px-2'>
                        <label className='text-stone-800 font-semibold'>Field Label</label>
                        <input 
                        className='p-2 w-80 outline-none ring-slate-200 ring-2 rounded-xl'
                        required={true}
                        onChange={e=>setNewLabel(e.target.value)}
                        value={newLabel}
                        />

                        {/* <label className='mt-2 text-stone-800 font-semibold'>Field Name (small letters with no space)</label>
                        <input 
                        className='p-2 w-80 outline-none ring-slate-200 ring-2 rounded-xl'
                        required={true}
                        onChange={e=>setNewName(e.target.value)}
                        value={newName}
                        /> */}

                        <label className='mt-2 text-stone-800 font-semibold'>Field Type</label>
                        <select
                        className='p-2 w-80 outline-none ring-slate-200 ring-2 rounded-xl'
                        required={true}
                        onChange={e=>{
                          if(e.target.value=="textarea")
                          {
                            setNewTag(e.target.value)
                            setNewType(null)
                          }
                          else
                          {
                            setNewTag("input")
                            setNewType(e.target.value)
                          }
                        }}
                        value={newType}
                        >
                        <option value="text">text</option>
                        <option value="email">email</option>
                        <option value="date">date</option>
                        <option value="number">number</option>
                        <option value="radio">radio</option>
                        <option value="textarea">textarea</option>
                        </select>

                        {newType=="radio"&&(<hr className='h-px mt-2 bg-stone-800 w-full'/>)}
                        {newType=="radio"&&(
                        <div className='flex flex-col w-full mt-4'>
                            <div className='flex flex-wrap items-center space-x-4'>
                            <div className='text-stone-800 font-semibold'>Radio Items : </div>
                            {radioFields.map((item, index)=>(
                                <div 
                                key={index} 
                                className='p-3 text-white font-bold bg-blue-500 rounded-full relative'
                                >
                                    {item}

                                    {/* Delete button for radio items in modal*/}
                                    <div
                                        className='absolute -top-2 -right-2 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                                        onClick={()=>{
                                            var newRadioFields=[...radioFields]
                                            newRadioFields.splice(index,1)
                                            setRadioFields(newRadioFields)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                            </div>
                            <div className='mt-2 text-stone-800 font-semibold'>Add Radio Item</div>
                            <div className='flex flex-row space-x-4'>
                            <input 
                                className='p-2 w-80 outline-none ring-slate-200 ring-2 rounded-xl'
                                onChange={e=>{
                                setRadioItem(e.target.value)
                                }}
                                value={radioItem}
                            />

                            <div 
                                className='rounded-xl bg-stone-800 hover:bg-stone-600 px-3 py-2 text-white font-bold text-xl'
                                onClick={()=>{
                                setRadioFields([...radioFields,radioItem])
                                setRadioItem("")
                                }}
                            >
                                +
                            </div>
                            </div>
                        </div>
                    )}
                        
                    {/* Add button */}
                    <div className='flex p-2 justify-end'>
                        <input
                        type="submit"
                        value="Add Field"
                        className='button-blue self-end'
                        onClick={(e)=>{
                            e.preventDefault()
                            if(newLabel!=""&&newType!="")
                            {
                                const fields=JSON.parse(currentApplicationsData[applicationIndex].fields)
                                var fieldsArray=[]
                                
                                for(var fieldKey in fields)
                                {
                                  fieldsArray.push({
                                      "fieldName":fieldKey,
                                      ...fields[fieldKey]
                                  })
                                }

                                var newFieldItem={
                                  "fieldName":newLabel.split(' ').join('').toLocaleLowerCase(),
                                  "tag": newTag,
                                  "label": newLabel,
                                  "name": newLabel.split(' ').join('').toLocaleLowerCase(),
                                  "type": newType
                                }

                                if(newType==="radio")
                                {
                                  newFieldItem["radioFields"]={}
                                  radioFields.filter((item, index)=>{
                                      newFieldItem["radioFields"][index]=item // {0: radioItem1, 1: radionItem2 ...}
                                  })
                                }

                                fieldsArray.push(newFieldItem)

                                var updatedFields={}
                                fieldsArray.filter(item=>{
                                  updatedFields[item["fieldName"]]={...item}
                                })
                                

                                console.log("current appliction is : ", currentApplicationsData[applicationIndex])
                                axios.post('http://localhost:8080/admin/updateApplication',{
                                  certificateTemplate: JSON.stringify(updatedFields),
                                  certificateId: currentApplicationsData[applicationIndex].certificateId,
                                })
                                .then(function (response) {

                                    var newApplicationsData=[...currentApplicationsData]

                                    //creating new applications list with updated fields in the application just created
                                    newApplicationsData[applicationIndex]['fields']=JSON.stringify(updatedFields)
                                
                                    setCurrentApplicationsData([...newApplicationsData])
                                    setModal(null)

                                    setNewLabel("")
                                    setNewName("")
                                    setNewType("text")
                                    setRadioItem("")
                                    setRadioFields([])
                                    
                                })
                                .catch(function (error) {
                                    console.log("FAILED!!! ",error);
                                });
                                
                            }
                            }
                        }
                        />
                    </div>
                    </form>

                </div>
            </div>
        )
    }
    else if(modalType===1) //certificate template
    {
      //created application index if we are in 'create application' tab
      //application selected index if we are in 'edit application' tab 
      const applicationIndex=tabSelected==0?applicationSelectedIndex:createdApplicationIndex

      console.log("im called")
      setModal(
            <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
                <div className='flex flex-col bg-white rounded-2xl w-9/12 h-auto  pt-3 relative overflow-hidden'>

                  <div
                      // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                      className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                      onClick={()=>{
                          setModal(null)
                          // setSelectedColumnIndex(-1)
                          setModalType(-1)
                      }}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </div>
                  
                  <div className='text-stone-800 border-b border-solid border-stone-800 text-lg p-2 font-semibold w-full'>
                    Certificate Template
                  </div>

                  <div className='mt-3 flex flex-col items-start space-y-4 px-2 w-full'>
                    <div className='text-stone-800 text-base font-semibold w-full'>
                      Title : {currentApplicationsData[applicationIndex].applicationName}
                    </div>

                    <div className='flex flex-wrap space-x-2 w-full'>
                      {tablesReturned.map((tableName, index)=>(
                        <div className='flex flex-col space-y-2'>
                          <div className='text-stone-800 text-sm font-bold'>{tableName.split('_').join(' ')}</div>

                          <select 
                            key={index} 
                            onChange={e=>{
                              setCertificateTemplateText(t=>t+"<<"+e.target.value+">>")
                              document.getElementById("certificateTemplateTextArea").focus()
                            }} //<<tablename.columnname>> is added to certificate template text
                            className=' p-2 outline-none rounded-xl text-black'
                          >
                            <option value="">-- select --</option>
                            {columnsReturned.map((column,cIndex)=>{
                              if(column.split('.')[0]!="json"&&column.split('.')[0]==tableName)
                                return <option className='text-black' key={cIndex} value={column}>{column.split('.')[column.split('.').length-1]}</option>
                              else if(column.split('.')[0]=="json"&&column.split('.')[1]==tableName)
                                return <option key={cIndex} value={column}>{column.split('.')[column.split('.').length-1]}</option>
                            })}
                          </select>
                        </div>
                      ))}

                    </div>
                  </div>

                  <textarea 
                    id="certificateTemplateTextArea"
                    className='p-3 mx-3 mt-3 mb-3 h-48 rounded-xl ring-2 ring-slate-200 focus:outline-none' 
                    value={certificateTemplateText}
                    onChange={e=>{setCertificateTemplateText(e.target.value)}}
                  />

                  <div className='flex flex-row justify-end px-2 py-2'>
                    <div 
                      className='button-blue'
                      onClick={()=>{
                          axios.post('http://localhost:8080/admin/updateCertificateTemplateText',{
                            templateText:certificateTemplateText,
                            certificateId: currentApplicationsData[applicationIndex].certificateId,
                          })
                          .then(function (response) {
                            setModal(null)
                            setModalType(-1)
                          })
                          .catch(function (error) {
                              console.log("FAILED!!! ",error);
                          });
                      }}
                    >
                      Update
                    </div>
                  </div>

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

  const renderFields=()=>{
    const applicationIndex=tabSelected==0?applicationSelectedIndex:createdApplicationIndex

    const fields=JSON.parse(currentApplicationsData[applicationIndex].fields)

    const render=[]
    var index=0
    for(var fieldKey in fields)
    {
      var radioFields=[]
      if(fields[fieldKey].type==="radio")
      {
        //pushing radio items to  radioFields array to render
        for(var index in fields[fieldKey]["radioFields"])
        {
          radioFields.push(fields[fieldKey]["radioFields"][index])
        }

      }

      render.push(fields[fieldKey].type==="radio"?
      (
        <div className='w-full space-x-4 py-2 flex flex-row items-center '>
          <label className='font-bold text-stone-800'>{fields[fieldKey].label}</label>
          {radioFields.map((item, key)=>(
            <div key={key} className='flex space-x-2 flex-row items-center'>
              <input 
                type="radio" 
                name={fields[fieldKey].name} 
                value={item} 
                className=""
              />
              <label >{item}</label>
            </div>
          ))}

          <button
              className='cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
              value={fieldKey}
              onClick={()=>{
                var key=document.activeElement.value
                if(window.confirm("Delete the field "+fields[key].label+"?")===true)
                {

                  //deleting the field temporarily
                  delete fields[key]  

                  //updating the database
                  axios.post('http://localhost:8080/admin/updateApplication',{
                    certificateTemplate: JSON.stringify(fields),
                    certificateId: currentApplicationsData[applicationIndex].certificateId,
                  })
                  .then(function (response) {
                      var newApplicationsData=[...currentApplicationsData]
                      newApplicationsData[applicationIndex].fields=JSON.stringify(fields)
                  
                      setCurrentApplicationsData(newApplicationsData)
                  })
                  .catch(function (error) {
                      console.log("FAILED!!! ",error);
                  });
                
                }
              }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )
      :
      (<div className='w-full space-y-2 py-2 flex flex-col'>
        <label className='font-bold text-stone-800'>{fields[fieldKey].label}</label>
        <div className='flex flex-row space-x-2 items-center'>
          {fields[fieldKey].tag=="input"&&(
            <input 
              className='w-full py-2 px-3 rounded-xl ring-2 ring-slate-200 focus:outline-none' 
              name={fields[fieldKey].name} 
              type={fields[fieldKey].type}
            />)
          }

          {fields[fieldKey].tag=="textarea"&&(
            <textarea 
              className='w-full py-2 px-3 rounded-xl ring-2 ring-slate-200 focus:outline-none' 
              name={fields[fieldKey].name} 
              // type={fields[fieldKey].type}
            />)
          }


          {/* Field delete buttom */}
          <button
              className='cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
              value={fieldKey}
              onClick={()=>{
                var key=document.activeElement.value
                if(window.confirm("Delete the field "+fields[key].label+"?")===true)
                {
                  //deleting the field temporarily
                  delete fields[key]  

                  //updating the database
                  axios.post('http://localhost:8080/admin/updateApplication',{
                    certificateTemplate: JSON.stringify(fields),
                    certificateId: currentApplicationsData[applicationIndex].certificateId,
                  })
                  .then(function (response) {
                      var newApplicationsData=[...currentApplicationsData]
                      newApplicationsData[applicationIndex].fields=JSON.stringify(fields)
                  
                      setCurrentApplicationsData(newApplicationsData)
                  })
                  .catch(function (error) {
                      console.log("FAILED!!! ",error);
                  });
                
                }
              }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>))

      index+=1
    }

    return (<div className='w-full overflow-y-auto flex flex-col px-3'>
      {render.map(inputDiv=>inputDiv)}
    </div>)
  }


  const editApplication=()=>{
    return(
      <div className='w-full h-full flex flex-row text-sm overflow-hidden'>
          {/* <div className='w-1/2 flex flex-col overflow-hidden'>
            <div className='w-full overflow-y-auto'> */}
            <div className='overflow-y-scroll w-1/2'>
              <table className='w-full table-auto'>
                  <tr className='bg-primary text-left sticky top-0'>
                    <th className='py-3'>Application Name</th>
                    <th>Application Preview</th>
                  </tr>
                    {currentApplicationsData.map((item, index)=>(
                      <tr 
                        className='border-b border-slate-200 border-solid'
                      >
                        <td className='py-3'>{capitalizeString(item.applicationName,'_')}</td>
                        <td className='py-2'>
                          <div 
                            className='flex flex-row space-x-1 cursor-pointer items-center w-fit p-3 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-xl'
                            onClick={()=>{
                              setApplicationSelectedIndex(index)
                            }}
                          >
                            <div>Preview</div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
              </table>
            </div>
            {/* </div>
          </div> */}

          {/* Application Preview */}
          <div className='flex flex-col min-h-full bg-slate-100 w-1/2'>
            {applicationSelectedIndex>=0?(
            <div className='w-full h-full flex flex-col overflow-hidden'>
              <div className='w-full flex flex-row justify-between items-center px-3 text-center py-3 bg-slate-200 text-stone-800 font-bold'>

                <div 
                  className='button-blue'
                  onClick={()=>{
                    getAndSetTablesCols()
                  }}
                >
                  Certificate template
                </div>
                <div className='flex flex-row space-x-2 items-center'>
                  <div 
                    className='p-3 w-fit font-bold text-white rounded-xl bg-stone-800 cursor-pointer hover:bg-stone-600'
                    onClick={()=>{
                      setModalType(0)
                    }}
                    >+ Add a new field
                  </div>

                  {/* Delete Application */}
                  <div 
                    className='button-red p-3'

                    onClick={()=>{
                      axios.get('http://localhost:8080/admin/deleteApplication',{
                        params:{
                          certificateId: currentApplicationsData[applicationSelectedIndex].certificateId
                        }
                      })
                      .then(function (response) {
                        setApplicationSelectedIndex(-1)
                        getAndSetCertificates()
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
                </div>
              </div>
              
              <div className='w-full p-3 sticky top-0 text-stone-800 font-bold text-center'>{capitalizeString(currentApplicationsData[applicationSelectedIndex].applicationName,'_')}</div>
              {applicationSelectedIndex!=-1&&renderFields()}
            </div>
            ):(
              <div className='w-full h-full flex flex-col'>
                <div className='w-full text-center py-3 bg-slate-200 text-stone-800 font-bold'>
                  Preview
                </div>
                <div className='h-full flex flex-col items-center justify-center w-full'>
                  <div>Select an application for preview</div>
                </div>
              </div>
            )}
          </div>
        </div>
    )
  }

  const createApplication=()=>{
    return(
      <div className='w-full h-full flex flex-row text-sm overflow-hidden'>
          <div className='flex flex-col min-h-full bg-slate-100 w-full'>
            <div className='w-full h-full flex flex-col overflow-hidden'>
              <div className='w-full flex flex-row justify-between items-end px-3 text-center py-3 bg-slate-200 text-stone-800 font-bold'>
                {/* {capitalizeString(currentApplicationsData[applicationSelectedIndex].applicationName,'_')} */}
                <div className='flex flex-col items-start space-y-2'>
                  <label className='font-bold text-stone-800 text-sm'>Enter the name of application</label>
                  <div className='flex flex-row space-x-4'>
                    <input 
                      type="text" 
                      className='w-full py-2 px-3 rounded-xl ring-2 ring-slate-200 focus:outline-none' 
                      value={applicationNameInput}
                      onChange={e=>{
                        setApplicationNameInput(e.target.value)
                      }}
                    />

                    <div 
                      className='text-white font-bold bg-green-500 hover:bg-green-600 text-sm p-3 rounded-xl'
                      onClick={()=>{
                        if(applicationNameInput!="")
                        {
                          //new application name is set only after create button is clicked
                          setNewApplicationName(applicationNameInput)
                          axios.post('http://localhost:8080/admin/createApplication',{
                            certificateName: applicationNameInput,
                            certificateTemplate: `{}`
                          })
                          .then(function (response) {
                            var newApplications=[...currentApplicationsData]
                            console.log(response.data)

                            newApplications.push({
                              certificateId: response.data[0].certificate_id,
                              applicationName:applicationNameInput,
                              fields:`{}`
                            })
                            
                            setCurrentApplicationsData([...newApplications])
                            setCreatedApplicationIndex(newApplications.length-1)
                          })
                          .catch(function (error) {
                              console.log("FAILED!!! ",error);
                          });
                        }
                      }}
                    >
                        Create
                    </div>

                    <div 
                      className='text-white font-bold bg-blue-500 hover:bg-blue-600 text-sm p-3 rounded-xl'
                      onClick={()=>{
                        setCreatedApplicationIndex(-1)
                        setApplicationNameInput("")
                      }}
                    >
                      Clear
                    </div>
                  </div>
                </div>

                <div className='flex flex-row space-x-2'>
                  {createdApplicationIndex!=-1&&(
                    <div 
                      className='button-blue'
                      onClick={()=>{
                        getAndSetTablesCols()
                      }}
                    >
                        Certificate template
                    </div>
                  )}

                  <div 
                    className='p-3 w-fit font-bold text-white rounded-xl bg-stone-800 cursor-pointer hover:bg-stone-600'
                    onClick={()=>{
                      setModalType(0)
                    }}
                    >+ Add a new field
                  </div>
                </div>
              </div>
              
              {createdApplicationIndex!=-1&&
                (
                <div className='flex flex-row w-full  justify-center relative my-4 items-center'>
                  <div className='text-stone-800 text-xl font-bold text-base text-center'>{newApplicationName}</div>
                  

                  {/* Delete this application */}
                  <div className='absolute right-2 w-fit'>
                    <div 
                      className='text-white font-bold bg-red-500 hover:bg-red-700 text-sm p-3 rounded-xl'
                      onClick={()=>{

                        axios.get('http://localhost:8080/admin/deleteApplication',{
                          params:{
                            certificateId: currentApplicationsData[createdApplicationIndex].certificateId
                          }
                        })
                        .then(function (response) {

                          //removing the application from state
                          var newApplications=[...currentApplicationsData]
                        
                          if(applicationSelectedIndex==newApplications.length)
                            setApplicationSelectedIndex(-1)

                          newApplications.pop()
                          setCreatedApplicationIndex(-1)
                          setCurrentApplicationsData([...newApplications])
                        })
                        .catch(function (error) {
                            console.log("FAILED!!! ",error);
                        });

                      }}
                    >
                        Delete this application
                    </div>
                  </div>
                </div>
                )
              }
              {createdApplicationIndex!=-1&&renderFields()}
            </div>
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
          <div className='text-xl font-bold'>Hostel Application Fields</div>
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

          {tabSelected==0&&editApplication()}
          {tabSelected==1&&createApplication()}
          {/* {tabSelected==1&&updateRule()} */}

        </div>

          
      </div>
    </div>
  )
}

export default CreateApplications