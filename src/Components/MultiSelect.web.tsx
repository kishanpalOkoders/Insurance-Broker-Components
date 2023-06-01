import React, { useEffect, useState } from 'react'
import { FormHelperText, makeStyles } from '@material-ui/core'
import Select from 'react-select';
import LabelWithIcon from './LabelWithIcon'

const useStyles = makeStyles({

    selectStyle: {
        '& .css-3w2yfm-ValueContainer > div': {
            backgroundColor: '#cbdeec',
        },
        '& .css-3w2yfm-ValueContainer > div:last-child': {
            backgroundColor: '#fff',
        }
    },
    selectError: {
        '& > div': {
            // height: '56px',
            borderColor: 'red',
            backgroundColor: '#fff',
        }
    },
    selectRemoveicon: {
        '& [role="button"]': {
            display: 'none'
        }
    }
})

type MultiSelectProps = {
    selectOptions: any,
    selectValue: any,
    disable?: boolean,
    showError?: boolean,
    eventHandler: (selected: any) => void,
}

const MultiSelect = (props: MultiSelectProps) => {
    const classes = useStyles();
    // const [count, setCount] = useState(0)
    // const [errorShow, setErrorShow] = useState(false)
    // useEffect(() => {
    //     setCount(count+1)
    //     if (count) {
    //         setErrorShow(props?.showError)
    //     }
    // }, [props.showError])
    return (
        <div>
            <Select
                isMulti
                options={props.selectOptions}
                value={props.selectValue}
                onChange={props.eventHandler}
                isDisabled={props.disable || false}
                className={`${classes.selectStyle} ${props?.showError ? classes.selectError : ''} ${props.disable ? classes.selectRemoveicon : ''}`}
            />
            {/* {
                errorShow ? (<FormHelperText component="div" style={{ flexGrow: 1, color: '#ff1943', }}>This field is required.</FormHelperText>) : null
            } */}
        </div>
    )
}

export default MultiSelect