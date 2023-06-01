import { OutlinedInput } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react'

const TextInput = (props: any) => {
    const [field, meta] = useField(props);
    return (
        <OutlinedInput
            style={{
                marginTop: "10px",
                marginBottom: "10px"
            }}
            fullWidth            
            type={props.type ? props.type : "text"}
            {...field}
            {...props}
            error={meta.error && meta.touched}
            testID={props.testIDProps}
        />
    );
}

export default TextInput