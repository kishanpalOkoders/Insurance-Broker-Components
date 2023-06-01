import React, { useEffect, useState } from 'react'
import { FormLabel, Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';
import Alert from '@material-ui/lab/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles({
    cmpWrapper:{
        backgroundColor: '#fff',
        padding: '30px',
        width: '100%',
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
    }
})

type inputDataType = {
    value: string,
    label: string,
}

const enumFormAction = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
}

type SiibCommissionRateProps = {
    insuranceInputs: any,
    addSiibCommission: (label: string,value:number) => void,
    submitEvent: boolean,
    formType: string,
    siibComissionRate:any
}

const CustomInput = (props:any) => {
    const [inputData, setInputData] = useState<number | null>(null)
    const [showError, setShowError] = useState(false);
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      setCount(count+1)
      if (count) {
        inputData === null ? setShowError(true) : setShowError(false)
      }
      props.siibPercentageData && setShowError(false)
  }, [props.submitEvent])
  
    return (
        <>
        <FormLabel component="legend">{props?.data?.label} Insurance <ErrorIcon /></FormLabel>
                          <TextField
                              id="outlined-basic"
                              label=""
                              variant="outlined"
                              fullWidth
                              name={props?.data?.label}
                              value={props?.siibPercentageData}
                              // value={props.data.value}
                              //   onBlur={(e:any) => props.insuranceUpdate(props.data?.label, e.target.value)}
                              onChange={(e:any) =>{
                                const val = e.target.value.replace(/\D/g, "");
                                setInputData(val)
                                val && setShowError(false);
                                props?.insuranceUpdate(props?.data?.label, val)
                              }} 
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">%</InputAdornment>
                                ),
                               readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                              }}
                              // value={formik.values.iban}
                              // onChange={formik.handleChange}
                              error={(inputData !== null && inputData > 100 ? true : false) || showError}
                            //   helperText={formik.touched.iban && formik.errors.iban}
                              size='small'
                              required
                          />
        </>
    )
}

const SiibCommissionRate = (props:SiibCommissionRateProps) => {
    const classes = useStyles();
    const [allInsurancesData, setAllInsurancesData] = useState<any>(null)
    // const [commissionRate, setCommissionRate] = useState<number>(0);

    useEffect(() => {
      setAllInsurancesData(props?.insuranceInputs)
      console.log("SiibCommissionRate", props?.insuranceInputs )
    }, [])
    
  // useEffect(() => {
  //   if(props.formType === enumFormAction.EDIT){
  //     setAllInsurancesData(props.insuranceInputs)
  //   }
  // }, [props.insuranceInputs])
    
    
    const handleInsuranceUpdate = (label:string, value:number) => {
        console.log("event trigger", allInsurancesData, value)

        if(value <= 100) {
            console.log("SiibCommissionRate :",label,value )
            props?.addSiibCommission(label,value)
        }else{
            console.log("else condition")
            toast.error(`${label} Insurance vaue not more than 100%`)
        }
        // setAllInsurancesData((prevState:any) => [...prevState, newState])
    }
  return (
    <div className={classes.cmpWrapper}>
<ToastContainer />
          <Grid container spacing={3}>
              {
                  props?.insuranceInputs && props?.insuranceInputs?.types_of_insurance && props?.insuranceInputs?.types_of_insurance?.map((item: any) => (
                    <Grid item xs={12} sm={4} key={item}>
                        <CustomInput data={item} formType={props?.formType} siibPercentageData={props?.siibComissionRate[item?.label]} insuranceUpdate={handleInsuranceUpdate} submitEvent={props?.submitEvent}/>
                      </Grid>
                  ))
              }
          </Grid>        
    </div>
  )
}

export default SiibCommissionRate