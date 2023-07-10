import React from "react";
import { observer } from "mobx-react"
import { TextField } from "@mui/material";

interface ITextInput {
    attributes: any,
    inputText: string
}

const TextInput = (props: ITextInput) => {
    return (
        <TextField
            label={props.attributes['dms:title']}
            sx={{
                m: 0,
                width: '10ch',
            }}
            style={{
                backgroundColor: 'white',
            }}
            value={props.inputText}
        />
    )
}

export default observer(TextInput);