import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CertificateDocument from './CertificateDocument';

export default function DownloadDialog({open,setOpen,modalText,modalHeading,certificateText,certificateName}) {
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" className='text-black font-semibold'>
          {modalHeading}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="text-black">
            {modalText}
          </DialogContentText>
          <CertificateDocument certificateText={certificateText} certificateName={certificateName}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
