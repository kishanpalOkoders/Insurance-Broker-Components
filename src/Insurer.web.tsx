import React, { Component, useState } from 'react';
import { makeStyles, createStyles, Grid, Button, TextField, Accordion, AccordionDetails, AccordionSummary, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, InputAdornment, Snackbar } from '@material-ui/core';
import { ArrowBackIosSharp, ExpandMore, MoreVert } from '@material-ui/icons';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
// import CustomDataTable from '/Components/CustomDataTable'
import { createBrowserHistory } from 'history';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import InsurerOverview from './Components/Insurer/InsurerOverview.web'
import SiibCommissionRate from './Components/Insurer/SiibCommissionRate.web'
import MedicalInsurance from './Components/Insurer/MedicalInsurance.web'
import MotorInsurance from './Components/Insurer/MotorInsurance.web'
import Contact from './Components/Insurer/Contact.web'
import UploadAttachedment from './Components/Insurer/UploadAttachedment.web'
import LabelWithIcon from './Components/LabelWithIcon';
import imageCompression from 'browser-image-compression';
import { Alert } from '@material-ui/lab';
import ConfirmationDialog from './Components/ConfirmationDialog.web';
import {useParams} from 'react-router-dom';




export const useStyles: any = (theme: any) => ({
    accordionWrapper: {
        padding: '0px 15px',
        '& .MuiAccordion-root': {
            backgroundColor: '#fff',
            margin: '15px 0px'
        }
    },
    btnStyle: {
        background: "linear-gradient(to bottom, #2d6f8f, #4fb7ba)",
        "color": "white",
        // "height": "50px",
        borderRadius: "10px",
        paddingLeft: "10px",
        paddingRight: "10px"
    },
    headerButtonStyle: {
        display: "flex",
        justifyContent: "end"
    },
    dialogBtnWrapper: {
        justifyContent: 'center',
        marginBottom: '15px',
        textAlign: 'right',
        '@media(min-width: 500px)': {
            '& button': {
                padding: '12px 78px',
            }
        },
    },
    dialogBtnCancel: {
        color: 'rgb(0 0 0 / 54%)',
        textTransform: 'capitalize',
        margin: '0px 15px',
        borderRadius: '15px',
    },
    dialogBtnSave: {
        backgroundColor: '#45a3ad',
        textTransform: 'capitalize',
        borderColor: '#45a3ad',
        color: '#fff',
        "&:hover": {
            backgroundColor: '#45a3ad',
        }
    },
    addCmp: {
        '& > div': {
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 700,
        },
        '& > p': {
            color: 'rgba(0, 0, 0, 0.87)',
        }
    },
    accordionDetailsWrapper: {
        display: 'block',
        textAlign: 'right',
        '& > svg': {
            color: '#2f2f2f',
            cursor: 'pointer'
        }
    },
    lineSaprator: {
        backgroundColor: '#e2e2e2',
        height: '1.3px',
        width: '100%',
        margin: '18px 0px'
    },
    inputFile: {
        // '& input[type="file"]::file-selector-button':{
        //     display: 'none',
        // },
        color: '#7f7f7f',
        '& fieldset': {
            border: '1px dashed rgba(0, 0, 0, 0.23) !important'
        },
        '& > div': {
            height: '40px',
            overflow: 'hidden',
        },
        '& input': {
            opacity: '0',
            position: 'absolute',
            left: '0px',
            right: '0px',
            maxWidth: '75%',
        },
        '& .MuiInputAdornment-positionEnd': {
            marginLeft: 'auto',
            position: 'absolute',
            right: '0px',
            '& > *': {
                background: '#fff',
            }
        }
    },
    errorstyle: {
        border: '1px solid red !important'
    },
    editWrapper:{
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 15px',
        paddingTop: '15px',
        '& button': {
            padding: '15px 0px',
            width: '150px',
            borderColor: '#3b8da2',
            borderRadius: '15px',
            textTransform: 'capitalize',
        }
    },
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
    }

})

type medicalInsuranceDataType = {
    id?: number,
    insurance_company_id?: number
    insurance_class: string,
    class_benefits: string,

}


const emumMedicalInsuranc = {
    insurance_class: 'insurance_class',
    class_benefits: 'class_benefits',
}

const enumErrorsState = {
    siib_comission_rate_error: 'siib_comission_rate_error',
    medical_insurances_attributes_error: 'medical_insurances_attributes_error',
    motor_insurance_attributes_error: 'motor_insurance_attributes_error',
    insurance_contacts_attributes_error: 'insurance_contacts_attributes_error',
    documents_attributes_error: 'documents_attributes_error',
}

const enumUploadAttachedment = {
    name: 'name',
    comment: 'comment',
}

const enumAccordianBox = {
    medical : 'medical',
    contacts : 'contacts'
}


type contactsType = {
    first_name: string,
    last_name: string,
    position: string,
    phone_number: string,
    email: string,
}

const enumMotorInsurance = {
    insurance_class: "insurance_class",
    hcv_minimum_excess: "hcv_minimum_excess",
    lcv_minimum_execess: "lcv_minimum_execess",
    motor_premium: "motor_premium",
    motor_premium_minimum_value: "motor_premium_minimum_value",
    pickup_minimum_execess: "pickup_minimum_execess",
    sedan_suv_minimum_excess: "sedan_suv_minimum_excess",
    van_minimum_excess: "van_minimum_excess",
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

type documentUploadType = {
    name: string,
    comment: string,
    insurance_document: any,
}

type errorsType = {
    siib_comission_rate_error: boolean,
    medical_insurances_attributes_error: boolean,
    motor_insurance_attributes_error: boolean,
    insurance_contacts_attributes_error: boolean,
    documents_attributes_error: boolean,
}

type MyProps = {
    params:any,
    formType: string,
    changeEdit: () => void,
};
type MyState = {
    insuranceData: any,
    siib_comission_rate: any,
    // motor_insurance: motorInsuranceDataType | {},
    motor_insurance: any,
    // medical_insurances: medicalInsuranceDataType[],
    medical_insurances: any,
    // insurance_contacts: contactsType[],
    insurance_contacts: any,
    documents: documentUploadType[],
    errorSates: errorsType,
    checkErrors: boolean,
    showToster: boolean,
    showSuccessToster: boolean,
    successTosterText: string,
    openConfirmationDialog: boolean,
    dialogType: string,
    headingText: string,
    paragraphText: string,
    dialogItemIndex: number,
    openFormSave: boolean,
    formDialogHeadingText: string,
    formDialogParagraphText: string,
    formType: string,
    formDialogBtnOkText:string,
    formDialogBtnCancelText:string,
    leaveForm: boolean,
};


type accordionTitleProps = {
    title: string,
    insuranceData: any,
}

const enumFormAction = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
}


