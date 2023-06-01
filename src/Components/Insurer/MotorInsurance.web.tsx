import React, { useEffect, useState } from 'react';
import { FormControl, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import LabelWithIcon from '../LabelWithIcon';
import MultiSelect from '../MultiSelect.web'


const useStyles = makeStyles({
    cmpWrapper: {
        backgroundColor: '#fff',
        padding: '30px',
        width: '100%',
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
        minWidth: '100%',
    },
    lineSaprator: {
        backgroundColor: '#e2e2e2',
        height: '1.3px',
        width: '100%',
        margin: '18px 0px'
    },
})

const enumFormAction = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
}

type motorInsuranceDataType = {
    insurance_class: string,
    motor_premium: string,
    motor_premium_minimum_value: string,
    sedan_suv_minimum_excess: string,
    pickup_minimum_execess: string,
    van_minimum_excess: string,
    lcv_minimum_execess: string,
    hcv_minimum_excess: string,
}

const enumMotorInsuranceProps = {
    insurance_class: 'insurance_class',
    motor_premium: 'motor_premium',
    motor_premium_minimum_value: 'motor_premium_minimum_value',
    sedan_suv_minimum_excess: 'sedan_suv_minimum_excess',
    pickup_minimum_execess: 'pickup_minimum_execess',
    van_minimum_excess: 'van_minimum_excess',
    lcv_minimum_execess: 'lcv_minimum_execess',
    hcv_minimum_excess: 'hcv_minimum_excess',
}

const insuranceClassOptions: any = [
    { value: 'Comprehensive', label: 'Comprehensive' },
    { value: 'TPL', label: 'TPL' },
];


type MotorInsuranceType = {
    motorInsuranceProps: (key: string, value: string) => void,
    data: motorInsuranceDataType,
    submitEvent: boolean, 
    formType: string,
}

