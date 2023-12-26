import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ChangePasswordAlertDialog({open,setOpen,modalText,modalHeading}) {
  
  const handleClose = () => {
    setOpen(false);
    window.location='/change-password'
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='text-black font-semibold'>
          {modalHeading}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="text-black">
            {modalText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
  );
}
