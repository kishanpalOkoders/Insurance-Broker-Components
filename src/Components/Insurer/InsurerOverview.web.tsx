import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { Formik, useFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import LabelWithIcon from '../LabelWithIcon'
import MultiSelect from '../MultiSelect.web'

const useStyles = makeStyles({
    formWrapper: {
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
        },
        '& label':{
            color: '#3d3d3d !important',
        }
    },
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
    lineSaprator: {
        backgroundColor: '#e2e2e2',
        height: '1.3px',
        width: '100%',
        margin: '18px 0px'
    },
    submitBtn: {
        height: 'max-content',
        backgroundColor: '#45a3ad',
        textTransform: 'capitalize',
        '&:hover':{
            backgroundColor: '#45a3ad',
        }
    },
    dialogTitle:{
        textAlign: 'center',
        '& > h2':{
            fontWeight: '700',
        }
    },
    dialogBtnWrapper:{
        justifyContent: 'center',
        marginBottom: '15px',
        '@media(min-width: 500px)':{
            '& button': {
                padding: '12px 78px',
            }
        },
    },
    dialogBtnCancel:{
        color: 'rgb(0 0 0 / 54%)',
        textTransform: 'capitalize',
    },
    dialogBtnSave:{
        backgroundColor: '#45a3ad',
        textTransform: 'capitalize',
        borderColor: '#45a3ad',
        color: '#fff',
        "&:hover":{
            backgroundColor: '#45a3ad',
        }
    },
    selectRemoveicon:{
        '& [role="button"]':{
            display: 'none'
        }
    }
});

const enumSegment = {

}

const segmentDefaultValues = ['Mega KA', 'Corporate', 'SME', 'Government']
const typesOfInsuranceDefaultValues = ['Medical', 'Motor', 'Life', 'Engineering', 'Marine', 'Property', 'Fire', 'Aviation', 'Energy', 'protection and savings', 'General Bussiness']

const segmentOptions: any = [
    { value: 'Mega KA', label: 'Mega KA' },
    { value: 'Corporate', label: 'Corporate' },
    { value: 'SME', label: 'SME' },
    { value: 'Government', label: 'Government' },
];

const typesOfInsuranceOptions: any = [
    { value: 'Medical', label: 'Medical' },
    { value: 'Motor', label: 'Motor' },
    { value: 'Energy', label: 'Energy' },
    { value: 'Life', label: 'Life' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Marine', label: 'Marine' },
    { value: 'Property', label: 'Property' },
    { value: 'Fire', label: 'Fire' },
    { value: 'Aviation', label: 'Aviation' },
    { value: 'protection and saving', label: 'protection and saving' },
    { value: 'General Bussiness', label: 'General Bussiness' },
]

const enumFormAction = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
}


type InsurerOverviewProps = {
    insuranceTypes: (data: string[] | null) => void,
    data:any,
    formType: string,
    // editSegmentValues: any,
    // editTypesOfInsuranceValues:any,
}

