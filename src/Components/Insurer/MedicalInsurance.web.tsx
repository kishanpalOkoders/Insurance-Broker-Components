import React, { useEffect, useRef, useState } from 'react'
import { FormLabel, Grid, makeStyles, TextField } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';
import LabelWithIcon from '../LabelWithIcon'

const useStyles = makeStyles({
    cmpWrapper: {
        backgroundColor: '#fff',
        padding: '30px',
        '& legend': {
            textAlign: 'left',
            marginBottom: '10px',
            display: 'flex',
            fontSize: '14px',
            // color: '#d0d0d0',
            color: '#3d3d3d',
            '& svg': {
                fontSize: '15px',
                color: '#222',
                marginLeft: '6px',
            }
        }
    },
    classBenefits: {
        width: '60%',
        display: 'block'
    }
})

const enumFormAction = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
}

type medicalInsuranceDataType = {
    insurance_class: string,
    class_benefits: string,
}

type MedicalInsuranceType = {
    addInsuranceClassData: (data: string) => void,
    addClassBenefitsData: (data: string) => void,
    data: medicalInsuranceDataType,
    submitEvent: boolean,
    formType: string,
}



const MedicalInsurance = (props: MedicalInsuranceType) => {
    const classes = useStyles(); 
    const [count, setCount] = useState(0)
    const [errors, setErrors] = useState({
        insuranceClass: false,
        classBenefits: false,
    })

    useEffect(() => {
        setCount(count+1)
        if (count) {
            const temp = { ...errors };
            if (props?.data?.insurance_class === '') {
                temp['insuranceClass'] = true;
            }
            if (props?.data?.class_benefits === '') {
                temp['classBenefits'] = true;
            }
            setErrors(temp)
        }
    }, [props.submitEvent])


    return (
        <div className={classes.cmpWrapper}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                        <LabelWithIcon label={'Insurance Class'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        name="insuranceClass"
                        placeholder='VVIP'
                        onChange={(e: any) => {
                            props.addInsuranceClassData(e.target.value)
                            if (props?.data?.insurance_class === '') {
                                const temp = { ...errors };
                                temp['insuranceClass'] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp['insuranceClass'] = false;
                                setErrors(temp)
                            }
                        }}
                        // onBlur={(e: any) => {
                        //     // props.insuranceUpdate(props.data?.label, e.target.value)
                        //     // setInputData(e.target.value)
                        // }}
                        value={props?.data?.insurance_class}
                        error={errors['insuranceClass']}
                        //   helperText={formik.touched.iban && formik.errors.iban}
                        size='small'
                        required
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                        <LabelWithIcon label={'Class Benefits'} />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        name="classBenefits"
                        placeholder="-Network name VVIP&
                        -Max limit SAR 500,000
                        -out patient 20% MAX 75
                        -Room REG SUIT 
                        -Dental SAR 2,000
                        -Optical SAR 400
                        -Matenity SAR 15,000"
                        className={classes.classBenefits}
                        onChange={(e: any) => {
                            props.addClassBenefitsData(e.target.value)

                            if (props?.data?.class_benefits === '') {
                                const temp = { ...errors };
                                temp['classBenefits'] = true;
                                setErrors(temp)
                            } else {
                                const temp = { ...errors };
                                temp['classBenefits'] = false;
                                setErrors(temp)
                            }
                        }}
                        value={props?.data?.class_benefits}
                        error={errors['classBenefits']}
                        // onBlur={(e: any) => {
                        //     // props.insuranceUpdate(props.data?.label, e.target.value)
                        //     // setInputData(e.target.value)
                        // }}
                        size='small'
                        multiline
                        required
                        rows={7}
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default MedicalInsurance