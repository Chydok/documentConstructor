import React from "react";
import { observer } from "mobx-react";

import { Box, InputAdornment, TextField } from "@mui/material";
import templateInfoStore, { ITemplateElement } from "../../../store/templateInfoStore";

const ChangeObject: React.FC<{selectedItems: string}> = ({selectedItems}) => {
    let findTempalteItem: ITemplateElement | undefined;
    if (selectedItems !== '') {
        findTempalteItem = templateInfoStore.searchByName(selectedItems);
    }
    return (
        <>
            {findTempalteItem &&
                <>
                    <Box paddingBottom={1}>Имя тэга: {findTempalteItem.name}</Box>
                    <Box paddingBottom={1}>ID: {findTempalteItem.attributes['id']}</Box>
                </>
            } 
            {(typeof findTempalteItem?.attributes['x'] !== 'undefined') &&
            <>
                <Box>Координаты:</Box>
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
            </>}
            {(typeof findTempalteItem?.attributes['height'] !== 'undefined' && findTempalteItem?.attributes['dms:widget'] !== 'table') &&
            <>
            <TextField
                id="coordX"
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
            </>}
            {(typeof findTempalteItem?.attributes['width'] !== 'undefined' && findTempalteItem?.attributes['dms:widget'] !== 'table') &&
            <>
            <TextField
                id="coordX"
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
            </>}
        </>
    )
}

export default observer(ChangeObject);