const InsurerOverview = (props: InsurerOverviewProps) => {
    const classes = useStyles();
    const [segment, setSegment] = useState<string[] | null>(null);
    const [segmentDefaultOptions, setSegmentDefaultOptions] = useState(segmentOptions)
    // const [segmentValues, setSegmentValues] = useState<string[] | null>(null)
    const [types_of_insurance, setTypes_of_insurance] = useState<string[] | null>(null);
    // const [typesOfInsuranceValues, setTypesOfInsuranceValues] = useState<string[] | null>(null);
    const [typesOfInsuranceDefaultOptions, setTypesOfInsuranceDefaultOptions] = useState(typesOfInsuranceOptions)
    // const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectDisable, setSelectDisable] = useState(false)
    const [showErrorSegment, setShowErrorSegment] = useState(false)
    const [showErrorTypesOfInsurance, setShowErrorTypesOfInsurance] = useState(false)
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState<any>(null)
    let stopMount = useRef(false);

    const initialValues = {
        // insurer_id: "",
        legal_name: "",
        short_name: '',
        address: '',
        vat_number: null,
        bank_name: '',
        swift_code: null,
        account_number: '',
        iban: null,
    }

     
    useEffect(() => {
        console.log("insurer Data :", props?.data)
        if(props.formType !== enumFormAction.ADD){
            // if(props?.data !== null){
            //     console.log("props?.data['segment']:", props?.data['segment'])
            //      setSegment(props?.data['segment'])
            //      setTypes_of_insurance(props?.data['types_of_insurance'])
            // }
        }
    }, [props?.data, props.formType])
      
    useEffect(() => {
        if(stopMount.current){
            const finalValues:any = {...formValues}
            console.log("formValues :", formValues)
            // if(segment !== null || types_of_insurance !== null){
                finalValues['types_of_insurance'] = types_of_insurance !== null ? types_of_insurance : props?.data?.types_of_insurance ;
                finalValues['segment'] = segment !== null ? segment : props?.data?.segment;
                props.insuranceTypes(finalValues)
            // }
        }
    }, [segment, types_of_insurance])


    const validate = Yup.object().shape({
        // insurer_id: Yup.string().trim().typeError('Required').required("Category is required."),
        legal_name: Yup.string().trim().typeError('Required').min(2, "Must be more then one character").max(40, "Must be 40 characters or less").required("This field is required."),
        short_name: Yup.string().trim().typeError('Required').min(2, "Must be more then one character").max(20, "Must be 40 characters or less").required("This field is required."),
        address: Yup.string().trim().typeError('Required').min(2, "Must be more then one character").max(100, "Must be 100 characters or less").required("This field is required."),
        vat_number: Yup.number().typeError('This field is required.').test('len', 'Must be exactly 10 characters', (val: any) => val.toString().length === 10).required("This field is required."),
        bank_name: Yup.string().trim().typeError('Required').min(2, "Must be more then one character").max(40, "Must be 40 characters or less").required("This field is required."),
        swift_code: Yup.number().typeError('This field is required.').test('len', 'Must be exactly 10 characters', (val: any) => val.toString().length === 10).required("This field is required."),
        account_number: Yup.number().typeError('This field is required.').test('len', 'Must be exactly 13 characters', (val: any) => val.toString().length === 13).required("This field is required."),
        iban: Yup.number().typeError('This field is required.').test('len', 'Must be exactly 10 characters', (val: any) => val.toString().length === 10).required("This field is required."),
    })

    //   console.log("useFormik()", useFormik({
    //     initialValues: initialValues,
    //     // validationSchema: validate,
    //     // validate: validate,
    //     // isInitialValid: initialValues,
    //     // initialIsValid:initialIsValid ,
    //     onSubmit: (values) => {
    //     },
    //   }))

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: props.data ? props.data : initialValues,
        validationSchema: validate,
        // isInitialValid: initialValues,
        // initialIsValid:initialIsValid ,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            // debugger
            const finalValues:any = {...values}
            console.log("values :", values)
            if(segment !== null && types_of_insurance !== null && values){
                finalValues['segment'] = segment;
                finalValues['types_of_insurance'] = types_of_insurance;
                setFormValues(finalValues)
                setOpen(true);
            }
        },
    });


    

    const handleTypesOfInsurance = (selected: any) => {
        // const item = (e.target as HTMLInputElement).value
        // const newState: string[] | null = typesOfInsuranceValues
        // setTypesOfInsuranceValues((current:any) => [...current, item] )
        setTypes_of_insurance(selected,);
        setShowErrorTypesOfInsurance(false)
        stopMount.current = true 
    }

    const handleSegment = (selected: any) => {
        // setSegmentValues((e.target as HTMLInputElement).value)
        setSegment(selected);
        setShowErrorSegment(false)
        stopMount.current = true 
    }

    // const handleSelectChange = (selected:any) => {
    //   setSelectedOptions(selected);
    // };


    const handleCancel = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setSelectDisable(!selectDisable)
        setOpen(false);
        // props.insuranceTypes(types_of_insurance)
        props.insuranceTypes(formValues)
    }

    const handelSubmitFun = () => {
        console.log("kp", formik.values.iban)
        if (segment === null) {
            setShowErrorSegment(true)
        }
        if (types_of_insurance === null) {
            setShowErrorTypesOfInsurance(true)
        }
        // if(segment !== null && types_of_insurance !== null && formik.values.iban !== null && formik.values.swift_code !== null && formik.values.vat_number !== null && formik.values.legal_name !== "" && formik.values.short_name !== "" && formik.values.address !== "" && formik.values.bank_name !== "" && formik.values.account_number !== ''){
            
        // }
    }

    return (
        <>

            <form onSubmit={formik.handleSubmit} className={classes.formWrapper}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        {/* <label htmlFor="Insurer_Id">Insurer Id</label> */}
                        {/* <FormLabel component="legend">Insurer Id <ErrorIcon /></FormLabel> */}
                        <LabelWithIcon label={'Insurer Id'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            fullWidth
                            name='insurer_id'
                            value='C-000001'
                            size='small'
                        // value={formik.values.insurer_id}
                        //     onChange={formik.handleChange}
                        //   error={formik.touched.insurer_id && Boolean(formik.errors.insurer_id)}
                        //   helperText={formik.touched.insurer_id && formik.errors.insurer_id}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LabelWithIcon label={'Legal name'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            fullWidth
                            name='legal_name'
                            value={formik.values.legal_name}
                            onChange={formik.handleChange}
                            error={formik.touched.legal_name && Boolean(formik.errors.legal_name)}
                            helperText={formik.touched.legal_name && formik.errors.legal_name === ""}
                            size='small'
                            inputProps={
                                { readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true, }
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LabelWithIcon label={'Short name'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            name='short_name'
                            fullWidth
                            value={formik.values.short_name}
                            onChange={formik.handleChange}
                            error={formik.touched.short_name && Boolean(formik.errors.short_name)}
                            helperText={formik.touched.short_name && formik.errors.short_name === ""}
                            size='small'
                            inputProps={
                                { readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true, }
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <LabelWithIcon label={'Address'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            name='address'
                            fullWidth
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address === ""}
                            size='small'
                            inputProps={
                                { readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true, }
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LabelWithIcon label={'VAT number'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            name='vat_number'
                            fullWidth
                            value={formik.values.vat_number}
                            onChange={formik.handleChange}
                            error={formik.touched.vat_number && Boolean(formik.errors.vat_number)}
                            helperText={formik.touched.vat_number && formik.errors.vat_number === ""}
                            size='small'
                            inputProps={
                                { readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true, }
                            }
                        />
                    </Grid>
                </Grid>

                <div className={classes.lineSaprator}></div>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <LabelWithIcon label={'Bank name'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            name='bank_name'
                            fullWidth
                            value={formik.values.bank_name}
                            onChange={formik.handleChange}
                            error={formik.touched.bank_name && Boolean(formik.errors.bank_name)}
                            helperText={formik.touched.bank_name && formik.errors.bank_name === ""}
                            size='small'
                            inputProps={
                                { readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true, }
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LabelWithIcon label={'Swift code'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            fullWidth
                            name='swift_code'
                            value={formik.values.swift_code}
                            onChange={formik.handleChange}
                            error={formik.touched.swift_code && Boolean(formik.errors.swift_code)}
                            helperText={formik.touched.swift_code && formik.errors.swift_code === ""}
                            size='small'
                            inputProps={
                                { readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true, }
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <LabelWithIcon label={'Account number'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            fullWidth
                            name='account_number'
                            value={formik.values.account_number}
                            onChange={formik.handleChange}
                            error={formik.touched.account_number && Boolean(formik.errors.account_number)}
                            helperText={formik.touched.account_number && formik.errors.account_number === ""}
                            size='small'
                            inputProps={
                                { readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true, }
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <LabelWithIcon label={'IBAN'} />
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            fullWidth
                            name='iban'
                            value={formik.values.iban}
                            onChange={formik.handleChange}
                            error={formik.touched.iban && Boolean(formik.errors.iban)}
                            helperText={formik.touched.iban && formik.errors.iban === ""}
                            size='small'
                            inputProps={
                                { readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true, }
                            }
                        />
                    </Grid>
                </Grid>

                <div className={classes.lineSaprator}></div>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        {/* <LabelWithIcon label={'Segment'} />
                        <Select
                            isMulti
                            options={segmentDefaultOptions}
                            value={segment}
                            onChange={handleSegment}
                            name='segment'
                            isDisabled={selectDisable}
                            className={`${classes.selectStyle} ${showErrorSegment ? classes.selectError : ''}`}
                        // components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        // isClearable={true}
                        // value={formik.values.segment}
                        // onChange={formik.handleChange}
                        // error={formik.touched.segment && Boolean(formik.errors.segment)}
                        // helperText={formik.touched.segment && formik.errors.segment}
                        />
                        {
                            showErrorSegment ? (<FormHelperText component="div" style={{ flexGrow: 1, color: '#ff1943', }}>This field is required.</FormHelperText>) : null
                        } */} 
                        
                        <LabelWithIcon label='Segment' />
                        <MultiSelect
                         selectOptions={segmentDefaultOptions}
                        //  selectValue={props.formType === enumFormAction.EDIT ? props?.data?.segment : segment}
                         eventHandler={handleSegment}
                        //  selectValue={props?.data?.segment}
                         selectValue={props?.data?.segment}
                         disable={props.formType === enumFormAction.VIEW ? true : false }
                         showError={showErrorSegment ? true : false }
                         />
                    </Grid>
                </Grid>

                <div className={classes.lineSaprator}></div>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} style={{ display: 'flex', alignItems: `${showErrorTypesOfInsurance ? 'center' : 'end'}` }}>
                        <div style={{ width: '100%', marginRight: '15px' }}>
                        <LabelWithIcon label='Types(s) of Insurance' />
                         <MultiSelect
                         selectOptions={typesOfInsuranceDefaultOptions}
                        //  selectValue={types_of_insurance}
                         selectValue={props?.data?.types_of_insurance}
                         eventHandler={handleTypesOfInsurance}
                         disable={props.formType !== enumFormAction.ADD || selectDisable}
                         showError={showErrorTypesOfInsurance ? true : false }
                         />
                        </div>
                        {
                            (!selectDisable && props.formType === enumFormAction.ADD) && (
                        <Button className={classes.submitBtn} onClick={handelSubmitFun} variant="contained" color="primary" type='submit'>
                            save
                        </Button>
                            )
                        }
                    </Grid>
                </Grid>
            </form>


            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>{"Save insurance type"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" >
                        Are you sure you want to proceed with the selected insurance type(s)? Once set, this cannot be changeed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogBtnWrapper}>
                    <Button className={classes.dialogBtnCancel}  variant="outlined" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button className={classes.dialogBtnSave}  variant="outlined" onClick={handleSave} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default InsurerOverview