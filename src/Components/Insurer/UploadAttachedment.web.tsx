import React, { useState } from 'react'
import { makeStyles, Grid, FormLabel, TextField, InputAdornment } from '@material-ui/core';
import imageCompression from 'browser-image-compression';
import ErrorIcon from '@material-ui/icons/Error';
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import LabelWithIcon from '../LabelWithIcon'
import ConfirmationDialog from '../ConfirmationDialog.web';


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
    uploadedDoc: {
        '& input': {
            color: '#7f7f7f'
        }
        // style={{color: '#7f7f7f'}}
    },
    classBenefits: {
        width: '60%',
        display: 'block'
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
    }
})

const enumUploadAttachedment = {
    name: 'name',
    comment: 'comment',
}

type documentUploadType = {
    name: string,
    comment: string,
    insurance_document: any,
}


type UploadAttachedmentProps = {
    data: documentUploadType,
    eventChange: any,
    formType: string,
    removeDoc: () => void,
}

const enumFormAction = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    VIEW: 'VIEW',
}

const UploadAttachedment = (props: UploadAttachedmentProps) => {
    const classes = useStyles();
    const [selectedimageName, setSelectedimageName] = useState<string>()
    const [imgUrl, setImgUrl] = useState<string>()
    const [dialogState, setDialogState] = useState({
        openConfirmationDialog: false,
        dialogItemIndex: 0,
        headingText: '',
        paragraphText: '',
    })


    // const handelImageUpload = async (e: any) => {

    //     // dispatch(imageUploade('reset'))
    //     const target = e.target
    //     const imageFile = await e.target.files[0]
    //     if (imageFile) {
    //         const options = {
    //             maxSizeMB: 10,
    //             maxWidthOrHeight: 1920,
    //             useWebWorker: true
    //         }

    //         try {
    //             const compressedFile = await imageCompression(imageFile, options);
    //             console.log('target.value :', e, imageFile, compressedFile)
    //             console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    //             console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    //             /*Maximum allowed size in bytes
    //               5MB Example
    //               Change first operand(multiplier) for your needs*/
    //             const maxAllowedSize = 10 * 1024 * 1024;
    //             if (compressedFile.size > maxAllowedSize) {
    //                 alert("Reduce the file size !")
    //                 // Here you can ask your users to load correct file
    //                 target.value = ''
    //             } else {
    //                 setSelectedimageName(compressedFile?.name)
    //                 setImgUrl(URL.createObjectURL(imageFile))
    //                 //   setUploadImageUpdate(true)
    //                 //   formik.handleChange(e)
    //                 //   dispatch(imageUploade(imageFile))
    //                 //   setLoading(false)
    //             }

    //             // await uploadToServer(compressedFile); // write your own logic
    //         } catch (error) {
    //             console.log(error);
    //         }

    //     }
    // }

    const handleCancelImage = () => {
        setSelectedimageName('')
        setImgUrl('')
    }

    return (
        <div className={classes.cmpWrapper}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <FormLabel component="legend">Upload attachment <ErrorIcon /></FormLabel>
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        name="insuranceClass"
                        //   onBlur={(e:any) => props.insuranceUpdate(props.data?.label, e.target.value)}
                        // onChange={(e: any) => {
                        //     // props.insuranceUpdate(props.data?.label, e.target.value)
                        //     // setInputData(e.target.value)
                        // }}
                        size='small'
                        // placeholder='hdf.pdf'
                        inputProps={{ readOnly: true }}
                        className={classes.uploadedDoc}
                        value={props?.data?.insurance_document?.name}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <a style={{ color: '#1c1c1c', display: 'flex', alignItems: 'center' }} href={URL.createObjectURL(props?.data?.insurance_document)} download> <GetAppIcon /></a>
                                    <CloseIcon style={{ cursor: 'pointer' }} onClick={() => {
                                        // props.removeDoc
                                        setDialogState((prevState) => ({
                                            ...prevState,
                                            headingText: 'Delete Attachment',
                                            paragraphText: 'Are you sure want to delete this Attachment?',
                                            openConfirmationDialog: true
                                        }))
                                        // this.setState({dialogItemIndex: index })
                                        // this.setState({headingText: 'Delete Class' })
                                        // this.setState({paragraphText: 'Are you sure want to delete this class?' })
                                        // this.setState({openConfirmationDialog: true })
                                    }} />
                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start">
                                    <InsertDriveFileIcon />
                                </InputAdornment>
                            ),
                            readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label='Document name' />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        name="docName"
                        value={props?.data?.insurance_document?.name}
                        //   onBlur={(e:any) => props.insuranceUpdate(props.data?.label, e.target.value)}
                        onChange={(e: any) => props?.eventChange(e.target.value, enumUploadAttachedment.name)}
                        size='small'
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <LabelWithIcon label='Comment (if any)' />
                    <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        fullWidth
                        name="comment"
                        //   onBlur={(e:any) => props.insuranceUpdate(props.data?.label, e.target.value)}
                        onChange={(e: any) => props?.eventChange(e.target.value, enumUploadAttachedment.comment)}
                        size='small'
                        InputProps={{
                         readOnly: props.formType === enumFormAction.EDIT || props.formType === enumFormAction.ADD ? false : true,
                        }}
                    />
                </Grid>
            </Grid>


            <ConfirmationDialog
                btnCancelText='Cancel'
                btnOkText='Delete'
                openDialog={dialogState?.openConfirmationDialog}
                headingText={dialogState?.headingText}
                paragraphText={dialogState?.paragraphText}
                handleOk={() => {
                    // this.handleContactCancel(this.state.dialogItemIndex);
                    props.removeDoc();
                    setDialogState((prevState) => ({
                        ...prevState,
                        openConfirmationDialog: false
                    }))
                }}
                handleCancel={() => {
                    setDialogState((prevState) => ({
                        ...prevState,
                        openConfirmationDialog: false
                    }))
                }}
            />

            {/* <Grid container spacing={3}>
                <Grid item xs={12} sm={4} style={{paddingTop: '30px'}}>
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
                        placeholder="hbjbjhbhjbjbjhbhjb"
                        InputProps={{
                            // endAdornment: (
                            //     //   <InputAdornment position='start' sx={{ position: 'absolute', left: '2px', top: '18px', }}>
                            //     //     {
                            //     //       cmp !== 'add' && editValues !== null && editValues !== undefined && uploadImageUpdate === false ? <img style={{ width: '25px', height: '25px' }} src={formik.values.image} alt="" /> : ''
                            //     //     }
                            //     //   </InputAdornment>
                            //     <InputAdornment position="end">
                            //         <a style={{ color: '#212121' }} href={imgUrl} download> <GetAppIcon /></a>  <CloseIcon />
                            //     </InputAdornment>
                            // ),
                            startAdornment: (
                                //   <InputAdornment position='start' sx={{ position: 'absolute', left: '2px', top: '18px', }}>
                                //     {
                                //       cmp !== 'add' && editValues !== null && editValues !== undefined && uploadImageUpdate === false ? <img style={{ width: '25px', height: '25px' }} src={formik.values.image} alt="" /> : ''
                                //     }
                                //   </InputAdornment>
                                <InputAdornment position="start">
                                    <div style={{ color: 'rgba(0, 0, 0, 0.23)' }}>Upload another attachment</div>
                                </InputAdornment>
                            )
                        }}
                        title="Choose a photo please"
                        className={classes.inputFile}
                        //   className={cmp !== 'add' ? 'removeBorder customPadding' : 'removeBorder '}
                        // value={formik.values.image}
                        onChange={handelImageUpload}
                    //   error={formik.touched.image && Boolean(formik.errors.image)}
                    //   helperText={formik.touched.image && formik.errors.image}
                    />
                </Grid>
            </Grid> */}
        </div>
    )
}

export default UploadAttachedment