const AccordionTitle = (props: accordionTitleProps) => {
    const classes = useStylesFunction()
    return (
        <Typography className={classes.accordianHeading}>
            {props?.title}
            {
                props?.insuranceData === null ? (
                    <div className={classes.lockedAccordion}>
                        <LockIcon /> Please select insurance type to unlock  this fields
                    </div>
                ) : null
            }

        </Typography>
    )
}

const editData = {
    // data: {
    //     id: "13",
    //     type: "insurance_company",
    //     attributes: {
    //         id: 13,
    //         insurer_id: "I-000013",
    //         legal_name: "kp saini",
    //         short_name: "adsadasdas",
    //         address: "delhi",
    //         vat_number: "3223233333",
    //         bank_name: "asdsdaasdasd",
    //         swift_code: "3223233333",
    //         account_number: 3223233333333,
    //         iban: "3223233333",
    //         segment: [
    //             {
    //                 value: "Mega KA",
    //                 label: "Mega KA"
    //             },
    //             {
    //                 value: "Corporate",
    //                 label: "Corporate"
    //             },
    //             {
    //                 value: "SME",
    //                 label: "SME"
    //             }
    //         ],
    //         siib_comission_rate: {
    //             Medical: "21",
    //             Motor: "23",
    //             Energy: "23"
    //         },
    //         types_of_insurance: [
    //             {
    //                 value: "Medical",
    //                 label: "Medical"
    //             },
    //             {
    //                 value: "Motor",
    //                 label: "Motor"
    //             },
    //             {
    //                 value: "Energy",
    //                 label: "Energy"
    //             }
    //         ],
    //         medical_insurances: {
    //             data: [
    //                 {
    //                     id: "11",
    //                     type: "medical_insurance",
    //                     attributes: {
    //                         id: 11,
    //                         insurance_class: "adsknaskdn",
    //                         class_benefits: "sdfdsfsdf",
    //                         insurance_company_id: 13
    //                     }
    //                 }
    //             ]
    //         },
    //         motor_insurance: {
    //             data: {
    //                 id: "11",
    //                 type: "motor_insurance",
    //                 attributes: {
    //                     id: 11,
    //                     insurance_class: "Comprehensive,TPL",
    //                     motor_premium: "22",
    //                     motor_premium_minimum_value: "sdf",
    //                     sedan_suv_minimum_excess: "sdf",
    //                     pickup_minimum_execess: "sdf",
    //                     van_minimum_excess: "sdf",
    //                     lcv_minimum_execess: "sfd",
    //                     hcv_minimum_excess: "sdf",
    //                     insurance_company_id: 13
    //                 }
    //             }
    //         },
    //         insurance_contacts: {
    //             data: [
    //                 {
    //                     id: "11",
    //                     type: "insurance_contact",
    //                     attributes: {
    //                         id: 11,
    //                         first_name: "sdf",
    //                         last_name: "fsd",
    //                         phone_number: "0000000000",
    //                         email: "ravi@mailinator.com",
    //                         position: "sfd",
    //                         insurance_company_id: 13
    //                     }
    //                 }
    //             ]
    //         },
    //         // documents: {
    //         //     data: []
    //         // }
    //     }
    // }
    data: {
        id: "29",
        type: "insurance_company",
        attributes: {
            id: 29,
            insurer_id: "I-000003",
            legal_name: "The new test insurance company",
            short_name: "test insurnace",
            address: "231 test, test, test",
            vat_number: "484u344783974893",
            bank_name: "saudi central bank",
            swift_code: "AAAA-BB-CC-123",
            account_number: 7438573975885858,
            iban: "AFD5 4838 4848 5958 8588",
            segment: [
                {
                    value: "Corporate",
                    label: "Corporate"
                },
                {
                    value: " SME",
                    label: " SME"
                }
            ],
            siib_comission_rate: {
                Medical: "20%",
                Motor: "10%",
                Life: "5%"
            },
            types_of_insurance: [
                {
                    value: "Medical",
                    label: "Medical"
                },
                {
                    value: "Motor",
                    label: "Motor"
                },
                {
                    value: "Energy",
                    label: "Energy"
                }
            ],
            medical_insurances: {
                data: [
                    {
                        id: "27",
                        type: "medical_insurance",
                        attributes: {
                            id: 27,
                            insurance_class: "VVRRFGDGDV",
                            class_benefits: "- Network name: VVIP\n- Max limit: SAR 500,000\n- Out patient: 20% MAX .75\n- Room: REG SUIT\n- Dental: SAR 2,000\n- Optical: SAR 400\n- Maternity: SAR 15,000",
                            insurance_company_id: 29
                        }
                    }
                ]
            },
            motor_insurance: {
                data: {
                    id: "44",
                    type: "motor_insurance",
                    attributes: {
                        id: 44,
                        insurance_class: "- Comprehensive\n- TPL",
                        motor_premium: "4%",
                        motor_premium_minimum_value: "SAR750.00",
                        sedan_suv_minimum_excess: "SAR1,200.00",
                        pickup_minimum_execess: "SAR1,200.00",
                        van_minimum_excess: "SAR1,500.00",
                        lcv_minimum_execess: "SAR1,850.00",
                        hcv_minimum_excess: "SAR3,000.00",
                        insurance_company_id: 29
                    }
                }
            },
            insurance_contacts: {
                data: [
                    {
                        id: "27",
                        type: "insurance_contact",
                        attributes: {
                            id: 27,
                            first_name: "Brian",
                            last_name: "Johson",
                            phone_number: "98765432",
                            email: "brian@johson.com",
                            position: "HR manager",
                            insurance_company_id: 29
                        }
                    },
                    {
                        id: "37",
                        type: "insurance_contact",
                        attributes: {
                            id: 37,
                            first_name: "Brian",
                            last_name: "Johson",
                            phone_number: "98765432",
                            email: "brian@johson.com",
                            position: "HR manager",
                            insurance_company_id: 29
                        }
                    },
                    {
                        id: "38",
                        type: "insurance_contact",
                        attributes: {
                            id: 38,
                            first_name: "Brian",
                            last_name: "Johson",
                            phone_number: "98765432",
                            email: "brian@johson.com",
                            position: "HR manager",
                            insurance_company_id: 29
                        }
                    },
                    {
                        id: "39",
                        type: "insurance_contact",
                        attributes: {
                            id: 39,
                            first_name: "Brian",
                            last_name: "Johson",
                            phone_number: "98765432",
                            email: "brian@johson.com",
                            position: "HR manager",
                            insurance_company_id: 29
                        }
                    }
                ]
            },
            documents: {
                data: []
            }
        }
    }
}

