import React, { useState } from "react";
import { observer } from "mobx-react"
import { TextField } from "@mui/material";

import templateInfoStore from '../store/templateInfoStore';

interface ITextInput {
    name: string
    id: string
    attributes?: any
}

const TextInput: React.FC<ITextInput> = (props) => {
    const item = templateInfoStore.searchByName(props.id);

    const lab = <label htmlFor={props.id} 
        style={{
            fontFamily: item.attributes['fontFamily'] ? item.attributes['fontFamily'] : 'Sherif',
            fontWeight: item.attributes['bold'] ? 'bold' : 'unset',
            fontStyle: item.attributes['italic'] ? 'italic' : 'unset',
            textDecorationLine: item.attributes['underline'] ? 'underline' : 'unset',
            lineHeight:'2em',
        }}
    >{props.name}</label>
    
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
                    fontFamily: item.attributes['fontFamily'] ? item.attributes['fontFamily'] : 'Sherif',
                    fontWeight: item.attributes['bold'] ? 'bold' : 'unset',
                    fontStyle: item.attributes['italic'] ? 'italic' : 'unset',
                    textDecorationLine: item.attributes['underline'] ? 'underline' : 'unset',
                }
            }}
            value={item.value}
        />
    )
}

export default observer(TextInput);