const MotorInsurance = (props: MotorInsuranceType) => {
    const classes = useStyles();
    const [insuranceClass, setInsuranceClass] = useState('')
    const [count, setCount] = useState(0)
    const [errors, setErrors] = useState<any>({
        insuranceClass: false,
        motor_premium: false,
        motor_premium_minimum_value: false,
        sedan_suv_minimum_excess: false,
        pickup_minimum_execess: false,
        van_minimum_excess: false,
        lcv_minimum_execess: false,
        hcv_minimum_excess: false,
    })

    
    useEffect(() => {
        setCount(count+1)
        if (count) {
            const data:any = { ...props.data };
            const temp:any = { ...errors };
            if(Object.keys(data).length){
                console.log("adsjkasd: ", data)
                if(data['insuranceClass'] === undefined){
                    temp['insuranceClass'] = true
                }
                for (const key in temp) {
                    if (data[key] === '' || data[key] === undefined) {
                        temp[key] = true
                    }
                }
            }else{
                for (const key in temp) {
                        temp[key] = true
                }
            }

            // if (props?.data?.insurance_class === '') {
            //     temp['insuranceClass'] = true;
            // }
            // if (props?.data?.class_benefits === '') {
            //     temp['classBenefits'] = true;
            // }
            setErrors(temp)
        }
    }, [props.submitEvent])

    return (
        <div className={classes.cmpWrapper}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    {/* <FormControl variant="outlined" placeholder='kp' className={classes.formControl} size='small'>
                        <LabelWithIcon label={'First commercial license legal name'} />
                        <Select
                            id="demo-simple-select-outlined"
                            inputProps={{ 'aria-label': 'Without label' }}
                            style={{textAlign: 'left'}}
                            placeholder='asnjkadsn'
                        >
                            <MenuItem value={10}>Comprehensive</MenuItem>
                            <MenuItem value={20}>TPL</MenuItem>
                        </Select>
                    </FormControl> */}
                    <LabelWithIcon label='Insurance Class' />
                    <MultiSelect
                        selectOptions={insuranceClassOptions}
                        // selectValue={insuranceClass}
                        selectValue={props.data.insurance_class}
                        eventHandler={(selected: any) => {
                            props.motorInsuranceProps(enumMotorInsuranceProps.insurance_class, selected)
                            setInsuranceClass(selected)
                            // insuranceClass && insuranceClass.length ? false : true
                            
                            if (insuranceClass && insuranceClass.length) {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.insurance_class] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.insurance_class] = false;
                                setErrors(temp)
                            }
                        }}
                        showError={errors[enumMotorInsuranceProps.insurance_class]}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Permiumm %'} />
                      <TextField
                              id="outlined-basic"
                              label=""
                              variant="outlined"
                              fullWidth
                            //   name={props.data?.label}
                              value={props.data?.motor_premium}
                              //   onBlur={(e:any) => props.insuranceUpdate(props.data?.label, e.target.value)}
                              onChange={(e:any) =>{
                                const val = e.target.value.replace(/\D/g, "");
                                props.motorInsuranceProps(enumMotorInsuranceProps.motor_premium, val)
                                if(val){
                                    const temp = { ...errors };
                                    temp[enumMotorInsuranceProps.motor_premium] = false;
                                    setErrors(temp)
                                }
                              }} 
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">%</InputAdornment>
                                ),
                                readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                              }}
                              error={errors[enumMotorInsuranceProps.motor_premium]}
                            //   helperText={formik.touched.iban && formik.errors.iban}
                              size='small'
                              required
                          />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Permiumm minimum value'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        value={props.data?.motor_premium_minimum_value}
                        name={enumMotorInsuranceProps.motor_premium_minimum_value}
                        onChange={(e: any) => {
                            props.motorInsuranceProps(enumMotorInsuranceProps.motor_premium_minimum_value, e.target.value)
                        
                            if (props?.data?.motor_premium_minimum_value === '') {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.motor_premium_minimum_value] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.motor_premium_minimum_value] = false;
                                setErrors(temp)
                            }
                        }}
                        error={errors[enumMotorInsuranceProps.motor_premium_minimum_value]}
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
            </Grid>

            <div className={classes.lineSaprator}></div>


            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Sadan / SUV minimum excess'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        name={enumMotorInsuranceProps.sedan_suv_minimum_excess}
                        value={props.data?.sedan_suv_minimum_excess}
                        onChange={(e: any) => {
                            props.motorInsuranceProps(enumMotorInsuranceProps.sedan_suv_minimum_excess, e.target.value)
                        
                            if (props?.data?.sedan_suv_minimum_excess === '') {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.sedan_suv_minimum_excess] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.sedan_suv_minimum_excess] = false;
                                setErrors(temp)
                            }
                        }}
                        error={errors[enumMotorInsuranceProps.sedan_suv_minimum_excess]}
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Pickup minimum excess'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        name={enumMotorInsuranceProps.pickup_minimum_execess}
                        value={props.data?.pickup_minimum_execess}
                        onChange={(e: any) => {
                            props.motorInsuranceProps(enumMotorInsuranceProps.pickup_minimum_execess, e.target.value)
                            if (props?.data?.pickup_minimum_execess === '') {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.pickup_minimum_execess] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.pickup_minimum_execess] = false;
                                setErrors(temp)
                            }
                        }}
                        error={errors[enumMotorInsuranceProps.pickup_minimum_execess]}
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'Van minimum excess'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        name={enumMotorInsuranceProps.van_minimum_excess}
                        value={props.data?.van_minimum_excess}
                        onChange={(e: any) => {
                            props.motorInsuranceProps(enumMotorInsuranceProps.van_minimum_excess, e.target.value)
                            if (props?.data?.van_minimum_excess === '') {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.van_minimum_excess] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.van_minimum_excess] = false;
                                setErrors(temp)
                            }
                        }}
                        error={errors[enumMotorInsuranceProps.van_minimum_excess]}
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'LCV minimum excess'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        name={enumMotorInsuranceProps.lcv_minimum_execess}
                        value={props.data?.lcv_minimum_execess}
                        onChange={(e: any) => {
                            props.motorInsuranceProps(enumMotorInsuranceProps.lcv_minimum_execess, e.target.value)
                            if (props?.data?.lcv_minimum_execess === '') {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.lcv_minimum_execess] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.lcv_minimum_execess] = false;
                                setErrors(temp)
                            }
                        }}
                        error={errors[enumMotorInsuranceProps?.lcv_minimum_execess]}
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label={'HCV minimum excess'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        size='small'
                        name={enumMotorInsuranceProps.hcv_minimum_excess}
                        value={props.data?.hcv_minimum_excess}
                        onChange={(e: any) => {
                            props.motorInsuranceProps(enumMotorInsuranceProps.hcv_minimum_excess, e.target.value)
                            if (props?.data?.hcv_minimum_excess === '') {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.hcv_minimum_excess] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp[enumMotorInsuranceProps.hcv_minimum_excess] = false;
                                setErrors(temp)
                            }
                        }}
                        error={errors[enumMotorInsuranceProps?.hcv_minimum_excess]}
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
            </Grid>

        </div>
    )
}

export default MotorInsurance