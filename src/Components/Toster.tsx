import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'


type Severity = "error" | "success" | "info" | "warning" | undefined;

type propsType = {
    tosterText: string,
    showToster : boolean,
    tosterType: Severity, // error, success, warning, info
    handleCloseToster: () => void,
}


const Toster = (props:propsType) => {
  return (
    <div>  
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} key={'top' + 'right'} open={props.showToster} autoHideDuration={3000} onClose={props.handleCloseToster}>
    <Alert onClose={props.handleCloseToster} severity={props.tosterType}>
        {props.tosterText}
    </Alert>
</Snackbar>
</div>
  )
}

export default Toster