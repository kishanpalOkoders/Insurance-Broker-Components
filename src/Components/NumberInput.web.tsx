import React, { useState } from 'react'
import { FormLabel, TextField, InputAdornment } from '@material-ui/core';

type NumberInputProps = {
  showError:boolean,
  callback : (val:number) => void;
}

const NumberInput = (props: NumberInputProps) => {
  const [inputData, setInputData] = useState<number | null>(null)
  return (
    <>
        {/* <FormLabel component="legend">{props.data?.label} Insurance <ErrorIcon /></FormLabel> */}
                          <TextField
                              id="outlined-basic"
                              label=""
                              variant="outlined"
                              fullWidth
                              // type='number'
                              // name={props.data?.label}
                              value={inputData}
                              //   onBlur={(e:any) => props.insuranceUpdate(props.data?.label, e.target.value)}
                              onChange={(e:any) =>{
                                const val = e.target.value.replace(/\D/g, "");
                                setInputData(val)
                                props.callback(val)
                                {console.log("interger :", inputData, typeof inputData, typeof val, typeof e.target.value)}
                                // typeof e.target.value === 'number' ? setInputData(parseInt(e.target.value)) : setShowError(true)
                              }} 
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">%</InputAdornment>
                                ),
                              }}
                              // value={formik.values.iban}
                              // onChange={formik.handleChange}
                              error={inputData !== null && inputData > 100 ? true : false}
                            //   helperText={formik.touched.iban && formik.errors.iban}
                              size='small'
                          />
        </>
  )
}

export default NumberInput