class Insurer extends Component<MyProps, MyState>{
    static propTypes: { classes: any;
        formType: any, changeEdit: any, params:any };
    constructor(props: any) {
        super(props);
        // console.log(this.props.match.params.id)
        // this.handleStorage = this.handleStorage.bind(this);
        this.state = {
            insuranceData: null,
            siib_comission_rate: {}, 
            // siib_comission_rate: {
            //     Medical: "21",
            //     Motor: "23",
            //     Energy: "23"
            // },
            medical_insurances: [
                {
                    insurance_class: '',
                    class_benefits: '',
                }
            ],
            motor_insurance: {},
            insurance_contacts: [
                {
                    first_name: '',
                    last_name: '',
                    position: '',
                    phone_number: '',
                    email: '',
                }
            ],
            documents: [],
            errorSates: {
                siib_comission_rate_error: false,
                medical_insurances_attributes_error: false,
                motor_insurance_attributes_error: false,
                insurance_contacts_attributes_error: false,
                documents_attributes_error: false,
            },
            checkErrors: false,
            showToster: false,
            showSuccessToster: false,
            successTosterText: '',
            openConfirmationDialog: false,
            dialogItemIndex: 0,
            dialogType: '',
            headingText: '',
            paragraphText: '',
            openFormSave: false,
            formDialogHeadingText: '',
            formDialogParagraphText: '',
            formType: enumFormAction.ADD,
            formDialogBtnOkText:'',
            formDialogBtnCancelText:'Cancel',
            leaveForm: false,
        };
    }

    componentDidMount(): void {
        const queryParameter: any = new URLSearchParams(window.location.search);
        const id: string = queryParameter?.get('id');
        // Insurer/InsurerDetail?id=32

        if (id) {
        //   this.getCustomerDetail(id)
            this.viewSetStates(id)
            this.setState({formType: enumFormAction.VIEW})
        }else{
            this.setState({formType: enumFormAction.ADD})
        }

        // console.log("useParams", id, this.props.params);
        console.log("adjakd :",id)

        // if(this.state.formType !== enumFormAction.ADD){
        //     /* istanbul ignore next */
        // }
    }

    viewSetStates = (id:string) => {
        const editObj = editData.data.attributes;
        const medical = [{...editObj['medical_insurances']['data'][0]['attributes']}]
        const contact = [{...editObj['insurance_contacts']['data'][0]['attributes']}]
        const motor:any = editObj['motor_insurance']['data']['attributes']

        console.log("motor :", motor['insurance_class'], editObj['siib_comission_rate'])
        if(!Array.isArray(motor['insurance_class'])){
            const arr =  motor['insurance_class'].split(",")
            const objOfArr:any = [];
            arr.map((item:string) => {
             objOfArr.push({ value: item, label: item })
            })
            motor['insurance_class'] = objOfArr;
        }

        const insurer:any =  {...editObj};
        if(Object.keys(insurer).length){
            delete insurer['medical_insurances']
            delete insurer['motor_insurance']
            // delete insurer['siib_comission_rate']
            delete insurer['insurance_contacts']

            insurer['documents'] && delete insurer['documents']
        }


        this.setState({ insuranceData : insurer })
        this.setState({ siib_comission_rate : editObj['siib_comission_rate'] })
        this.setState({ medical_insurances : medical})
        this.setState({ motor_insurance : editObj['motor_insurance']['data']['attributes'] })
        this.setState({ insurance_contacts : contact })
    }

    ItemRemoveFromArr = (state: any, index: number) => {
        const itemRemove = [...state]
        if (index > -1) { // only splice array when item is found
            itemRemove?.splice(index, 1); // 2nd parameter means remove one item only
        }
        return itemRemove;
    }

    handleRemoveError = (arr: any) => {
        let removeError = false;
        arr.map((item: any) => {
            for (const key in item) {
                if (item[key] !== '') {
                    removeError = true
                }
            }
        })
        return removeError;
    }

    handleRemoveErrorFromObj = (obj: any) => {
        let removeError = false;
        for (const key in obj) {
            if (obj[key] !== '') {
                removeError = true
            }
        }
        return removeError;
    }

    handleAddClass = (e: any) => {
        e.stopPropagation()
        console.log("sadghvagsdvgasdhgagdsv kp", e)
        const medicalCmp = {
            insurance_class: '',
            class_benefits: '',
        }
        this.setState((prevState: any) => ({
            medical_insurances: [...prevState.medical_insurances, medicalCmp]
        }))
        console.log("handleAddClass", this.state.medical_insurances)
    }

