import { Accordion, AccordionSummary, AccordionDetails, Typography, makeStyles, withStyles, Grid, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import React, { Component } from 'react'
import InsurerOverview from './Components/Insurer/InsurerOverview.web'
import LockIcon from '@material-ui/icons/Lock';
import PropTypes from 'prop-types';
import LabelWithIcon from './Components/LabelWithIcon';
import { Formik } from 'formik';
import * as Yup from "yup";
import TextInput from './Components/policies/TextInput'
import FileUpload from './Components/policies/FileUpload';
import StageFiveFormSchema from './Components/policies/StageFiveFormSchema';

export const useStyles: any = (theme: any) => ({
    accordionWrapper: {
        padding: '0px 15px',
        '& .MuiAccordion-root': {
            backgroundColor: '#fff',
        }
    },
    childAccordion: {
        width: '100%',
        '&>div': {
            boxShadow: 'none',
            width: '100%',
            border: '1px solid #ccc',
            margin: '15px 0px'
            //    padding: '15px',
        }
    },
    lineSaprator: {
        margin: '30px 0px',
    },
    errorstyle: {
        border: '1px solid red !important'
    },
    fileInput: {
        '& fieldset':{
            borderStyle: 'dashed',
        }
    }
})

const useStylesFunction = makeStyles({
    accordianHeading: {
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
    },
    lockedAccordion: {
        padding: '6px 10px',
        backgroundColor: '#e9f4f9',
        border: '1px solid #ccc',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0px 8px',
        '& svg': {
            marginRight: '6px',
        }
    },
    errorstyle: {
        border: '1px solid red !important'
    },

})

const enumYesNO = {
    YES: 'YES',
    NO: 'NO',
}

const enumTawuniya = {
    tawuniya_quotation_recived: 'tawuniya_quotation_recived',
    tawuniya_quotation_amount: 'tawuniya_quotation_amount',
    tawuniya_comment: 'tawuniya_comment',
    tawuniya_proposal: 'tawuniya_proposal',
    tawuniya_additional_attachment: 'tawuniya_additional_attachment',
    tawuniya_note_to_the_customer: 'tawuniya_note_to_the_customer',
    tawuniya_release_quotation_to_customer: 'tawuniya_release_quotation_to_customer',
}

const enumSaudiBank = {
    saudiBank_quotation_recived: 'saudiBank_quotation_recived',
    saudiBank_comment: 'saudiBank_comment',
    saudiBank_additional_attachment: 'saudiBank_additional_attachment',
    saudiBank_release_quotation_to_customer: 'saudiBank_release_quotation_to_customer',
    saudiBank_note_to_the_customer: 'saudiBank_note_to_the_customer',
}

const enumAxaBank = {
    axaBank_quotation_recived: 'axaBank_quotation_recived',
    axaBank_quotation_amount: 'axaBank_quotation_amount',
    axaBank_comment: 'axaBank_comment',
    axaBank_proposal: 'axaBank_proposal',
    axaBank_additional_attachment: 'axaBank_additional_attachment',
    axaBank_note_to_the_customer: 'axaBank_note_to_the_customer',
    axaBank_release_quotation_to_customer: 'axaBank_release_quotation_to_customer',
}

type accordionTitleProps = {
    title: string,
    // insuranceData: any,
}

const AccordionTitle = (props: accordionTitleProps) => {
    const classes = useStylesFunction()
    return (
        <Typography className={classes.accordianHeading}>
            {props?.title}
            {/* {
                    <div className={classes.lockedAccordion}>
                        <LockIcon /> Please select insurance type to unlock  this fields
                    </div>
            } */}

        </Typography>
    )
}

type MyState = {
    isEdit: false,
    isArabicLanguage: false,
    tawuniya_quotation_recived: string,
    tawuniya_quotation_amount: string,
    tawuniya_comment: string,
    tawuniya_proposal: string,
    tawuniya_additional_attachment: string,
    tawuniya_note_to_the_customer: string,
    tawuniya_release_quotation_to_customer: string,
    saudiBank_quotation_recived: string,
    saudiBank_comment: string,
    saudiBank_additional_attachment: string,
    saudiBank_release_quotation_to_customer: string,
    saudiBank_note_to_the_customer: string,
    axaBank_quotation_recived: string,
    axaBank_quotation_amount: string,
    axaBank_comment: string,
    axaBank_proposal: string,
    axaBank_additional_attachment: string,
    axaBank_note_to_the_customer: string,
    axaBank_release_quotation_to_customer: string,
    release_premium_calculation: string,
    comparison_sheet: string,
    insurance_company_id: string,
        tawuniya_error: boolean,
        saudiBank_error: boolean,
        axaBank_error: boolean,
};

type MyProps = {
    params: any,
    formType: string,
    changeEdit: () => void,
};

class StageFive extends Component<MyProps, MyState> {
    static propTypes: { classes: any; };
    constructor(props: any) {
        super(props);
        // console.log(this.props.match.params.id)
        // this.handleStorage = this.handleStorage.bind(this);
        this.state = {
            isEdit: false,
            isArabicLanguage: false,
            tawuniya_quotation_recived: enumYesNO.YES,
            tawuniya_quotation_amount: '',
            tawuniya_comment: '',
            tawuniya_proposal: '',
            tawuniya_additional_attachment: '',
            tawuniya_note_to_the_customer: enumYesNO.YES,
            tawuniya_release_quotation_to_customer: '',
            saudiBank_quotation_recived: enumYesNO.YES,
            saudiBank_comment: '',
            saudiBank_additional_attachment: '',
            saudiBank_release_quotation_to_customer: enumYesNO.YES,
            saudiBank_note_to_the_customer: '',
            axaBank_quotation_recived: enumYesNO.YES,
            axaBank_quotation_amount: '',
            axaBank_comment: '',
            axaBank_proposal: '',
            axaBank_additional_attachment: '',
            axaBank_note_to_the_customer: '',
            axaBank_release_quotation_to_customer: enumYesNO.YES,
            release_premium_calculation: '',
            comparison_sheet: '',
            insurance_company_id: '',
            tawuniya_error: false,
            saudiBank_error: false,
            axaBank_error: false,
        };
    }

    componentDidUpdate(prevProps:any) {
        //Typical usage, don't forget to compare the props
        console.log('componentDidUpdate :', prevProps)
        // if (this.props.userName !== prevProps.userName) {
        //   this.fetchData(this.props.userName);
        // }
       }

    checkError = (value: any) => {
        const obj = {...value}
        this.setState({ tawuniya_error: false }, () => { 
            for (const key in enumTawuniya) {
            if (obj[key] === '') {
                this.setState({ tawuniya_error: true })
            }
        }
        })
        this.setState({ saudiBank_error: false }, () => {
            for (const key in enumSaudiBank) {
                console.log("obj[key] enumSaudiBank :", obj[key] )
                if (obj[key] === '') {
                    this.setState({ saudiBank_error: true })
                }
            }
        })
        this.setState({ axaBank_error: false }, () => {
            for (const key in enumAxaBank) {
                if (obj[key] === '') {
                    this.setState({ axaBank_error: true })
                }
            }
        })
       
    }

    handleOnChange = (values:any) => {
        this.checkError(values)
        console.log('handleOnChange', values)
    }

    render() {
        const { classes }: any = this.props;
        return (
            <div>
                <Formik
                    enableReinitialize={this.state.isEdit ? true : false}
                    initialValues={{
                        tawuniya_quotation_recived: this.state.tawuniya_quotation_recived,
                        tawuniya_quotation_amount: this.state.tawuniya_quotation_amount,
                        tawuniya_comment: this.state.tawuniya_comment,
                        tawuniya_proposal: this.state.tawuniya_proposal,
                        tawuniya_additional_attachment: this.state.tawuniya_additional_attachment,
                        tawuniya_note_to_the_customer: this.state.tawuniya_note_to_the_customer,
                        tawuniya_release_quotation_to_customer: this.state.tawuniya_note_to_the_customer,
                        saudiBank_quotation_recived: this.state.saudiBank_quotation_recived,
                        saudiBank_comment: this.state.saudiBank_comment,
                        saudiBank_additional_attachment: this.state.saudiBank_additional_attachment,
                        saudiBank_release_quotation_to_customer: this.state.saudiBank_release_quotation_to_customer,
                        saudiBank_note_to_the_customer: this.state.saudiBank_note_to_the_customer,
                        axaBank_quotation_recived: this.state.axaBank_quotation_recived,
                        axaBank_quotation_amount: this.state.axaBank_quotation_amount,
                        axaBank_comment: this.state.axaBank_comment,
                        axaBank_proposal: this.state.axaBank_proposal,
                        axaBank_additional_attachment: this.state.axaBank_additional_attachment,
                        axaBank_note_to_the_customer: this.state.axaBank_note_to_the_customer,
                        axaBank_release_quotation_to_customer: this.state.axaBank_release_quotation_to_customer,
                        release_premium_calculation: this.state.release_premium_calculation,
                        comparison_sheet: this.state.comparison_sheet,
                        insurance_company_id: '',
                    }}
                    validationSchema={Yup.object().shape(StageFiveFormSchema(this.state.isArabicLanguage))}
                    // validateOnMount={true}
                    // validateOnBlur={true}
                    onSubmit={async (values, actions) => {
                        // this.checkError(values)
                        console.log("formik data :", values)
                        // if (this.state.isEdit) {
                        //     this.editCustomer(values);
                        // } else {
                        //     this.submitCustomerForm(values);
                        // }
                    }}
                >
                    {({
                        handleSubmit,
                        errors,
                        touched,
                        values,
                        setFieldValue,
                        validateForm,
                        handleChange
                    }) => (
                        <form className={classes.accordionWrapper} onSubmit={handleSubmit} onChange={() => this.handleOnChange(values)}>
                            <Accordion>
                                <AccordionSummary
                                    aria-expanded={true}
                                    expandIcon={<ExpandMore />}
                                    aria-controls="Insurers"
                                    id="Insurers"
                                >
                                    <AccordionTitle title='Releasing to customer' />
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* <CustomDataTable
                                    onClick={() => { console.log("sadbhj") }}
                                /> */}

                                    <div className={classes.childAccordion}>
                                        <Accordion className={this.state.tawuniya_error ? classes.errorstyle : ''}>
                                            <AccordionSummary
                                                aria-expanded={true}
                                                expandIcon={<ExpandMore />}
                                                aria-controls="Insurers"
                                                id="Insurers"
                                                // style={{border: '1px solid red'}}
                                            >
                                                <AccordionTitle title='Tawuniya' />
                                            </AccordionSummary>
                                            <AccordionDetails style={{ width: '100%' }}>
                                                {/* <CustomDataTable
                                    onClick={() => { console.log("sadbhj") }}
                                /> */}

                                                <div style={{ width: '100%' }}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={4}>
                                                            <FormControl disabled={true}>
                                                                <LabelWithIcon label={'Quotation received?'} />
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    defaultValue={enumYesNO.YES}
                                                                    // name="tawuniya_quotation_recived"
                                                                    // value={values.tawuniya.quotation_recived}
                                                                    onChange={(e: any) => { console.log("recive :", e.target.value); this.setState({ tawuniya_quotation_recived: e.target.value })}}
                                                                // error={this.state.tawuniya_quotation_recived ? false : true}
                                                                >
                                                                    <FormControlLabel value={enumYesNO.YES} control={<Radio color="primary" />} label="Yes" />
                                                                    <FormControlLabel value={enumYesNO.NO} control={<Radio  color="primary" />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <LabelWithIcon label={'Quotation amount'} />

                                                            <TextInput
                                                                id={"tawuniya_quotation_amount"}
                                                                className={classes.textInputStyle}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="tawuniya_quotation_amount"
                                                                type="text"
                                                                disabled={true}
                                                                data-test-id="customerNameTxtInput"
                                                            />
                                                            {/* {touched.customerName && errors.customerName ? (
                                                                <Typography color="error" >{errors.customerName}</Typography>
                                                            ) : null} */}
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <LabelWithIcon label={'Proposal'} />
                                                            <TextInput
                                                                id={"tawuniya_proposal"}
                                                                className={`${classes.textInputStyle} ${classes.fileInput}`}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="tawuniya_proposal"
                                                                type="text"
                                                                disabled={true}
                                                                data-test-id="customerNameTxtInput"
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <LabelWithIcon label={'Comment'} />
                                                            <TextInput
                                                                id={"tawuniya_comment"}
                                                                className={classes.textInputStyle}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="tawuniya_comment"
                                                                type="text"
                                                                disabled={true}
                                                                data-test-id="customerNameTxtInput"
                                                                multiline
                                                                rows={6}
                                                                maxRows={10}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <hr className={classes.lineSaprator} />


                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={4}>
                                                            <FormControl>
                                                                <LabelWithIcon label={'Release quotation to customer'} />
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    defaultValue={enumYesNO.YES}
                                                                    // name="tawuniya_release_quotation_to_customer"
                                                                    // value={values.tawuniya.release_quotation_to_customer}
                                                                    // onChange={handleChange}
                                                                    onChange={(e: any) => this.setState({ tawuniya_release_quotation_to_customer : e.target.value })}
                                                                >
                                                                    <FormControlLabel value={enumYesNO.YES} control={<Radio  color="primary" />} label="Yes" />
                                                                    <FormControlLabel value={enumYesNO.NO} control={<Radio  color="primary" />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <LabelWithIcon label={'Additional attachment'} />
                                                            {/* <TextInput
                                                                id={"tawuniya_additional_attachment"}
                                                                className={`${classes.textInputStyle} ${classes.fileInput}`}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="tawuniya_additional_attachment"
                                                                type="text"
                                                                // disabled={!this.state.enableEditing}
                                                                data-test-id="customerNameTxtInput"
                                                            /> */}
                                                            <FileUpload
                                                                fileName="saudiBank_additional_attachment"
                                                                // isEditPage={this.state.isEdit}
                                                                filePath={values.tawuniya_additional_attachment || ""}
                                                                data-test-id="tawuniya_additional_attachment"
                                                                // disabled={!this.state.enableEditing}
                                                                inputName={`tawuniya_additional_attachment`}
                                                                onChange={(event: any) => setFieldValue(`tawuniya_additional_attachment`, event.target.files[0])}
                                                                onRemove={() => setFieldValue(`tawuniya_additional_attachment`, {})}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <LabelWithIcon label={'Note to the customer'} />
                                                            <TextInput
                                                                id={"tawuniya_note_to_the_customer"}
                                                                className={classes.textInputStyle}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="tawuniya_note_to_the_customer"
                                                                type="text"
                                                                // disabled={!this.state.enableEditing}
                                                                data-test-id="customerNameTxtInput"
                                                                multiline
                                                                rows={6}
                                                                maxRows={10}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>


                                        {/* <Accordion className={this.state.saudiBank_error ? classes.errorstyle : ''}>
                                            <AccordionSummary
                                                aria-expanded={true}
                                                expandIcon={<ExpandMore />}
                                                aria-controls="Insurers"
                                                id="Insurers"
                                            >
                                                <AccordionTitle title='Saudi Bank' />
                                            </AccordionSummary>
                                            <AccordionDetails style={{ width: '100%' }}>

                                                <div style={{ width: '100%' }}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={4}>
                                                            <FormControl disabled={true}>
                                                                <LabelWithIcon label={'Quotation received?'} />
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    name="saudiBank_quotation_recived"
                                                                    defaultValue={enumYesNO.YES}
                                                                    // value={values.tawuniya.quotation_recived}
                                                                    // onChange={handleChange}
                                                                    onChange={(e: any) => this.setState({ saudiBank_quotation_recived: e.target.value })}
                                                                >
                                                                    <FormControlLabel value={enumYesNO.YES} control={<Radio  color="primary" />} label="Yes" />
                                                                    <FormControlLabel value={enumYesNO.NO} control={<Radio  color="primary" />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <LabelWithIcon label={'Comment'} />
                                                            <TextInput
                                                                id={"saudiBank_comment"}
                                                                className={classes.textInputStyle}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="saudiBank_comment"
                                                                type="text"
                                                                disabled={true}
                                                                data-test-id="customerNameTxtInput"
                                                                multiline
                                                                rows={6}
                                                                maxRows={10}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <hr className={classes.lineSaprator} />


                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={4}>
                                                            <FormControl>
                                                                <LabelWithIcon label={'Release quotation to customer'} />
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    defaultValue={enumYesNO.YES}
                                                                    // name="saudiBank_release_quotation_to_customer"
                                                                    // value={values.tawuniya.release_quotation_to_customer}
                                                                    // onChange={handleChange}
                                                                    onChange={(e: any) => this.setState({ saudiBank_release_quotation_to_customer: e.target.value })}
                                                                >
                                                                    <FormControlLabel value={enumYesNO.YES} control={<Radio  color="primary" />} label="Yes" />
                                                                    <FormControlLabel value={enumYesNO.NO} control={<Radio  color="primary" />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <LabelWithIcon label={'Additional attachment'} />
                                                            <FileUpload
                                                                fileName="saudiBank_additional_attachment"
                                                                // isEditPage={this.state.isEdit}
                                                                filePath={values.saudiBank_additional_attachment || ""}
                                                                data-test-id="saudiBank_additional_attachment"
                                                                // disabled={!this.state.enableEditing}
                                                                inputName={`saudiBank_additional_attachment`}
                                                                onChange={(event: any) => setFieldValue(`saudiBank_additional_attachment`, event.target.files[0])}
                                                                onRemove={() => setFieldValue(`saudiBank_additional_attachment`, {})}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <LabelWithIcon label={'Note to the customer'} />
                                                            <TextInput
                                                                id={"saudiBank_note_to_the_customer"}
                                                                className={classes.textInputStyle}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="saudiBank_note_to_the_customer"
                                                                type="text"
                                                                // disabled={!this.state.enableEditing}
                                                                data-test-id="customerNameTxtInput"
                                                                multiline
                                                                rows={6}
                                                                maxRows={10}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion className={this.state.axaBank_error ? classes.errorstyle : ''}>
                                            <AccordionSummary
                                                aria-expanded={true}
                                                expandIcon={<ExpandMore />}
                                                aria-controls="Insurers"
                                                id="Insurers"
                                            >
                                                <AccordionTitle title='Axa Bank' />
                                            </AccordionSummary>
                                            <AccordionDetails style={{ width: '100%' }}>

                                                <div style={{ width: '100%' }}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={4}>
                                                            <FormControl disabled={true}>
                                                                <LabelWithIcon label={'Quotation received?'} />
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    defaultValue={enumYesNO.YES}
                                                                    // name="axaBank_quotation_recived"
                                                                    // value={values.tawuniya.quotation_recived}
                                                                    // onChange={handleChange}
                                                                    onChange={(e: any) => this.setState({ axaBank_quotation_recived: e.target.value })}
                                                                >
                                                                    <FormControlLabel value={enumYesNO.YES} control={<Radio  color="primary" />} label="Yes" />
                                                                    <FormControlLabel value={enumYesNO.NO} control={<Radio  color="primary" />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <LabelWithIcon label={'Quotation amount'} />

                                                            <TextInput
                                                                id={"axaBank_quotation_amount"}
                                                                className={classes.textInputStyle}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="axaBank_quotation_amount"
                                                                type="text"
                                                                disabled={true}
                                                                data-test-id="customerNameTxtInput"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <LabelWithIcon label={'Proposal'} />
                                                            <TextInput
                                                                id={"axaBank_proposal"}
                                                                className={`${classes.textInputStyle} ${classes.fileInput}`}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="axaBank_proposal"
                                                                type="text"
                                                                disabled={true}
                                                                data-test-id="customerNameTxtInput"
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <LabelWithIcon label={'Comment'} />
                                                            <TextInput
                                                                id={"axaBank_comment"}
                                                                className={classes.textInputStyle}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="axaBank_comment"
                                                                type="text"
                                                                disabled={true}
                                                                data-test-id="customerNameTxtInput"
                                                                multiline
                                                                rows={6}
                                                                maxRows={10}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    <hr className={classes.lineSaprator} />


                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={4}>
                                                            <FormControl>
                                                                <LabelWithIcon label={'Release quotation to customer'} />
                                                                <RadioGroup
                                                                    row
                                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                                    defaultValue={enumYesNO.YES}
                                                                    // name="axaBank_release_quotation_to_customer"
                                                                    // value={values.tawuniya.release_quotation_to_customer}
                                                                    // onChange={handleChange}
                                                                    onChange={(e: any) => this.setState({ axaBank_release_quotation_to_customer: e.target.value })}
                                                                >
                                                                    <FormControlLabel value={enumYesNO.YES} control={<Radio  color="primary" />} label="Yes" />
                                                                    <FormControlLabel value={enumYesNO.NO} control={<Radio  color="primary" />} label="No" />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <LabelWithIcon label={'Additional attachment'} />

                                                            <FileUpload
                                                                fileName="axaBank_additional_attachment"
                                                                // isEditPage={this.state.isEdit}
                                                                filePath={values.axaBank_additional_attachment || ""}
                                                                data-test-id="axaBank_additional_attachment"
                                                                // disabled={!this.state.enableEditing}
                                                                inputName={`axaBank_additional_attachment`}
                                                                onChange={(event: any) => setFieldValue(`axaBank_additional_attachment`, event.target.files[0])}
                                                                onRemove={() => setFieldValue(`axaBank_additional_attachment`, {})}
                                                            />
                                                            
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <LabelWithIcon label={'Note to the customer'} />
                                                            <TextInput
                                                                id={"axaBank_note_to_the_customer"}
                                                                className={classes.textInputStyle}
                                                                isArabicLanguage={this.state.isArabicLanguage}
                                                                name="axaBank_note_to_the_customer"
                                                                type="text"
                                                                // disabled={!this.state.enableEditing}
                                                                data-test-id="customerNameTxtInput"
                                                                multiline
                                                                rows={6}
                                                                maxRows={10}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </AccordionDetails>


                                        </Accordion> */}



                                        <div style={{ padding: '15px', textAlign: 'left' }}>
                                            <FormControl>
                                                <LabelWithIcon label={'Release premium calculation'} />
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    // name="release_premium_calculation"
                                                                    defaultValue={enumYesNO.YES}
                                                    onChange={(e: any) => this.setState({ release_premium_calculation: e.target.value })}
                                                >
                                                    <FormControlLabel value={enumYesNO.YES} control={<Radio  color="primary" />} label="Yes" />
                                                    <FormControlLabel value={enumYesNO.NO} control={<Radio  color="primary" />} label="No" />
                                                </RadioGroup>
                                            </FormControl>

                                            <FormControl>
                                                <LabelWithIcon label={'Release comparison sheet'} />
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="comparison_sheet"
                                                    defaultValue={enumYesNO.YES}
                                                    onChange={(e: any) => this.setState({ comparison_sheet: e.target.value })}
                                                >
                                                    <FormControlLabel value={enumYesNO.YES} control={<Radio color="primary"  />} label="Yes" />
                                                    <FormControlLabel value={enumYesNO.NO} control={<Radio  color="primary" />} label="No" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </div>

                                </AccordionDetails>
                                <button onClick={() => this.checkError(values)} type='submit'>Submit btn</button>
                            </Accordion>
                        </form>
                    )}


                </Formik>
            </div>
        )
    }
}

StageFive.propTypes = {
    classes: PropTypes.object.isRequired,
    // formType: PropTypes.string.isRequired,
    // changeEdit: PropTypes.string.isRequired,
    // params: PropTypes.string.isRequired,
};

export default withStyles(useStyles)(StageFive)





// Hello Builder Support team, 

// On my last billing cycle total hours was "157:59:37" but my PM only approved the "78", He is saying there was delay in the sprint delivery... but there serveral reason for that... I have told all the reason to the PM alreday... still they have cut-off my almost "50%" hours. My manger is asking you're working on not... Even I have worked on the off day and holiday to complete the sprint and all my tickets. If you see my previous record of the tickets. I have move all my tickets of "accpet" stage with QA pass in the trakker.

// This is not only for this billing cycle. Previously my PM has cutted the 25 Hours from the total hours.... why every time my hours is cutting off? even I'm trying hard... If there is sprint deley then there is the reason for like MR is taking the time to get merged... previous QA person not moved my tickets to "accept", He never told me that this is the bug wich I need to work... I need strick action on this... I don't want my hours to be cutting off evey time... I need to give the answer to my manger... and it's affecting to my profile as well which is not acceptable for me.

// I'm atteching the screen short of the total hours and tickets.

// And please give the proper reason for cutting hours.

// done?



// 5) sales review 
// Need to pass policy_request_id & stage =5
// {
//     "data": {
//         "id": "9",
//         "type": "releasing_to_customer",
//         "attributes": {
//             "release_premium_calculation": true,
//             "comparison_sheet": true,
//             "policy_request_id": 6034,
//             "release_insurance_infos": {
//                 "data": [
//                     {
//                         "id": "8",
//                         "type": "release_insurance_info",
//                         "attributes": {
//                             "release_quotation_to_customer": true,
//                             "note_to_the_customer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
//                             "releasing_to_customer_id": 9,
//                             "insurance_company_id": 1,
//                             "submitting_insurance_info_id": 9
//                         }
//                     }
//                 ]
//             }
//         }
//     }
// }