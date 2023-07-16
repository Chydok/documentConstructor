import React from "react";
import { observer } from "mobx-react";
import {
    Box,
    InputAdornment,
    TextField
} from "@mui/material";

import templateInfoStore, { ITemplateElement } from "../../../store/templateInfoStore";

const ChangeObject: React.FC<{selectedItems: string}> = ({selectedItems}) => {
    let findTempalteItem: ITemplateElement | undefined;
    if (selectedItems !== '') {
        findTempalteItem = templateInfoStore.searchByName(selectedItems);
    }
    return (
        <>
            {findTempalteItem &&
                <Box>
                    <Box paddingLeft={1}>ID: {findTempalteItem.attributes['id']}</Box>
                    <TextField
                        id="name"
                        sx={{m: 1}}
                        variant="standard"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">name:</InputAdornment>,
                        }}
                        value={findTempalteItem.name}
                        onChange={(el) => {
                            templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'name', el.target.value)
                        }}
                    />
                </Box>
            } 
            {(typeof findTempalteItem?.attributes['x'] !== 'undefined') &&
            <Box>
                <TextField
                    id="coordX"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">X:</InputAdornment>,
                    }}
                    value={findTempalteItem.attributes['x']}
                    onChange={(el) => {
                        const numberCoord = el.target.value || 0;
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'x', numberCoord)
                    }}
                />
                <TextField
                    id="coordY"
                    sx={{m: 1, width: '10ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Y:</InputAdornment>,
                    }}
                    variant="standard"
                    value={findTempalteItem.attributes['y']}
                    onChange={(el) => {
                        const numberCoord = el.target.value || 0;
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'y', numberCoord)
                    }}
                />
            </Box>}
            {(typeof findTempalteItem?.attributes['height'] !== 'undefined' && findTempalteItem?.attributes['dms:widget'] !== 'table') &&
            <Box>
                <TextField
                    id="height"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Высота:</InputAdornment>,
                    }}
                    value={findTempalteItem.attributes['height']}
                    onChange={(el) => {
                        const numberCoord = el.target.value || 0;
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'height', numberCoord)
                    }}
                />
            </Box>}
            {(typeof findTempalteItem?.attributes['width'] !== 'undefined' && findTempalteItem?.attributes['dms:widget'] !== 'table') &&
            <Box>
                <TextField
                    id="width"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Ширина:</InputAdornment>,
                    }}
                    value={findTempalteItem.attributes['width']}
                    onChange={(el) => {
                        const numberCoord = el.target.value || 0;
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'width', numberCoord)
                    }}
                />
            </Box>}
            {(typeof findTempalteItem?.attributes['format'] !== 'undefined') &&
            <Box>
                <TextField
                    id="format"
                    sx={{m: 1, width: '20ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Формат:</InputAdornment>,
                    }}
                    value={findTempalteItem.attributes['format']}
                    onChange={(el) => {
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'format', el.target.value)
                    }}
                />
                <TextField
                    id="value"
                    sx={{m: 1, width: '20ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Значение:</InputAdornment>,
                    }}
                    value={findTempalteItem.value}
                    onChange={(el) => {
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'value', el.target.value)
                    }}
                />
            </Box>}
        </>
    )
}

export default observer(ChangeObject);