    handleCancelDialog = (type:string, index: number) => {

        if(type === enumAccordianBox.medical){
            const updateState = this.ItemRemoveFromArr(this.state.medical_insurances, index)
            console.log("handleMedicalCancel :", index, updateState)
            this.setState({ medical_insurances: updateState })
        }
        if(type === enumAccordianBox.contacts){
            console.log("handleContactCancel :", index)
            const updateState = this.ItemRemoveFromArr(this.state.insurance_contacts, index)
            this.setState({ insurance_contacts: updateState })
        }
    }

    // handleMedicalCancel = (index: number) => {
    //     const updateState = this.ItemRemoveFromArr(this.state.medical_insurances, index)
    //     console.log("handleMedicalCancel :", index, updateState)
    //     this.setState({ medical_insurances: updateState })
    // }


    handleAddContact = (e: any) => {
        e.stopPropagation()
        const contactsCmp = {
            first_name: '',
            last_name: '',
            position: '',
            phone_number: '',
            email: '',
        }
        this.setState((prevState: any) => ({
            insurance_contacts: [...prevState.insurance_contacts, contactsCmp]
        }))
        console.log("handleAddContact", this.state.insurance_contacts)
    }

    // handleContactCancel = (index: number) => {
    //     console.log("handleContactCancel :", index)
    //     const updateState = this.ItemRemoveFromArr(this.state.insurance_contacts, index)
    //     this.setState({ insurance_contacts: updateState })
    // }

    MedicalClose = (index:number) => {
        this.setState({ dialogType: enumAccordianBox.medical })
        this.setState({ dialogItemIndex: index })
        this.setState({ headingText: 'Delete Medical Insurance' })
        this.setState({ paragraphText: 'Are you sure want to delete this Medical Insurance?' })
        this.setState({ openConfirmationDialog: true })
    }

    ContactClose = (index:number) => {
        // this.handleContactCancel(index) 
        this.setState({ dialogType: enumAccordianBox.contacts })
        this.setState({ dialogItemIndex: index })
        this.setState({ headingText: 'Delete Class' })
        this.setState({ paragraphText: 'Are you sure want to delete this class?' })
        this.setState({ openConfirmationDialog: true })
    }

    handleOkConfirmation = () => {
    this.handleCancelDialog(this.state.dialogType, this.state.dialogItemIndex);
    this.setState({ openConfirmationDialog: false })
    }
    handleCancelConfirmation = () => {
    this.setState({ openConfirmationDialog: false })
    }

    handleContactAddData = (key: string, value: string, index: number) => {
        const temp: any = [...this.state.insurance_contacts];
        temp[index][key] = value
        console.log("handleContactAddData :", temp)
        this.setState({ insurance_contacts: temp })


        const errorRemove = this.handleRemoveError(temp)
        if (errorRemove) {
            const errorState: any = { ...this.state.errorSates }
            errorState[enumErrorsState.insurance_contacts_attributes_error] = false;
            this.setState({ errorSates: errorState })
        }
    }

    handleSIIBCommission = (label: string, val: number) => {
        const temp = { ...this.state.siib_comission_rate };
        temp[label] = val;
        this.setState({ siib_comission_rate: temp })
        let errorRemove = false;
        console.log("handleSIIBCommission :", temp)
        for (const key in temp) {
            if (temp[key] !== '') {
                errorRemove = true
            }
        }
        if (errorRemove) {
            const errorStateTemp: any = { ...this.state.errorSates }
            errorStateTemp[enumErrorsState.siib_comission_rate_error] = false;
            // this.setState({ errorSates: errorStateTemp })
            this.setState({ errorSates: errorStateTemp })
        }
    }

    handleMedicalInsuranceClass = (value: string, index: number) => {
        const temp = [...this.state.medical_insurances];
        temp[index]['insurance_class'] = value;
        console.log("handleMedicalInsuranceClass :", temp)
        this.setState({ medical_insurances: temp })

        const errorRemove = this.handleRemoveError(temp)
        if (errorRemove) {
            const errorState: any = { ...this.state.errorSates }
            errorState[enumErrorsState.medical_insurances_attributes_error] = false;
            this.setState({ errorSates: errorState })
        }
    }

    handleMedicalClassBenefits = (value: string, index: number) => {
        const temp = [...this.state.medical_insurances];
        temp[index]['class_benefits'] = value;
        console.log("handleMedicalInsuranceClass :", temp)
        this.setState({ medical_insurances: temp })

        const errorRemove = this.handleRemoveError(temp)
        if (errorRemove) {
            const errorState: any = { ...this.state.errorSates }
            errorState[enumErrorsState.medical_insurances_attributes_error] = false;
            this.setState({ errorSates: errorState })
        }

    }

    handleMotorInsurance = (key: string, value: string) => {
        const temp: any = { ...this.state.motor_insurance }
        temp[key] = value;
        console.log("handleMotorInsurance :", temp)
        this.setState({ motor_insurance: temp })

        const errorRemove = this.handleRemoveErrorFromObj(temp)
        if (errorRemove) {
            const errorState: any = { ...this.state.errorSates }
            errorState[enumErrorsState.motor_insurance_attributes_error] = false;
            this.setState({ errorSates: errorState })
        }
    }

