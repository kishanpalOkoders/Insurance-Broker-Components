import React, { useEffect } from 'react';
import { Button, Grid, TextField } from "@material-ui/core";
import { GetApp, InsertDriveFile, Close } from "@material-ui/icons";
import { useField } from "formik";
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  fileExistDesign: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid rgba(118, 118, 118, 0.5)",
    borderRadius: "5px",
    marginTop: "10px",
    height: "55px",
    padding: "15px"
  },
  fileNameStyle:{
    width:"80%"
  },
  uploadFileInput: {
    marginTop: "10px",
    boxShadow: 'none',
    border: "dashed lightgrey 2px",
    height: "55px",
    background: "transparent",
    width: "100%",
    textTransform: "none"
  },
  downloaIcon: {
    cursor: "pointer"
  },
  textDesign:{
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textTransform: "none"
  }
})

const FileUpload = (props: any) => {
  const [input, setInput] = React.useState({});
  const [fileUrl, setFileUrl] = React.useState("");
  const [fileName, setFileName] =  React.useState("");
  const classes = useStyles();

  React.useEffect(() => {
    if (props.filePath === "" || (typeof props.filePath === "object" && Object.keys(props.filePath).length === 0)) {
      return;
    } else {
      setFileUrl(props.filePath);
      const getFileName = async () => {
        try {
          const fileData = await fetch(props.filePath, { method: 'GET' });
          const contentDisposition = await fileData.headers.get('content-disposition');
          // @ts-ignore
          const match = await contentDisposition.match(/filename="(.+)"/);
          // @ts-ignore
          const filename = await match ? match[1] : 'file';
          setFileName(filename)

        } catch (error) {
          console.log(error);
        }
      }
      getFileName()
    }
  });

  const handleFileUpload = async (e: any) => {
    setInput(e.target.files[0]);
    await props.onChange(e);
  };

  const downloadFile = async () => {
    // @ts-ignore
    if (input && input?.name) {
      // @ts-ignore
      const blob = new Blob([input], { type: input.type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // @ts-ignore
      link.download = input.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const response = await fetch(fileUrl, { method: 'GET' });
      const contentDisposition = response.headers.get('content-disposition');
      // @ts-ignore
      const match = contentDisposition.match(/filename="(.+)"/);
      const filename = match ? match[1] : 'file';
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  const showDownloadText = () => {
    const filePath = typeof(props.filePath) === "string" && props.filePath;
    // @ts-ignore
    const fileData = input && input.name;
    
    if(filePath || fileData){
      return true;
    } else {
      return false;
    }

  }
  

  return (
    // @ts-ignore
    showDownloadText() ? (
      <Grid className={classes.fileExistDesign}>
        <Button className={classes.fileNameStyle} component="label" >
          <Grid item>
            <InsertDriveFile />
            <input name={props.inputName} hidden onChange={handleFileUpload} accept="image/*,.pdf" type="file" />
          </Grid>
          <Grid className={classes.textDesign} item>
            {/* @ts-ignore */}
            &nbsp;{input.name || fileName || props.fileName}
          </Grid>
        </Button>
        <Grid item>
          <GetApp className={classes.downloaIcon} onClick={(e) => {
            e.stopPropagation();
            downloadFile()
          }} />
          <Close className={classes.downloaIcon} onClick={(e) => {
            e.stopPropagation();
            setInput({})
            setFileUrl("")
            props.onRemove()
          }} />
        </Grid>
      </Grid>
    ) : (
      <Button className={classes.uploadFileInput} component="label" >
        Upload file here
        <input name={props.inputName} hidden onChange={handleFileUpload} accept="image/*" type="file" />
      </Button >
    )
  )
}

export default FileUpload