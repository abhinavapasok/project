import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
export default function ApplicationDialog({open,setOpen,details,modalText,modalHeading}) {

  useEffect(() => {
    if(details.application_form!=undefined)
        setApplicationForm(JSON.parse(details.application_form))
  }, [details.application_form])
  

  const [fullWidth, setFullWidth] = useState(true);  
  const [applicationForm,setApplicationForm]=useState({})
  const handleClose = () => {
    setOpen(false);
  };

  const approveApplication = ()=>{
      axios.post(`${baseUrl}/staffadvisor/approveapplication`,{application_id:details.application_id})
      .then(res=>{
          console.log(res)
          setOpen(false)
      })
  }

  const renderApplicationForm = (applicationForm)=>{
      
        var renderArray=[]
        console.log(applicationForm)
        for(let key in applicationForm)
        {
            renderArray.push(<div className='capitalize'>{key} : {applicationForm[key]}</div>)
        }

        console.log(renderArray)
        return (<div>
            {renderArray.map(item=>item)}
        </div>)
  }


  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    maxWidth="md"
    fullWidth={fullWidth}
  >
    <DialogTitle id="alert-dialog-title" className='text-black font-semibold flex items-center justify-between capitalize'>
      {details.certificatename} Application
      <CloseIcon className="cursor-pointer" onClick={handleClose}/>
    </DialogTitle>
    <DialogContent className="w-full">
     <h1>Name: {details.studentname}</h1>
     <p>Admission No: {details.admissionno}</p>
     <p className='capitalize'>Programme: {details.programme}</p>
     <p>Applied On: {details.applieddate}</p>
     {renderApplicationForm(applicationForm)}
     <div className='mt-3 w-full flex items-center justify-between'>
     <button className='submit-button-black'>Reject</button>
     <button className='submit-button-black' onClick={approveApplication}>Approve</button>
     </div>
     
    </DialogContent>
      
  </Dialog>
  );
}