    handelImageUpload = async (e: any) => {

        // dispatch(imageUploade('reset'))
        const target = e.target
        const imageFile = await e.target.files[0]

        console.log("handelImageUpload imageFile size :", imageFile, e.target.files)
        if (imageFile) {
           /* istanbul ignore next */
            try {
                const maxAllowedSize = 10 * 1024 * 1024;
                if (imageFile?.size > maxAllowedSize) {
                    alert("Reduce the file size !")
                    // Here you can ask your users to load correct file
                    target.value = ''
                } else {
                    // setSelectedimageName(compressedFile?.name)
                    // setImgUrl(URL.createObjectURL(imageFile))
                    if (this.state.documents.length <= 10) {
                        console.log("handelImageUpload :", imageFile)
                        const newDoc = {
                            name: imageFile?.name,
                            comment: '',
                            insurance_document: imageFile,
                        }

                        const temp = [...this.state.documents];
                        temp.push(newDoc);
                        // temp[index]['class_benefits'] = value;
                        console.log("handelImageUpload :", temp)
                        this.setState({ documents: temp })

                    } else {
                        alert("You can upload max 10 files !")
                    }

                }

            } catch (error) {
                console.log(error);
            }

        }
    }

    handleImageInfo = (value: any, inputName: string, index: number) => {
        if (inputName === enumUploadAttachedment.name) {
            const temp = [...this.state.documents];
            temp[index]['name'] = value;
            this.setState({ documents: temp })
        }

        if (inputName === enumUploadAttachedment.comment) {
            const temp = [...this.state.documents];
            temp[index]['comment'] = value;
            this.setState({ documents: temp })

        }
    }

    handleRemoveDoc = (index: number) => {
        const updateState = this.ItemRemoveFromArr(this.state.documents, index)
        this.setState({ documents: updateState })
    }

    updateSIIBComissionRate = (apiData:any, errorState:any) => {
        const siib_comission_rate = apiData['siib_comission_rate']
        if (siib_comission_rate !== null && Object.keys(siib_comission_rate).length) {
            for (const key in siib_comission_rate) {
                if (siib_comission_rate[key] === '' || siib_comission_rate[key] === undefined) {
                    errorState[enumErrorsState.siib_comission_rate_error] = true;
                }
            }
        } else {
            errorState[enumErrorsState.siib_comission_rate_error] = true;
        }
    }

    updateMedicalInsurance = (apiData:any, errorState:any) => {
        this.state?.insuranceData && this.state?.insuranceData?.types_of_insurance?.map((item: any) => {
            if (item?.value === 'Medical') {
                const medical = apiData['medical_insurances_attributes'];
                if (medical.length) {
                    medical.map((item: any) => {
                        if (item['insurance_class'] === '' || item['class_benefits'] === '') {
                            errorState[enumErrorsState.medical_insurances_attributes_error] = true;
                            // this.setState({ errorSates: errorState })
                        }
                    })
                } else {
                    errorState[enumErrorsState.medical_insurances_attributes_error] = true;
                }
            }
        })
    }

    updateMotorInsurance = (apiData:any, errorState:any) => {
        this.state?.insuranceData && this.state?.insuranceData?.types_of_insurance?.map((item: any) => {
            if (item?.value === 'Motor') {
                const motor_insurance_attributes = apiData['motor_insurance_attributes']
                if (Object.keys(motor_insurance_attributes).length) {
                    const allKeys = { ...this.state.errorSates }
                    console.log("motors : ", motor_insurance_attributes, allKeys)
                    for (const key in enumMotorInsurance) {
                        if (motor_insurance_attributes[key] === '' || motor_insurance_attributes[key] === undefined) {
                            errorState[enumErrorsState.motor_insurance_attributes_error] = true;
                        }
                        if (motor_insurance_attributes['insurance_class'] === undefined || !motor_insurance_attributes['insurance_class']?.length) {
                            errorState[enumErrorsState.motor_insurance_attributes_error] = true;
                        }
                    }
                } else {
                    errorState[enumErrorsState.motor_insurance_attributes_error] = true;
                }

            }
        })
    }

    updateContactInsurance = (apiData: any, errorState: any) => {
        const contact = apiData['insurance_contacts_attributes'];
        if (contact.length) {
            contact.map((item: any) => {
                for (const key in item) {
                    if (item[key] === '') {
                        errorState[enumErrorsState.insurance_contacts_attributes_error] = true;
                        // this.setState({ errorSates: errorState })
                    }
                }
            })
        } else {
            errorState[enumErrorsState.insurance_contacts_attributes_error] = true;
        }
    }

    ObjData = (apiData: any, formData: any, key: string) => {
        if (key === 'siib_comission_rate') {
            const nestedObj = {...apiData[key]}
            let conCatString = ''
            for(const nestedKey in nestedObj){
                conCatString += `'${nestedKey}':'${nestedObj[nestedKey]}',`
            }
            // formData.append(`data[${key}]`, `${apiData[key]}`)
            formData.append(`data[${key}]`, `{${conCatString}}`)
            // formData.append(`data[${key}]`, "{ 'Medical' => '20%',  'Motor' => '10%', 'Life' => '5%' }")
        }else{
            const nestedObj = {...apiData[key]}
            for(const nestedKey in nestedObj){
                if(this.state.formType !== enumFormAction.EDIT && nestedKey !== 'id' && nestedKey !== 'insurance_company_id'){
                    formData.append(`data[${key}][${nestedKey}]`, nestedObj[nestedKey])
                    // formData.append(nestedKey, nestedObj[nestedKey])
                } 
                
                if(this.state.formType === enumFormAction.EDIT){
                    formData.append(`data[${key}][${nestedKey}]`, nestedObj[nestedKey])  
                }
            }
        }

    }

    arrayDataCognitive = (formData:any, nestedKey:string,nestedObj:any, key:string, i:number) => {
        if (this.state.formType !== enumFormAction.EDIT && nestedKey !== 'id' && nestedKey !== 'insurance_company_id') {
            if(nestedKey === 'insurance_document'){
                formData.append(`data[${key}][${i}][${nestedKey}]`, nestedObj[i][nestedKey])
            }
            
            if(this.state.formType === enumFormAction.EDIT){
                formData.append(`data[${key}][${i}][${nestedKey}]`, nestedObj[i][nestedKey])
            }
            // data[medical_insurances_attributes][0][insurance_class]
        }
        
        if(this.state.formType === enumFormAction.EDIT){ 
            if(nestedKey === 'insurance_document'){
                formData.append(`data[${key}][${i}][${nestedKey}]`, nestedObj[i][nestedKey])
            }else{
                formData.append(`data[${key}][${i}][${nestedKey}]`, nestedObj[i][nestedKey])
            }
        }
    }

