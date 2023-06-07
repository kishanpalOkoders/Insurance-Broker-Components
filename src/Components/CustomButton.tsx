import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles({
    btnStyle: {
        padding: '12px 24px',
        borderRadius: '9px',
        border: '1.5px solid #0090a1',
        textTransform: 'capitalize',
        minWidth: '150px'
    }
})

type CustomButtonProps = {
    btnText: string,
    onClick: () => void,
    bgColor?: string,
    textColor?: string,
}

const CustomButton = (props: CustomButtonProps) => {
    const classes = useStyles();

    return (
        <div>
            <Button variant="contained" color="primary" onClick={props.onClick} className={classes.btnStyle} style={{ background: props.bgColor ? props.bgColor : '#fff', color: props.textColor, }}>
                {props.btnText}
            </Button>
        </div>
    )
}

export default CustomButton