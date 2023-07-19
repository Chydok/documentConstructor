import React from "react";
import { observer } from "mobx-react"
import { TextField } from "@mui/material";

interface ITextInput {
    name: string
    inputText: string
}

const TextInput: React.FC<ITextInput> = (props) => {
    
    return (
        <TextField
            label={props.name}
            sx={{
                p: 0,
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