    arrayData = (apiData: any, formData: any, key: string) => {
        for (let i = 0; i < apiData[key].length; i++) {
            const nestedObj = { ...apiData[key] }
            for (const nestedKey in nestedObj[i]) {
                // formData.append(nestedKey, nestedObj[nestedKey])
                this.arrayDataCognitive(formData,nestedKey,nestedObj,key,i)
            }
        }
    }

    changeDataToFromData = (formData:any, apiData: any, errorState: any) => {
        for(const key in apiData){
            if(typeof apiData[key] === 'object' && Object.keys(apiData[key]).length && !Array.isArray(apiData[key]) ){
                // debugger
                // It's for objects
                // data[motor_insurance_attributes][motor_premium_minimum_value]
                this.ObjData(apiData, formData, key)
        
            }else if (Array.isArray(apiData[key])){
                // It's for array of objects
                if(key === 'medical_insurances_attributes') {
                    const nestedObj = {...apiData[key]}
                    for (let i = 0; i < apiData[key].length; i++) {
                        for(const nestedKey in nestedObj){
                            // formData.append(nestedKey, nestedObj[nestedKey])
                            formData.append(`data[${key}][${i}][insurance_class]`, nestedObj[i]['insurance_class'])
                            formData.append(`data[${key}][${i}][class_benefits]`, nestedObj[i]['class_benefits'])
                            // data[medical_insurances_attributes][0][insurance_class]
                        }
                      }
                } else {
                    this.arrayData(apiData, formData, key)
                }
            } else {
                // debugger
                if (this.state.formType !== enumFormAction.EDIT && key !== 'id' && key !== 'insurer_id') {
                    formData.append(`data[${key}]`, apiData[key])
                }
                
                if(this.state.formType === enumFormAction.EDIT){
                    formData.append(`data[${key}]`, apiData[key])
                }
            }

        }

        return formData;
    }

