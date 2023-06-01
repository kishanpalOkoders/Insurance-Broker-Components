import React, { useEffect, useState } from 'react'
import { FormControl, Grid, InputAdornment, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import LabelWithIcon from '../LabelWithIcon';


const useStyles = makeStyles({
    cmpWrapper: {
        backgroundColor: '#fff',
        padding: '30px',
        // width: '100%',
        '& legend': {
            textAlign: 'left',
            marginBottom: '10px',
            display: 'flex',
            fontSize: '14px',
            // color: '#d0d0d0',
            color: '#3d3d3d !important',
            '& svg': {
                fontSize: '15px',
                color: '#222',
                marginLeft: '6px',
            }
        },
        '& label': {
            color: '#3d3d3d !important',
        }
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    lineSaprator: {
        backgroundColor: '#e2e2e2',
        height: '1.3px',
        width: '100%',
        margin: '18px 0px'
    },
})
type contactsType = {
    first_name: string,
    last_name: string,
    position: string,
    phone_number: string,
    email: string,
}

const enumContact = {
    first_name: 'first_name',
    last_name: 'last_name',
    position: 'position',
    phone_number: 'phone_number',
    email: 'email',
}

const enumFormAction = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
}

type ContactProps = {
    addData: (key: string, value: string) => void,
    // contactProp: contactsType,
    contactProp: any,
    submitEvent: boolean,
    formType: string,
}

const Contact = (props: ContactProps) => {
    const classes = useStyles();
    // const [phError, setPhError] = useState(false)
    // const [emailError, setEmailError] = useState(false)
    const [count, setCount] = useState(0)
    const [errors, setErrors] = useState<any>({
        email: false,
        first_name: false,
        last_name: false,
        phone_number: false,
        position: false,
    })


    useEffect(() => {
        setCount(count + 1)
        if (count) {
            const temp = { ...errors };
            for (const key in temp) {
                if (props.contactProp[key] === '') {
                    temp[key] = true
                }
            }

            setErrors(temp)
        }
    }, [props.submitEvent])


    return (
        <div className={classes.cmpWrapper}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'First name'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        value={props.contactProp?.first_name}
                        name={enumContact.first_name}
                        onChange={(e) => {
                            props.addData(enumContact.first_name, e.target.value)

                            const temp: any = { ...errors };
                            temp[enumContact.first_name] = false;
                            setErrors(temp)
                        }}
                        error={errors[enumContact.first_name]}
                        InputProps={{
                            readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Last name'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        value={props.contactProp.last_name}
                        name={enumContact.last_name}
                        onChange={(e) => {
                            props.addData(enumContact.last_name, e.target.value)

                            const temp: any = { ...errors };
                            temp[enumContact.last_name] = false;
                            setErrors(temp)
                        }}
                        error={errors[enumContact.last_name]}
                        InputProps={{
                            readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Position(optional)'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        value={props.contactProp.position}
                        name={enumContact.position}
                        onChange={(e) => {
                            props.addData(enumContact.position, e.target.value)

                            const temp: any = { ...errors };
                            temp[enumContact.position] = false;
                            setErrors(temp)
                        }}
                        error={errors[enumContact.position]}
                        InputProps={{
                            readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Phone number'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        value={props.contactProp.phone_number}
                        name={enumContact.phone_number}
                        onChange={(e: any) => {
                            const val = e.target.value.replace(/\D/g, "");
                            const phPattern = new RegExp(/^((?:[+?0?0?966]+)(?:\s?\d{2})(?:\s?\d{7}))$/);
                            props.addData(enumContact.phone_number, val)
                            if (phPattern.test(val)) {
                                if (val === '') {
                                    const temp: any = { ...errors };
                                    temp[enumContact.phone_number] = true;
                                    setErrors(temp)
                                } else {
                                    const temp: any = { ...errors };
                                    temp[enumContact.phone_number] = false;
                                    setErrors(temp)
                                }
                            } else {
                                const temp: any = { ...errors };
                                temp[enumContact.phone_number] = true;
                                setErrors(temp)
                            }
                        }}
                        // value={formik.values.iban
                        // onChange={formik.handleChange}
                        error={errors[enumContact.phone_number]}
                        //   helperText={formik.touched.iban && formik.errors.iban}
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src="/assets/images/SAUDI_ARABIA_FLAG.png" height="35px" width="35px" /> + 966 <div />
                                </InputAdornment>
                            ),
                            readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Email'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        value={props.contactProp.email}
                        name={enumContact.email}
                        onChange={(e) => {
                            const emailPattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
                            props.addData(enumContact.email, e.target.value)
                            if (emailPattern.test(e.target.value)) {
                                const temp: any = { ...errors };
                                temp[enumContact.email] = false;
                                setErrors(temp)
                            } else {
                                const temp: any = { ...errors };
                                temp[enumContact.email] = true;
                                setErrors(temp)
                            }
                        }}
                        error={errors[enumContact.email]}
                        InputProps={{
                            readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Contact