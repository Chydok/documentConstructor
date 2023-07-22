import React from "react";
import { observer } from "mobx-react";
import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    TextField,
    OutlinedInput,
    Select
} from "@mui/material";

import templateInfoStore from "../../../store/templateInfoStore";

const ChangeObject: React.FC<{item: string}> = ({item}) => {
    const templateItem = templateInfoStore.searchById(item);

    return (
        <>
            {templateItem &&
                <Box>
                    <Box paddingLeft={1}>ID: {templateItem.attributes['id']}</Box>
                    <TextField
                        id="name"
                        sx={{m: 1}}
                        variant="standard"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">name:</InputAdornment>,
                        }}
                        value={templateItem.name}
                        onChange={(el) => {
                            templateInfoStore.setName(templateItem!.attributes['id'], el.target.value)
                        }}
                    />
                </Box>
            }

            {(typeof templateItem?.attributes['x'] !== 'undefined') &&
            <Box>
                <TextField
                    id="coordX"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">X:</InputAdornment>,
                    }}
                    value={templateItem.attributes['x']}
                    onChange={(el) => {
                        const numberCoord = Number(el.target.value.replace(/[^0-9]/g, '')) || 0;
                        templateInfoStore.setAttrib(templateItem!.attributes['id'], 'x', numberCoord)
                    }}
                />
                <TextField
                    id="coordY"
                    sx={{m: 1, width: '10ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Y:</InputAdornment>,
                    }}
                    variant="standard"
                    value={templateItem.attributes['y']}
                    onChange={(el) => {
                        const numberCoord = Number(el.target.value.replace(/[^0-9]/g, '')) || 0;
                        templateInfoStore.setAttrib(templateItem!.attributes['id'], 'y', numberCoord)
                    }}
                />
            </Box>}

            {(templateItem && typeof templateItem.attributes['width'] !== 'undefined' && templateItem?.attributes['dms:widget'] !== 'table') &&
            <Box>
                <TextField
                    id="width"
                    sx={{m: 1, width: '15ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Ширина:</InputAdornment>,
                    }}
                    value={templateItem.attributes['width'] !== '' ? templateItem.attributes['width'] : 100}
                    onChange={(el) => {
                        const numberWidth = Number(el.target.value.replace(/[^0-9]/g, '')) || 0;
                        templateInfoStore.setAttrib(templateItem!.attributes['id'], 'width', numberWidth);
                    }}
                />
            </Box>}

            {(templateItem && typeof templateItem.attributes['height'] !== 'undefined' && templateItem?.attributes['dms:widget'] !== 'table') &&
            <Box>
                <TextField
                    id="height"
                    sx={{m: 1, width: '15ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Высота:</InputAdornment>,
                    }}
                    value={templateItem.attributes['height'] !== '' ? templateItem.attributes['height'] : 65}
                    onChange={(el) => {
                        const numberHeight = Number(el.target.value.replace(/[^0-9]/g, '')) || 0;
                        templateInfoStore.setAttrib(templateItem!.attributes['id'], 'height', numberHeight)
                    }}
                />
            </Box>}

            {(typeof templateItem?.attributes['format'] !== 'undefined') &&
            <Box>
                <TextField
                    id="format"
                    sx={{m: 1, width: '20ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Формат:</InputAdornment>,
                    }}
                    value={templateItem.attributes['format']}
                    onChange={(el) => {
                        templateInfoStore.setAttrib(templateItem!.attributes['id'], 'format', el.target.value)
                    }}
                />
                <TextField
                    id="value"
                    sx={{m: 1, width: '20ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Значение:</InputAdornment>,
                    }}
                    value={templateItem.value}
                    onChange={(el) => {
                        templateInfoStore.setValue(templateItem!.attributes['id'], el.target.value)
                    }}
                />
            </Box>}

            {(templateItem?.attributes['dms:widget'] === 'string' || templateItem?.attributes['dms:widget'] === 'text') &&
            <Box>
                <FormControl sx={{ m: 1, width: 150 }}>
                    <InputLabel id="multiple-name-label">Стиль</InputLabel>
                    <Select
                        labelId="multiple-name-label"
                        id="multiple-name"
                        multiple
                        value={templateItem?.attributes['fontStyle'] || []}
                        onChange={event => {
                            templateInfoStore.setAttrib(templateItem?.attributes['id'], 'fontStyle', event.target.value);
                        }}
                        input={<OutlinedInput label="Стиль" />}
                        >
                        {['bold', 'italic', 'underline'].map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="font">Шрифт</InputLabel> 
                    <Select
                        labelId="font"
                        id="fontSelect"
                        value={templateItem!.attributes['fontFamily'] || 'sherif'}
                        label="Font"
                        onChange={event => {
                            templateInfoStore.setAttrib(templateItem!.attributes['id'], 'fontFamily', event.target.value);
                        }}
                    >
                    <MenuItem value={'sherif'}>Sherif</MenuItem>
                    <MenuItem value={'fantasy'}>Fantasy</MenuItem>
                    <MenuItem value={'cursive'}>Cursive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="value"
                    sx={{m: 1}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Значение:</InputAdornment>,
                    }}
                    value={templateItem.value}
                    onChange={(el) => {
                        templateInfoStore.setValue(templateItem!.attributes['id'], el.target.value)
                    }}
                />
            </Box>}

            {templateItem &&
                <Box>
                    <Button
                        variant="outlined"
                        sx={{ m: 1 }}
                        onClick={() => {
                            templateInfoStore.removeElement(templateItem?.attributes['id']); 
                        }}
                    >
                        Удалить
                    </Button>
                </Box>
            } 
        </>
    )
}

export default observer(ChangeObject);