    handleAddInsurer = () => {
        console.log('Data I have to submit :', this.state.documents, this.state.insuranceData, this.state.insurance_contacts, this.state.medical_insurances, this.state.motor_insurance, this.state.siib_comission_rate)
        this.setState({ checkErrors: !this.state.checkErrors })

        const apiData = {
            ...this.state.insuranceData,
            siib_comission_rate: this.state.siib_comission_rate,
            medical_insurances_attributes: this.state.medical_insurances,
            motor_insurance_attributes: this.state.motor_insurance,
            insurance_contacts_attributes: this.state.insurance_contacts,
            documents_attributes: this.state.documents,
        }

        const errorState: any = { ...this.state.errorSates };
        // siib_comission_rate_error: false,
        // medical_insurances_attributes_error: false,
        // motor_insurance_attributes_error: false,
        // insurance_contacts_attributes_error: false,
        // documents_attributes_error: false,
        this.updateSIIBComissionRate(apiData, errorState)
        this.updateMedicalInsurance(apiData, errorState)
        this.updateMotorInsurance(apiData, errorState)
        this.updateContactInsurance(apiData, errorState)


        // const document = apiData['documents_attributes'];
        // if (document.length) {
        //     // document.map((item: any) => {
        //     //     // for (const key in item) {
        //     //         if (item['name'] === '') {
        //     //             errorState[enumErrorsState.documents_attributes_error] = true;
        //     //         }
        //     //     // }
        //     // })
        // } else {
        //     errorState[enumErrorsState.documents_attributes_error] = true;
        // }

        this.setState({ errorSates: errorState })

        if (errorState[enumErrorsState.insurance_contacts_attributes_error] || errorState[enumErrorsState.medical_insurances_attributes_error] || errorState[enumErrorsState.motor_insurance_attributes_error] || errorState[enumErrorsState.siib_comission_rate_error]) {
            this.setState({ showToster: true })
        } else {
            apiData['segment'] = apiData['segment'].map((segment: any) => segment.value).join(',');
            apiData['types_of_insurance'] = apiData['types_of_insurance'].map((segment: any) => segment.value).join(',');
            if (Array.isArray(apiData['motor_insurance_attributes']['insurance_class'])) {
                apiData['motor_insurance_attributes']['insurance_class'] = apiData['motor_insurance_attributes']['insurance_class'].map((segment: any) => segment.value).join(',');
            }

            if (!apiData['documents_attributes'].length) {
                delete apiData['documents_attributes']
            }
            
        const formData = new FormData();

        this.changeDataToFromData(formData, apiData, errorState)


            // const data1: any = {
            //     data: apiData
            // }
            // @ts-ignore
            for (let pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
            console.log("APi Data final Data :", apiData, formData)
            //segment types_of_insurance 
            // this.AddInsurerApiCall(form
            
            // ide = https://insurancebroker-300102-ruby.b300102.dev.eastus.az.svc.builder.cafe

            // https://insurancebroker-300102-ruby.b300102.dev.eastus.az.svc.builder.cafe
            fetch("https://insurancebroker-300102-ruby.b300102.dev.eastus.az.svc.builder.cafe/bx_block_insurance_companies/insurance_companies/29", {
                method: 'put',
                headers: {
                    // "Content-Type": "application/json",
                    "token": 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzUsImV4cCI6MTcxNDg5OTgwOCwidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.nVejcF9TOyP223QfjQ_5XqV_tBbkY2UQ8hymk0pL50R6o_67imDWJXfIQemqbV2N-NEgyEC8F5SdxboBBs643w'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            }).then((res) => {
                console.log("api res :", res)
                this.setState({showSuccessToster: true})
                this.setState({successTosterText: 'Insurer Added'})
            });;
        }

    }



    handleCancel = () => {
        this.setState({openFormSave: true})
        this.setState({leaveForm: true})
        this.setState({formDialogBtnOkText: 'Leave'})
        this.setState({formDialogHeadingText: 'Close Form'})
        this.setState({formDialogParagraphText: 'Do you want to close the form'})
    }

    handleSave = () => {
        if(this.state.formType === enumFormAction.EDIT){
            this.setState({openFormSave: true})
            this.setState({formDialogBtnOkText: 'Save'})
            this.setState({formDialogHeadingText: 'Save Changes'})
            this.setState({formDialogParagraphText: 'Do you want to save the changes?'})
        }else{
            this.setState({openFormSave: true})
            this.setState({formDialogBtnOkText: 'Add'})
            this.setState({formDialogHeadingText: 'Add insurer'})
            this.setState({formDialogParagraphText: 'Are you sure you want to add this insurer?'})
        }
    }
    
    formSaveBtn = () => {
        if(this.state.leaveForm){
            debugger
            this.setState({openFormSave: false})
            this.setState({leaveForm: false})
        }else{
            this.handleAddInsurer()
            this.setState({openFormSave: false})
        }
    }

    formCancelBtn = () => {
        this.setState({openFormSave: false})
    }

    render() {
        const { classes }: any = this.props;
        return (
            <>
            {/* <WithParams /> */}
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} key={'top' + 'right'} open={this.state.showToster} autoHideDuration={3000} onClose={/* istanbul ignore next */() => this.setState({ showToster: false })}>
                    <Alert onClose={/* istanbul ignore next */() => this.setState({ showToster: false })} severity="error">
                        Please fill all the required fields
                    </Alert>
                </Snackbar>
                {/* <form action=""> */}
                
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} key={'top' + 'right'} open={this.state.showSuccessToster} autoHideDuration={3000} onClose={/* istanbul ignore next */() => this.setState({ showSuccessToster: false })}>
                    <Alert onClose={/* istanbul ignore next */() => this.setState({ showSuccessToster: false })} severity="success">
                        {this.state.successTosterText}
                    </Alert>
                </Snackbar>

                {
                    this.state.formType === enumFormAction.VIEW ? (
                        <Grid container className={classes.editWrapper}>
                            <Grid item>Tawuniya Insurance Company</Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={() => this.setState({formType : enumFormAction.EDIT}) } style={{ backgroundColor: '#3b8da2', color: '#fff', }} color="primary">
                                    Edit details
                                </Button>
                            </Grid>
                        </Grid>
                    ) : null
                }

                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.accordionWrapper} id='accordianWrap'>
                            <Accordion>
                                <AccordionSummary
                                    aria-expanded={true}
                                    expandIcon={<ExpandMore />}
                                    aria-controls="Insurers"
                                    id="Insurers"
                                >
                                    <AccordionTitle title='Overview' insuranceData={this.state?.insuranceData} />
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* <CustomDataTable
                                    onClick={() => { console.log("sadbhj") }}
                                /> */}
                                    <InsurerOverview
                                        data={this.state.insuranceData}
                                        insuranceTypes={/* istanbul ignore next */ (data: any | null) => this.setState({ insuranceData: data })}
                                        // formAction={enumFormAction.EDIT}
                                        formType={this.state.formType}
                                    />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion disabled={this.state?.insuranceData === null ? true : false} className={this.state.errorSates.siib_comission_rate_error ? classes.errorstyle : ''}>
                                <AccordionSummary
                                    aria-expanded={true}
                                    expandIcon={<ExpandMore />}
                                    aria-controls="SIIB commission rate"
                                    id="SIIB commission rate"
                                >
                                    <AccordionTitle title='SIIB commission rate' insuranceData={this.state?.insuranceData} />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SiibCommissionRate
                                        addSiibCommission={this.handleSIIBCommission}
                                        insuranceInputs={this.state?.insuranceData}
                                        submitEvent={this.state.checkErrors}
                                        formType={this.state.formType}
                                        siibComissionRate={this.state?.siib_comission_rate || {}}
                                    />
                                </AccordionDetails>
                            </Accordion>


                            {
                                this.state?.insuranceData && this.state?.insuranceData?.types_of_insurance?.map((item: any) => {
                                    if (item?.value === 'Medical') {
                                        return (
                                            <Accordion key={item} disabled={this.state?.insuranceData === null ? true : false} className={this.state.errorSates.medical_insurances_attributes_error ? classes.errorstyle : ''}>
                                                <AccordionSummary
                                                    aria-expanded={true}
                                                    expandIcon={<ExpandMore />}
                                                    aria-controls="Medical Insurance"
                                                    id="Medical Insurance"
                                                    className={classes.addCmp}
                                                >
                                                    <AccordionTitle title='Medical Insurance' insuranceData={this.state?.insuranceData} />
                                                    {this.state.medical_insurances.length < 10 ? (<div id='medicalClick' onClick={this.handleAddClass}>+ Add Class</div>) : '' }
                                                </AccordionSummary>
                                                <AccordionDetails className={classes.accordionDetailsWrapper}>
                                                    {
                                                        this.state.medical_insurances?.map((item: any, index: number) => (
                                                            <div key={item}>
                                                                <CloseIcon data-testID='closeBtnMedical' className='testCloseMedical' onClick={/* istanbul ignore next */() => this.MedicalClose(index)} />
                                                                {/* <CloseIcon onClick={() => this.handleMedicalCancel(index)} /> */}
                                                                <div style={{ width: '100%' }}>
                                                                    <MedicalInsurance
                                                                        data={item}
                                                                        addInsuranceClassData={/* istanbul ignore next */(data) => this.handleMedicalInsuranceClass(data, index)}
                                                                        addClassBenefitsData={/* istanbul ignore next */(data) => this.handleMedicalClassBenefits(data, index)}
                                                                        submitEvent={this.state.checkErrors}
                                                                        formType={this.state.formType}
                                                                    />
                                                                </div>
                                                                <div className={classes.lineSaprator}></div>
                                                            </div>
                                                        ))
                                                    }
                                                </AccordionDetails>
                                            </Accordion>
                                        )
                                    }
                                })
                            }

