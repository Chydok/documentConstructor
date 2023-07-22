import React from "react";
import { observer } from "mobx-react"

import templateInfoStore from '../store/templateInfoStore';
import { Box } from "@mui/material";

interface ITextForm {
    attributes: any
    value: string
}

const TextForm: React.FC<ITextForm> = (props) => {
    const textItem = templateInfoStore.searchById(props.attributes['id']);
    const fontStyle = textItem.attributes['fontStyle'] || [];

    return (
        <Box
            key={props.attributes['id']}
            style={{
                fontFamily: textItem.attributes['fontFamily'] ? textItem.attributes['fontFamily'] : 'Sherif',
                backgroundColor: 'transparent',
                border: '0',
                fontWeight: fontStyle.includes('bold') ? 'bold' : 'unset',
                fontStyle: fontStyle.includes('italic') ? 'italic' : 'unset',
                textDecorationLine: fontStyle.includes('underline') ? 'underline' : 'unset',
            }}
        >
            {textItem.value ? textItem.value : 'text'}
        </Box>
    )
}

export default observer(TextForm);