import React, { useEffect, useState } from 'react'
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import Draggable from 'react-draggable';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
function AdminPaths() {

    // S: Students
    // IN: Inmates
    // NIN: Non-Inmates
    // SA: Staff Advisor
    // HOD: HOD
    // WD: Warden
    const dummyPathData=[
        {
            start:"S",
            path:"SA-HOD-WD",
            certificates:"1,2,3,4"
        },
        {
            start:"S",
            path:"SA-HOD-WD",
            certificates:"1,2,3,4"
        },
        {
            start:"S",
            path:"SA-HOD-WD",
            certificates:"1,2,3,4"
        }
    ]

    const [pathData, setPathData] = useState([])

    const [certificates, setCertificates] = useState([])
    const [selectedcertificateIndex, setSelectedCertificateIndex] = useState(-1)
    const [path, setPath] = useState([])
    const [newPathItem, setNewPathItem] = useState("SA")
    const [newStartItem, setNewStartItem] = useState("S")

    const [modal, setModal] = useState(null)

    const [altTextIndex, setAltTextIndex] = useState(-1)

    const updateXarrow = useXarrow();
    // useEffect(() => {
    //     const script = document.createElement("script");

    //     script.src = "../../leader-line.min";
    //     // script.async = true;
    
    //     document.body.appendChild(script);
    // }, [])

    useEffect(() => {
        // To set pathsData
        axios.get(`${baseUrl}/admin/getPathsData`)
        .then(function (response) {
            console.log("hostel data is set", response.data)
            setPathData(response.data)
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
        });

        // To set Certificates
        axios.get(`${baseUrl}/admin/getCertificates`)
        .then(function (response) {
            setCertificates([...response.data.map(item=>(
                {
                    name: item.name,
                    certificateId: item.certificate_id
                }
            ))])
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
        });
    }, [])

    const postPath=()=>{
        axios.post(`${baseUrl}/admin/postPath`,{
            path: path.join("-"),
            start: newStartItem
        })
        .then(function (response) {

            setPathData([...pathData,{
                start:newStartItem,
                path:path.join("-"),
                certificates:"",
            }])

            setModal(null)
            setNewPathItem("SA")
            setNewStartItem("S")
            setPath([])
            
        })
        .catch(function (error) {
            console.log("FAILED!!! ",error);
        });
    }
    
    const backdropClickHandler = (event) => {
        if (event.target === event.currentTarget) {
            // setModal(<div/>)
            setModal(null)
            setPath([])
        }
    }

    const RenderModal=(item)=>{
        // 
        setModal(
            <div onClick={backdropClickHandler} className="bg-slate-500/[.8] z-20 fixed inset-0 flex justify-center items-center">
                <div className='flex flex-col justify-center items-center bg-white rounded-2xl w-7/12 h-auto py-3 relative'>

                    <div
                        // className='absolute top-1 right-1 flex justify-center items-center bg-red-500 aspect-square w-7 h-7 cursor-pointer text-center text-xs font-bold text-white rounded-full hover:bg-red-700'
                        className='absolute top-1 right-1 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                        onClick={()=>{
                            setModal(null)
                            setPath([])
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <div className='mb-1 flex flex-col space-y-2 w-full px-3'>
                        <div className='text-stone-800 font-bold text-md'>Start from</div>
                        <div  className='flex flex-row space-x-8 items-center'>    
                            <select 
                                className=' p-2 outline-none rounded-xl'
                                onChange={(e)=>{setNewStartItem(e.target.value)}}
                            >
                                <option value="S">Student</option>
                                <option value="IN">Inmate</option>
                                <option value="NIN">Non Inmate</option>
                            </select>
                        </div>

                        <div className='text-stone-800 font-bold text-md'>Select a role</div>
                        <div className='w-full flex flex-row justify-between'>
                            <div  className='flex flex-row space-x-8 items-center'>    
                                <select 
                                    className=' p-2 outline-none rounded-xl'
                                    onChange={(e)=>{setNewPathItem(e.target.value)}}
                                >
                                    <option value="SA">Staff Advisor</option>
                                    <option value="HOD">HOD</option>
                                    <option value="WD">Warden</option>
                                    <option value="AA">Administrative Assistant</option>
                                </select>

                                <div
                                    className='bg-blue-500 aspect-square w-8 h-8 cursor-pointer text-center text-lg font-bold text-white rounded-full hover:bg-blue-600'
                                    onClick={()=>{setPath(path=>[...path,newPathItem])}}
                                >
                                    +
                                </div>
                            </div>

                            <div
                                className='bg-blue-500 p-2 text-md font-bold text-white rounded-xl cursor-pointer hover:bg-blue-700'
                                onClick={()=>{
                                    postPath()
                                }}
                            >
                                Add Path
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex items-center justify-center'>
                        <div className='grid grid-cols-8 gap-8 mt-4'>
                            <Xwrapper>
                                {/* <Draggable onDrag={updateXarrow} onStop={updateXarrow}> */}
                                    <div onScroll={updateXarrow} id={"arrowItem0"} className='rounded-full aspect-square w-16 bg-primary text-center flex justify-center items-center'>
                                        <div>{newStartItem}</div>
                                    </div>
                                {/* </Draggable> */}

                                {path.map((item, index)=>{
                                    console.log("arrow"+(index+1))
                                    if(item!="")
                                        return(
                                            // <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
                                                <div onScroll={updateXarrow} id={"arrowItem"+(index+1)} className='rounded-full aspect-square w-16 bg-primary text-center align-middle flex justify-center items-center relative'>
                                                    <div>{item}</div>
                                                    <div
                                                        className='absolute top-0 right-0 cursor-pointer text-red-500 cursor-pointer rounded-full hover:text-red-700'
                                                        onClick={()=>{
                                                            var newPath=[...path]
                                                            newPath.splice(index,1)
                                                            setPath(newPath)
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            // </Draggable>
                                        )
                                })}

                                {path.map((item, index)=>
                                    <Xarrow
                                        start={"arrowItem"+index}
                                        end={"arrowItem"+(index+1)}
                                        strokeWidth={2}
                                        path='straight'
                                    />
                                )}
                            </Xwrapper>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    useEffect(() => {
        if(modal!=null)
            RenderModal()
    }, [path, newPathItem, newStartItem])
    

    return (
    <div className='flex flex-col w-full text-sm items-center min-h-screen pb-3 overflow-y-scroll'>

        {modal&&modal}
        <div className='w-full flex justify-center pt-4'>
            <div className='flex flex-row justify-between w-11/12 items-center'>
                <div className='text-xl font-bold'>Application Paths</div>
                <div className='flex flex-row space-x-4 items-center'>
                    <div className='bg-white border rounded-full w-10 aspect-square'/>
                    <div>user Name</div>
                </div>
            </div>
        </div>

        <div className='flex flex-col w-11/12'>

            <div className='flex flex-col items-center py-8 space-y-4 w-full admin-dashbord-height mt-8 bg-white rounded-xl'>
                {/* white box nav bar */}
                <div className='flex flex-row justify-between w-11/12 items-center'>
                <div className='flex flex-row tex-black text-sm font-bold'>
                    <div
                        className='cursor-pointer '
                    >
                        <div>Application Paths</div>
                        <div className='h-1 self-center w-full bg-stone-800 rounded-full'/>
                    </div>
                </div>

                {/* <div className='text-sm mb-2'>Showing 1-8 out of 200 results</div> */}
                </div>

                {/* Paths list */}
                <div className='w-11/12 overflow-y-scroll '>
                <table className='w-full'>
                    <tr className='bg-primary text-left sticky top-0'>
                        <th className='py-3'>Path</th>
                        <th>Certificates</th>
                        <th>Add new Certificates</th>
                    </tr>
                    {pathData.map((pathItem,index)=>(
                        <tr key={index} className='border-b border-slate-200 border-solid'>
                            <td>{pathItem.start}-{pathItem.path}</td>

                            {/* Certificates mapped to the path */}
                            <td>
                                <div className='flex flex-row space-x-2'>
                                    {pathItem.certificates!=""&&pathItem.certificates.map((certificate, certIndex)=>(
                                        <div 
                                            key={certIndex}
                                            className='bg-slate-200 cursor-pointer text-stone-800 font-bold w-8 h-8 rounded-full flex items-center justify-center relative'
                                            onMouseEnter={()=>{setAltTextIndex(certIndex+"-"+index)}} onMouseLeave={()=>{setAltTextIndex(-1)}}
                                        >
                                            {certificates.findIndex(c=>c.name==certificate.name)}
                                            {altTextIndex==certIndex+"-"+index&&(
                                                <div className={'absolute left-0 text-white bg-stone-600 whitespace-nowrap rounded-full p-3 text-xs z-40 '+ (index==pathData.length-1?'bottom-9':'top-9')}>{certificate.name}</div>
                                            )}

                                            <div
                                                className='absolute -top-2 -right-2 cursor-pointer text-red-500 cursor-pointer rounded-full hover:bg-black'
                                                onClick={()=>{

                                                    axios.get('http://localhost:8080/admin/deleteMapping',{
                                                        params:{
                                                            certificateId: certificate.certificateId,
                                                            pathNo:pathItem.pathNo
                                                        }
                                                    })
                                                    .then(function (response) {

                                                        var newPathData=[...pathData]
                                                        newPathData[index].certificates=[...response.data]
                                                        setPathData([...newPathData])
                                                    })
                                                    .catch(function (error) {
                                                        console.log("FAILED!!! ",error);
                                                    });
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td>
                                <div className='flex flex-row space-x-3 py-3'>
                                    <select 
                                        className='ring-slate-200 ring-2 rounded-xl w-4/12 outline-none'
                                        onChange={(e)=>{setSelectedCertificateIndex(e.target.value)}}
                                    >
                                        <option value={null}>NIL</option>
                                        {certificates.map((item, index)=>(
                                            <option 
                                                key={index} 
                                                value={index}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Button to map a certificate to a path */}
                                    <button 
                                        // className='rounded-xl p-2 bg-blue-500 w-2/12 text-white font-bold hover:bg-blue-700'
                                        className='button-blue w-2/12 '
                                        onClick={()=>{
                                            if(selectedcertificateIndex!=-1)
                                            {
                                                axios.post('http://localhost:8080/admin/mapCertificate',{
                                                    certificateId: certificates[selectedcertificateIndex].certificateId,
                                                    pathNo: pathItem.pathNo
                                                })
                                                .then(function (response) {

                                                    var newPathItem={...pathItem}

                                                    newPathItem.certificates=[...response.data] // response has new list of cerifictaes for the path
                                                    console.log("newpathitem : ",newPathItem)
                                                    var newPathData=[...pathData]
                                                    newPathData.splice(index,1,newPathItem)
                                                    setPathData(newPathData)
                                                })
                                                .catch(function (error) {
                                                    console.log("FAILED!!! ",error);
                                                });
                                            }
                                        }}
                                    >
                                        Add
                                    </button>

                                    <button 
                                        // className='rounded-xl p-2 bg-blue-500 w-2/12 text-white font-bold hover:bg-blue-700'
                                        className='button-red bg-red-600 w-fit '
                                        onClick={()=>{

                                            axios.get('http://localhost:8080/admin/deletePath',{
                                                params:{
                                                    pathNo: pathItem.pathNo
                                                }
                                            })
                                            .then(function (response) {

                                                console.log(response.data)
                                                if(response.data.length>0)
                                                {
                                                    var newPathData=[...pathData]
                                                    newPathData.splice(index,1)
                                                    setPathData([...newPathData])
                                                }
                                            })
                                            .catch(function (error) {
                                                console.log("FAILED!!! ",error);
                                            });
                                        }}
                                    >
                                        Delete Path
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
                </div>
            </div>
            
            <button 
                // className='text-left w-11/12 text-stone-800 text-lg font-bold mt-5 mb-1'
                className='button-blue w-fit mt-5 px-2'
                onClick={()=>{RenderModal()}}
            >
                    Add New Path
            </button>
        </div>
    </div>
    )
}

export default AdminPaths