                            {

                                this.state?.insuranceData && this.state?.insuranceData?.types_of_insurance?.map((item: any) => {
                                    if (item?.value === 'Motor') {
                                        return (
                                        <Accordion key={item} disabled={this.state?.insuranceData === null ? true : false} className={this.state.errorSates.motor_insurance_attributes_error ? classes.errorstyle : ''}>
                                            <AccordionSummary
                                                aria-expanded={true}
                                                expandIcon={<ExpandMore />}
                                                aria-controls="Motor Insurance"
                                                id="Motor Insurance"
                                            >
                                                <AccordionTitle title='Motor Insurance' insuranceData={this.state?.insuranceData} />
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <MotorInsurance
                                                    motorInsuranceProps={this.handleMotorInsurance}
                                                    data={this.state.motor_insurance}
                                                    submitEvent={this.state.checkErrors}
                                                    formType={this.state.formType}
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                        )
                                    }
                                })
                            }


                            <Accordion disabled={this.state?.insuranceData === null ? true : false} className={this.state.errorSates.insurance_contacts_attributes_error ? classes.errorstyle : ''}>
                                <AccordionSummary
                                    aria-expanded={true}
                                    expandIcon={<ExpandMore />}
                                    aria-controls="Contacts"
                                    id="Contacts"
                                    className={classes.addCmp}
                                >
                                    <AccordionTitle title='Contacts' insuranceData={this.state?.insuranceData} />
                                    {this.state.insurance_contacts.length < 10 ? (<div onClick={this.handleAddContact}>+ Add Contact</div>) : '' }
                                </AccordionSummary>
                                <AccordionDetails className={classes.accordionDetailsWrapper}>
                                    {
                                        this.state.insurance_contacts?.map((item: any, index: number) => (
                                            <div key={item}>
                                                <CloseIcon onClick={() => {
                                            /* istanbul ignore next */
                                            this.ContactClose(index)}} />
                                                <div style={{ width: '100%' }}>
                                                    <Contact
                                                        addData={/* istanbul ignore next */(key: string, value: string) => this.handleContactAddData(key, value, index)}
                                                        contactProp={item}
                                                        submitEvent={this.state.checkErrors}
                                                        formType={this.state.formType}
                                                    />
                                                </div>
                                                <div className={classes.lineSaprator}></div>
                                            </div>
                                        ))
                                    }
                                </AccordionDetails>
                            </Accordion>

                            <Accordion disabled={this.state?.insuranceData === null ? true : false} className={this.state.errorSates.documents_attributes_error ? classes.errorstyle : ''}>
                                <AccordionSummary
                                    aria-expanded={true}
                                    expandIcon={<ExpandMore />}
                                    aria-controls="Attachments (Optional)"
                                    id="Attachments (Optional)"
                                >
                                    <AccordionTitle title='Attachments (Optional)' insuranceData={this.state?.insuranceData} />
                                </AccordionSummary>
                                <AccordionDetails style={{ display: 'block' }}>
                                    {
                                        this.state.documents?.map((item: any, index: number) => (
                                            <div key={item}>
                                                    <UploadAttachedment
                                                        data={item}
                                                        eventChange={/* istanbul ignore next */(eventValue: any, docName: string) => this.handleImageInfo(eventValue, docName, index)}
                                                        removeDoc={/* istanbul ignore next */() => this.handleRemoveDoc(index)}
                                                        formType={this.state.formType}
                                                    // docIndex={index}
                                                    />
                                            </div>
                                        ))
                                    }

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={4} style={{ paddingTop: '30px' }}>
                                            <LabelWithIcon label='Additional attechment' />
                                            <TextField
                                                label=""
                                                id="image-upload"
                                                name='image'
                                                size="small"
                                                type='file'
                                                variant="outlined"
                                                hidden
                                                fullWidth
                                                inputProps={{
                                                    // accept:
                                                    //   ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
                                                    accept:
                                                        ".png,.JPG,.JPEG,.pdf",
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <div style={{ color: 'rgba(0, 0, 0, 0.23)' }}>Upload another attachment</div>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                title="Choose a photo please"
                                                className={classes.inputFile}
                                                onChange={this.handelImageUpload}
                                            />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>



                            <div className={classes.dialogBtnWrapper}>
                                <Button className={classes.dialogBtnCancel} variant="outlined" onClick={this.handleCancel}>
                                    Cancel
                                </Button>
                                <Button type='submit' className={classes.btnStyle} onClick={this.handleSave} disabled={this.state?.insuranceData === null ? true : false}>
                                    Save
                                </Button>
                            </div>


                        </div>
                    </Grid>
                </Grid>

                
                <ConfirmationDialog
                    btnCancelText='Cancel'
                    btnOkText='Delete'
                    openDialog={this.state.openConfirmationDialog}
                    headingText={this.state.headingText}
                    paragraphText={this.state.paragraphText}
                    handleOk={/* istanbul ignore next */() => this.handleOkConfirmation()}
                    handleCancel={/* istanbul ignore next */() => this.handleCancelConfirmation()}
                />
                
                
                <ConfirmationDialog
                    btnCancelText='Cancel'
                    btnOkText={this.state.formDialogBtnOkText}
                    openDialog={this.state.openFormSave}
                    headingText={this.state.formDialogHeadingText}
                    paragraphText={this.state.formDialogParagraphText}
                    handleOk={/* istanbul ignore next */() => this.formSaveBtn()}
                    handleCancel={/* istanbul ignore next */() => this.formCancelBtn()}
                />
                {/* </form> */}
            </>
        )
    }
}


Insurer.propTypes = {
    classes: PropTypes.object.isRequired,
    formType: PropTypes.string.isRequired,
    changeEdit: PropTypes.string.isRequired,
    params: PropTypes.string.isRequired,
};

export default withStyles(useStyles)(Insurer)

