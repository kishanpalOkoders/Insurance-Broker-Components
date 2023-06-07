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
import CustomButton from './Components/CustomButton'
import Toster from './Components/Toster'

export const useStyles: any = (theme: any) => ({
    accordionWrapper: {
        width: '100%',
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
        '& fieldset': {
            borderStyle: 'dashed',
        }
    },
    radioFormControl: {
        display: 'block',
    },
    flexDirection:{
        flexDirection: 'column'
    },
    BtnGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 15px'
    },
    buttonsRightWrapper:{
        display: 'flex',
        gap: '15px',
        padding: '15px 0px',
        justifyContent: 'flex-end'
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
    quotation_received: 'quotation_received',
    quotation_amount: 'quotation_amount',
    comment: 'comment',
    proposal: 'proposal',
    additional_attachment: 'additional_attachment',
    note_to_the_customer: 'note_to_the_customer',
    release_quotation_to_customer: 'release_quotation_to_customer',
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

const enumFormDataKeys = {
    note_to_the_customer: 'note_to_the_customer',
    release_quotation_to_customer: 'release_quotation_to_customer',
    insurance_company_id: 'insurance_company_id'
}

const enumTosterType = {
    error: "error",
    success: 'success',
    warning: 'warning',
    info: 'info',
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

type Severity = "error" | "success" | "info" | "warning" | undefined;

type MyState = {
    isEdit: false,
    isArabicLanguage: false,
    quotation_received: string,
    quotation_amount: string,
    comment: string,
    proposal: string,
    release_quotation_to_customer: string,
    additional_attachment: any,
    note_to_the_customer: string,

    release_premium_calculation: string,
    comparison_sheet: string,
    toster:boolean,
    tosterType:any,
    tosterText: string,
    blockError: boolean[],
    previousStageData: any,
};

type MyProps = {
    params: any,
    formType: string,
    changeEdit: () => void,
};

const lastStageDate = {
    data: {
        id: 1,
        type: 'submitting_quotation',
        attributes: {
            policy_request_id: 1,
            submitting_insurance_infos: {
                data: [
                    {
                        id: 1,
                        type: 'submitting_insurance_info',
                        attributes: {
                            quotation_received: true,
                            quotation_id: '102398ecalskdjf',
                            date_of_receiving_quotation: '2023-04-12',
                            quotation_amount: 'SAR 123,123',
                            comment: 'fdksnfhn kfhejks fkdngjdk gerfmrkgjhf fwiornhenm',
                            insurance_company_id: 86,
                            submitting_quotation_id: 1,
                            proposal: 'https://minio.b300102.dev.eastus.az.svc.builder.cafe/sbucket/2i8jo8y61zf94wv490t7tsi0zvmp?response-content-disposition=inline%3B%20filename%3D%22index.jpeg%22%3B%20filename%2A%3DUTF-8%27%27index.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230602%2Fdefault%2Fs3%2Faws4_request&X-Amz-Date=20230602T073349Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=fa0b3eb9a2fef45faa31773bd7eb6cd01194744cdfe501c91c43f4a4e2f0de63',
                        }
                    },
                    {
                        id: 1,
                        type: 'submitting_insurance_info',
                        attributes: {
                            quotation_received: true,
                            quotation_id: '102398ecalskdjf',
                            date_of_receiving_quotation: '2023-04-12',
                            quotation_amount: 'SAR 123,123',
                            comment: 'kp saini kfhejks fkdngjdk gerfmrkgjhf fwiornhenm',
                            insurance_company_id: 86,
                            submitting_quotation_id: 1,
                            proposal: 'https://minio.b300102.dev.eastus.az.svc.builder.cafe/sbucket/2i8jo8y61zf94wv490t7tsi0zvmp?response-content-disposition=inline%3B%20filename%3D%22index.jpeg%22%3B%20filename%2A%3DUTF-8%27%27index.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230602%2Fdefault%2Fs3%2Faws4_request&X-Amz-Date=20230602T073349Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=fa0b3eb9a2fef45faa31773bd7eb6cd01194744cdfe501c91c43f4a4e2f0de63',
                        }
                    },
                    {
                        id: 1,
                        type: 'submitting_insurance_info',
                        attributes: {
                            quotation_received: true,
                            quotation_id: '102398ecalskdjf',
                            date_of_receiving_quotation: '2023-04-12',
                            quotation_amount: 'SAR 123,123',
                            comment: 'kp saini kfhejks fkdngjdk gerfmrkgjhf fwiornhenm',
                            insurance_company_id: 86,
                            submitting_quotation_id: 1,
                            proposal: 'https://minio.b300102.dev.eastus.az.svc.builder.cafe/sbucket/2i8jo8y61zf94wv490t7tsi0zvmp?response-content-disposition=inline%3B%20filename%3D%22index.jpeg%22%3B%20filename%2A%3DUTF-8%27%27index.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230602%2Fdefault%2Fs3%2Faws4_request&X-Amz-Date=20230602T073349Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=fa0b3eb9a2fef45faa31773bd7eb6cd01194744cdfe501c91c43f4a4e2f0de63',
                        }
                    },
                ]
            },
            premium_calculation: '',
            comparison_sheet: '',
        }
    }
}

class StageFiveNew extends Component<MyProps, MyState> {
    static propTypes: { classes: any; };
    formRef: any;
    constructor(props: any) {
        super(props);
        // console.log(this.props.match.params.id)
        // this.handleStorage = this.handleStorage.bind(this);
        this.state = {
            isEdit: false,
            isArabicLanguage: false,
            quotation_received: enumYesNO.YES,
            quotation_amount: 'asdasd',
            comment: 'asdasd',
            proposal: 'asdasdda',
            additional_attachment: '',

            note_to_the_customer: '',
            release_quotation_to_customer: enumYesNO.YES,

            release_premium_calculation: enumYesNO.YES,
            comparison_sheet: enumYesNO.YES,
            blockError: [],
            toster: false,
            tosterText: '',
            tosterType: enumTosterType.error,
            previousStageData: {},
        };
        this.formRef = React.createRef();
        this.formRef.current = [];
    }

    componentDidMount(): void {
        // lastStageDate?.data?.attributes?.submitting_insurance_infos?.data.map()
        // const arrLength = lastStageDate?.data?.attributes?.submitting_insurance_infos?.data?.length;
        // this.formRef.current = this.formRef?.current.slice(0, arrLength);

        this.setState({previousStageData: lastStageDate})

        // if (this.formRef.current.length !== arrLength) {
        //     // add or remove refs
        //     this.formRef.current = Array(arrLength).fill().map((_, i) => this.formRef.current[i] || React.createRef());
        //   }
    }

    componentDidUpdate(prevProps: any) {
        //Typical usage, don't forget to compare the props
        console.log('componentDidUpdate :', prevProps)
        // if (this.props.userName !== prevProps.userName) {
        //   this.fetchData(this.props.userName);
        // }
    }

    getFormikValues = () => {
        console.log("this.formRef.current", this?.formRef.current)
        const formikValues = this.formRef.current
        return formikValues
    }

    checkError = (value: any) => {

            const temp = [...this.state.blockError]
            let isError = false;
            value?.map((obj:any, index:number) => {
                value[index].handleSubmit();
                console.log("checkError :", obj, obj.values, this.state.blockError)
                if(obj.values['note_to_the_customer'] === '' || obj.values['additional_attachment'] === '' ){
                    temp[index] = true
                    this.setState({tosterText: 'Please fill all required feilds'})
                    this.setState({toster: true})
                    isError = true
                }else{
                    temp[index] = false
                }
                
            })
            this.setState({ blockError: temp }, () => {
                console.log("this.state.blockError",this.state.blockError)
            })

            return isError;

    }

    checkOnChangeError = (values:any, index:number) => {
        const temp = [...this.state.blockError]

        temp[index] = false
        // if(values['note_to_the_customer'] === '' || values['additional_attachment'] === '' ){
        //     temp[index] = true
        // }else{
        //     temp[index] = false
        // }
        this.setState({ blockError: temp })

    }

    handleOnChange = (values: any, index:number) => {
        console.log('handleOnChange', values, index)
        this.checkOnChangeError(values, index)
    }

    formDataFormat = (values:any) => {
        const formData = new FormData();
        const temp = [...values]

        temp?.map((item: any, index: number) => {
            formData.append(`data[releasing_to_customer][release_insurance_infos_attributes]${[index]}[release_quotation_to_customer]`, item.values.release_quotation_to_customer)
            formData.append(`data[releasing_to_customer][release_insurance_infos_attributes]${[index]}[note_to_the_customer]`, item.values.note_to_the_customer)
            formData.append(`data[releasing_to_customer][release_insurance_infos_attributes]${[index]}[insurance_company_id]`, item.values.insurance_company_id)
        })

        formData.append(`data[releasing_to_customer][release_premium_calculation]`, this.state.release_premium_calculation)
        formData.append(`data[releasing_to_customer][comparison_sheet]`, this.state.comparison_sheet)
      
        return formData;
    }

    handleSubmit = () => {
        const formikValues = this.getFormikValues();
        const isError = this.checkError(formikValues)

        const formData = this.formDataFormat(formikValues);
        console.log("formikValues handleSubmit: 1 ", formikValues)

        if(!isError){
            fetch("https://insurancebroker-300102-ruby.b300102.dev.eastus.az.svc.builder.cafe/bx_block_policy_request/policy_requests?stage=5&id=1  ", {
                method: 'POST',
                headers: {
                    // "Content-Type": "application/json",
                    "token": 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjAzLCJleHAiOjE2ODU5NTkyODUsInRva2VuX3R5cGUiOiJsb2dpbiJ9.d8k7YoDGi_nkap6EXNWUHNLUA5J0N3rAKP8iumP-wfjRgw6_WIcIFCbU_YFVPtUZKLLfdwQJ6UDmj-TtcIx9oA'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            }).then((res) => {
                console.log("api res :", res)
                // this.setState({showSuccessToster: true})
                // this.setState({successTosterText: 'Insurer Added'})
            });
        }
    }


    render() {
        const { classes }: any = this.props;
        return (
            <div>
                <Toster
                    tosterText={this.state.tosterText}
                showToster={this.state.toster}
                tosterType={this.state.tosterType} // error, success, warning, info
                handleCloseToster={() => this.setState({toster : false})}
                />
                <Accordion>
                    <AccordionSummary
                        aria-expanded={true}
                        expandIcon={<ExpandMore />}
                        aria-controls="Insurers"
                        id="Insurers"
                    >
                        <AccordionTitle title='Releasing to customer' />
                    </AccordionSummary>
                    <AccordionDetails className={classes.flexDirection}>
                        {
                            this.state.previousStageData?.data?.attributes?.submitting_insurance_infos?.data?.map((item:any, index:number) => (
                                <div key={index}>
                                <Formik
                                    // innerRef={this.formRef[index]}
                                    innerRef={(element) => {
                                        this.formRef.current[index] = element;
                                      }}
                                    enableReinitialize={this.state.isEdit ? true : false}
                                    initialValues={{
                                        quotation_received: item?.attributes?.quotation_received,
                                        quotation_amount: item?.attributes?.quotation_amount,
                                        comment: item?.attributes?.comment,
                                        proposal: item?.attributes?.proposal,
                                        additional_attachment: '',
                                        note_to_the_customer: '',
                                        release_quotation_to_customer: this.state.release_quotation_to_customer,
                                        insurance_company_id: item?.attributes?.insurance_company_id,
                                        // release_premium_calculation: this.state.release_premium_calculation,
                                        // comparison_sheet: this.state.comparison_sheet,
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
                                        <form className={classes.accordionWrapper} onSubmit={handleSubmit} onChange={() => this.handleOnChange(values, index)}>

                                            <div className={classes.childAccordion}>
                                                <Accordion className={this.state.blockError[index] ? classes.errorstyle : ''}>
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

                                                        <div style={{ width: '100%' }}>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={12} sm={4}>
                                                                    <FormControl disabled={true} className={classes.radioFormControl}>
                                                                        <LabelWithIcon label={'Quotation received?'} />
                                                                        <RadioGroup
                                                                            row
                                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                                            defaultValue={item?.attributes?.quotation_received ? enumYesNO.YES : enumYesNO.NO}
                                                                            // name="quotation_received"
                                                                            // value={values.tawuniya.quotation_recived}
                                                                            onChange={(e: any) => { console.log("recive :", e.target.value); this.setState({ quotation_received: e.target.value }) }}
                                                                        // error={this.state.quotation_received ? false : true}
                                                                        >
                                                                            <FormControlLabel value={enumYesNO.YES} control={<Radio color="primary" />} label="Yes" />
                                                                            <FormControlLabel value={enumYesNO.NO} control={<Radio color="primary" />} label="No" />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12} sm={4}>
                                                                    <LabelWithIcon label={'Quotation amount'} />

                                                                    <TextInput
                                                                        id={"quotation_amount"}
                                                                        className={classes.textInputStyle}
                                                                        isArabicLanguage={this.state.isArabicLanguage}
                                                                        name="quotation_amount"
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
                                                                        id={"proposal"}
                                                                        className={`${classes.textInputStyle} ${classes.fileInput}`}
                                                                        isArabicLanguage={this.state.isArabicLanguage}
                                                                        name="proposal"
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
                                                                        id={"comment"}
                                                                        className={classes.textInputStyle}
                                                                        isArabicLanguage={this.state.isArabicLanguage}
                                                                        name="comment"
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
                                                                            // name="release_quotation_to_customer"
                                                                            // value={values.tawuniya.release_quotation_to_customer}
                                                                            // onChange={handleChange}
                                                                            onChange={(e: any) => setFieldValue('release_quotation_to_customer', e.target.value)}
                                                                        >
                                                                            <FormControlLabel value={enumYesNO.YES} control={<Radio color="primary" />} label="Yes" />
                                                                            <FormControlLabel value={enumYesNO.NO} control={<Radio color="primary" />} label="No" />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={12} sm={4}>
                                                                    <LabelWithIcon label={'Additional attachment'} />
                                                                    <FileUpload
                                                                        fileName="saudiBank_additional_attachment"
                                                                        // isEditPage={this.state.isEdit}
                                                                        filePath={values.additional_attachment || ""}
                                                                        data-test-id="additional_attachment"
                                                                        // disabled={!this.state.enableEditing}
                                                                        inputName={`additional_attachment`}
                                                                        onChange={(event: any) => setFieldValue(`additional_attachment`, event.target.files[0])}
                                                                        onRemove={() => setFieldValue(`additional_attachment`, {})}
                                                                    />
                                                                </Grid>
                                                            </Grid>

                                                            <Grid container spacing={3}>
                                                                <Grid item xs={12}>
                                                                    <LabelWithIcon label={'Note to the customer'} />
                                                                    <TextInput
                                                                        id={"note_to_the_customer"}
                                                                        className={classes.textInputStyle}
                                                                        isArabicLanguage={this.state.isArabicLanguage}
                                                                        name="note_to_the_customer"
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

                                            </div>

                                        </form>
                                    )}
                                </Formik>
                                </div>
                            ))
                        }
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
                    </AccordionDetails>
                </Accordion>



               


                {/* <button onClick={() => this.checkError(values)} type='submit'>Submit btn</button> */}
                {/* <button type='submit' onClick={this.handleSubmit}>Submit btn</button> */}

                <div className={classes.BtnGroup}>
                    <div>
                     <CustomButton
                        btnText='Mark as Lost'
                        onClick={this.handleSubmit}
                        // bgColor='#0090a1'
                        textColor='#0090a1'
                     />
                    </div>
                    <div className={classes.buttonsRightWrapper}>
                     <CustomButton
                        btnText='Save Draft'
                        onClick={this.handleSubmit}
                        // bgColor='#0090a1'
                        textColor='#0090a1'
                     />
                     <CustomButton
                        btnText='Reject'
                        onClick={this.handleSubmit}
                        // bgColor='#0090a1'
                        textColor='#0090a1'
                     />
                     <CustomButton
                        btnText='Next Stage'
                        onClick={this.handleSubmit}
                        bgColor='linear-gradient(to bottom, #2d6f8f, #4fb7ba)'
                        textColor='#fff'
                     />
                    </div>
                </div>

            </div>
        )
    }
}

StageFiveNew.propTypes = {
    classes: PropTypes.object.isRequired,
    // formType: PropTypes.string.isRequired,
    // changeEdit: PropTypes.string.isRequired,
    // params: PropTypes.string.isRequired,
};

export default withStyles(useStyles)(StageFiveNew)

