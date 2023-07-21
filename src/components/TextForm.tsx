import React, { useState } from "react";
import { observer } from "mobx-react"

import templateInfoStore from '../store/templateInfoStore';

interface ITextForm {
    attributes: any
    value: string
}

const TextForm: React.FC<ITextForm> = (props) => {
    const item = templateInfoStore.searchByName(props.attributes['id']);

    return (
        <input
            key={props.attributes['id']}
            style={{
                fontFamily: item.attributes['fontFamily'] ? item.attributes['fontFamily'] : 'Sherif',
                backgroundColor: 'transparent',
                border: '0px',
                fontWeight: item.attributes['bold'] ? 'bold' : 'unset',
                fontStyle: item.attributes['italic'] ? 'italic' : 'unset',
                textDecorationLine: item.attributes['underline'] ? 'underline' : 'unset',
                width: item.value ? item.value.length + 'ch' : 'text'.length + 'ch',
            }}
            
            value={item.value ? item.value : 'text'} 
            onChange={(event) => templateInfoStore.setValue(item.attributes['id'], event.target.value)}
        />
    )
}

export default observer(TextForm);