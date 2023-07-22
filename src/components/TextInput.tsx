import React from "react";
import { observer } from "mobx-react"
import { TextField } from "@mui/material";

import templateInfoStore from '../store/templateInfoStore';

interface ITextInput {
    name: string
    id: string
    attributes?: any
}

const TextInput: React.FC<ITextInput> = (props) => {
    const iputItem = templateInfoStore.searchById(props.id);
    const fontStyle = iputItem.attributes['fontStyle'] || [];
    const lab = <label
        htmlFor={props.id} 
        style={{
            fontFamily: iputItem.attributes['fontFamily'] ? iputItem.attributes['fontFamily'] : 'Sherif',
            fontWeight: fontStyle.includes('bold') ? 'bold' : 'unset',
            fontStyle: fontStyle.includes('italic') ? 'italic' : 'unset',
            textDecorationLine: fontStyle.includes('underline') ? 'underline' : 'unset',
            lineHeight:'2em',
        }}
    >
        {props.name}
    </label>;

    return (
        <TextField 
            label={lab}
            key={props.id}
            id={props.id}
            sx={{
                p: 0,
                m: 0,
            }}
            style={{
                backgroundColor: 'white',
                width: 'inherit',
                height: 'inherit',
                whiteSpace: 'pre-line',
                wordBreak: 'break-all',
            }}
            inputProps={{
                style: {
                    fontFamily: iputItem.attributes['fontFamily'] ? iputItem.attributes['fontFamily'] : 'Sherif',
                    fontWeight: fontStyle.includes('bold') ? 'bold' : 'unset',
                    fontStyle: fontStyle.includes('italic') ? 'italic' : 'unset',
                    textDecorationLine: fontStyle.includes('underline') ? 'underline' : 'unset',
                }
            }}
            value={iputItem.value}
        />
    )
}

export default observer(TextInput);