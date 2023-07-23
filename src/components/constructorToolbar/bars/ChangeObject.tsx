import React from "react";
import { observer } from "mobx-react";
import {
    Box,
    FormControlLabel,
    InputAdornment,
    Switch,
    TextField,
    FormControl,
    MenuItem,
    InputLabel,
} from "@mui/material";

import templateInfoStore, { ITemplateElement } from "../../../store/templateInfoStore";
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ChangeObject: React.FC<{selectedItems: string}> = ({selectedItems}) => {
    const [fontFamily, setFontFamily] = React.useState('');

    const handleChangeFontFamily = (event: SelectChangeEvent) => {
        if (event.target.value != undefined) {
            setFontFamily(event.target.value as string);
            templateInfoStore.setAttrib(findTemplateItem!.attributes['id'], 'fontFamily', event.target.value)
        }
    };

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>, item: ITemplateElement) => {
        const font = event.target.checked ? 'italic' : '';
        templateInfoStore.setAttrib(item.attributes['id'], 'fontStyle', font);
        if (item.attributes['dms:widget'] == 'table') {
            item.children.forEach(itemRow => {
                itemRow.children.forEach(cell => {
                    templateInfoStore.setAttrib(cell.attributes['id'], 'fontStyle', '');
                })
            })
        }
    };

    let findTemplateItem: ITemplateElement | undefined;
    if (selectedItems !== '') {
        findTemplateItem = templateInfoStore.searchByName(selectedItems);
    }
    return (
        <>
            {findTemplateItem &&
                <Box>
                    <Box paddingLeft={1}>ID: {findTemplateItem.attributes['id']}</Box>
                    <TextField
                        id="name"
                        sx={{m: 1}}
                        variant="standard"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">name:</InputAdornment>,
                        }}
                        value={findTemplateItem.name}
                        onChange={(el) => {
                            templateInfoStore.setAttrib(findTemplateItem!.attributes['id'], 'name', el.target.value)
                        }}
                    />
                </Box>
            } 
            {(typeof findTemplateItem?.attributes['x'] !== 'undefined') &&
            <Box>
                <TextField
                    id="coordX"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">X:</InputAdornment>,
                    }}
                    value={findTemplateItem.attributes['x']}
                    onChange={(el) => {
                        const numberCoord = el.target.value || 0;
                        templateInfoStore.setAttrib(findTemplateItem!.attributes['id'], 'x', numberCoord)
                    }}
                />
                <TextField
                    id="coordY"
                    sx={{m: 1, width: '10ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Y:</InputAdornment>,
                    }}
                    variant="standard"
                    value={findTemplateItem.attributes['y']}
                    onChange={(el) => {
                        const numberCoord = el.target.value || 0;
                        templateInfoStore.setAttrib(findTemplateItem!.attributes['id'], 'y', numberCoord)
                    }}
                />
            </Box>
            }
            {(typeof findTemplateItem?.attributes['height'] !== 'undefined' && findTemplateItem?.attributes['dms:widget'] !== 'table') &&
            <Box>
                <TextField
                    id="height"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Высота:</InputAdornment>,
                    }}
                    value={findTemplateItem.attributes['height']}
                    onChange={(el) => {
                        const numberCoord = el.target.value || 0;
                        templateInfoStore.setAttrib(findTemplateItem!.attributes['id'], 'height', numberCoord)
                    }}
                />
            </Box>}
            {(typeof findTemplateItem?.attributes['width'] !== 'undefined' && findTemplateItem?.attributes['dms:widget'] !== 'table') &&
            <Box>
                <TextField
                    id="width"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Ширина:</InputAdornment>,
                    }}
                    value={findTemplateItem.attributes['width']}
                    onChange={(el) => {
                        const numberCoord = el.target.value || 0;
                        templateInfoStore.setAttrib(findTemplateItem!.attributes['id'], 'width', numberCoord)
                    }}
                />
            </Box>
            }
            
            {(typeof findTemplateItem?.attributes['format'] !== 'undefined') &&
            <Box>
                <TextField
                    id="format"
                    sx={{m: 1, width: '20ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Формат:</InputAdornment>,
                    }}
                    value={findTemplateItem.attributes['format']}
                    onChange={(el) => {
                        templateInfoStore.setAttrib(findTemplateItem!.attributes['id'], 'format', el.target.value)
                    }}
                />
                <TextField
                    id="value"
                    sx={{m: 1, width: '20ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Значение:</InputAdornment>,
                    }}
                    value={findTemplateItem.value}
                    onChange={(el) => {
                        templateInfoStore.setAttrib(findTemplateItem!.attributes['id'], 'value', el.target.value)
                    }}
                    
                />
            </Box>}
            {findTemplateItem && ['time', 'string'].indexOf(findTemplateItem?.attributes['dms:widget']) === -1 &&
                <Box sx={{m: 1, width: '20ch'}}>
                    <FormControl fullWidth> 
                        <InputLabel id="font">Font</InputLabel> 
                            <Select
                                labelId="font"
                                id="fontSelect"
                                value={fontFamily}
                                label="Font"
                                onChange={handleChangeFontFamily}
                            >
                            <MenuItem value={'sherif'}>Sherif</MenuItem>
                            <MenuItem value={'fantasy'}>Fantasy</MenuItem>
                            <MenuItem value={'cursive'}>Cursive</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        label={'Italic'}
                        control={
                            <Switch
                                onChange={event => handleChangeSwitch(event, findTemplateItem!)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                color="secondary"
                                value={'Italic'}
                            />
                        }
                    />
                </Box>
            }
        </>
    )
}

export default observer(ChangeObject);