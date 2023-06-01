import React, {useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    dialogWrapper:{
        "& [role='dialog']":{
            padding: '30px',
            borderRadius: '16px',
        }
    },
    headingStyle: {
        textAlign: 'center',
        '& h2': {
            fontWeight: 700,
        }
    },
    paraStyle:{
        textAlign: 'center',
    },
    btnWrapper:{
        justifyContent: 'center',
        '& button': {
            padding: '15px 0px',
            width: '150px',
            borderColor: '#3b8da2',
            borderRadius: '15px',
        }
    },
})

type ConfirmationDialogProps = {
    openDialog:boolean,
    headingText: string,
    paragraphText: string,
    btnCancelText: string,
    btnOkText: string,
    handleOk: () => void;
    handleCancel: () => void;
}

const ConfirmationDialog = (props:ConfirmationDialogProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <>
        
      <Dialog
        open={props?.openDialog}
        onClose={props?.handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogWrapper}
      >
        <DialogTitle id="alert-dialog-title" className={classes.headingStyle}>{props?.headingText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"  className={classes.paraStyle}>
            {props?.paragraphText}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.btnWrapper}>
          <Button variant="outlined" style={{color: '#3b8da2',}} onClick={props?.handleCancel} color="primary">
            {props.btnCancelText}
          </Button>
          <Button variant="outlined" style={{backgroundColor: '#3b8da2', color: '#fff',}} onClick={props?.handleOk} color="primary" autoFocus>
          {props.btnOkText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationDialog