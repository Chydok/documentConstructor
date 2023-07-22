import React from "react";
import { observer } from "mobx-react";
import {
    Box,
    Button,
    InputAdornment,
    TextField
} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import templateInfoStore, { ITemplateElement } from "../../../store/templateInfoStore";

const ChangeObject: React.FC<{selectedItems: string}> = ({selectedItems}) => {
    let findTempalteItem: ITemplateElement | undefined;

    if (selectedItems !== '') { findTempalteItem = templateInfoStore.searchByName(selectedItems); }

    const fontStyles = ['bold', 'italic', 'underline']

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        fontStyles.forEach(element => {
            templateInfoStore.setAttrib(findTempalteItem?.attributes['id'], element, value.includes(element));
        });
    };

    let selectedFont = findTempalteItem?.attributes['fontFamily'] !== undefined ? findTempalteItem?.attributes['fontFamily'] : 'sherif';
    let selectedStyles = ['']
    fontStyles.forEach(style => {
        if (findTempalteItem?.attributes[style]) { selectedStyles.push(style) }
    });

    const handleChangeFontFamily = (event: SelectChangeEvent) => {
        if (event.target.value != undefined) {
            templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'fontFamily', event.target.value);
        }
    };

    let selectedAlign = findTempalteItem?.attributes['align'] !== undefined ? findTempalteItem?.attributes['align'] : '';
    const handleChangeAlign = (event: SelectChangeEvent) => {
        if (event.target.value != undefined) {
            templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'align', event.target.value);

            switch (event.target.value) {
                case 'left':
                    templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'x', 0)
                    break;

                case 'right':
                    console.log(findTempalteItem?.value.length)
                    templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'x', (templateInfoStore.templateAttr.width - findTempalteItem!.value.length));
                    break;

                case 'center':
                    templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'x', (templateInfoStore.templateAttr.width/2 - findTempalteItem!.value.length*3));
                    break;
            }
        }
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
                            templateInfoStore.setName(findTempalteItem!.attributes['id'], el.target.value)
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
                        const numberCoord = Number(el.target.value.replace(/[^0-9]/g, '')) || 0;
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
                        const numberCoord = Number(el.target.value.replace(/[^0-9]/g, '')) || 0;
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'y', numberCoord)
                    }}
                />
            </Box>}

            {(typeof findTempalteItem?.attributes['height'] !== 'undefined' && findTempalteItem?.attributes['dms:widget'] !== 'table') &&
            <Box>
                <TextField
                    id="height"
                    sx={{m: 1, width: '15ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Высота:</InputAdornment>,
                    }}
                    value={findTempalteItem.attributes['height']}
                    onChange={(el) => {
                        const numberCoord = Number(el.target.value.replace(/[^0-9]/g, '')) || 0;
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'height', numberCoord)
                    }}
                />
            </Box>}

            {(typeof findTempalteItem?.attributes['width'] !== 'undefined' && findTempalteItem?.attributes['dms:widget'] !== 'table'
            ) &&
            <Box>
                <TextField
                    id="width"
                    sx={{m: 1, width: '15ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Ширина:</InputAdornment>,
                    }}
                    value={findTempalteItem.attributes['width']}
                    onChange={(el) => {
                        const numberCoord = Number(el.target.value.replace(/[^0-9]/g, '')) || 0;
                        templateInfoStore.setAttrib(findTempalteItem!.attributes['id'], 'width', 
                        findTempalteItem?.attributes['dms:widget'] === 'text' ? `${findTempalteItem?.value.length}ch` : numberCoord);
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
                        templateInfoStore.setValue(findTempalteItem!.attributes['id'], el.target.value)
                    }}
                />
            </Box>}

            {(findTempalteItem?.attributes['dms:widget'] === 'string' || findTempalteItem?.attributes['dms:widget'] === 'text') &&
            <Box>
                <TextField
                    id="value"
                    sx={{m: 1, width: '20ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Значение:</InputAdornment>,
                    }}
                    value={findTempalteItem.value}
                    onChange={(el) => {
                        templateInfoStore.setValue(findTempalteItem!.attributes['id'], el.target.value)
                    }}
                />
                <FormControl sx={{ m: 1, width: 150 }}>
                    <InputLabel id="multiple-name-label">Стиль</InputLabel>
                    <Select
                    labelId="multiple-name-label"
                    id="multiple-name"
                    multiple
                    value={selectedStyles}
                    onChange={handleChange}
                    input={<OutlinedInput label="Стиль" />}
                    >
                    {fontStyles.map((name) => (
                        <MenuItem
                        key={name}
                        value={name}
                        >
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
                        value={selectedFont}
                        label="Font"
                        onChange={handleChangeFontFamily}
                    >
                    <MenuItem value={'sherif'}>Sherif</MenuItem>
                    <MenuItem value={'fantasy'}>Fantasy</MenuItem>
                    <MenuItem value={'cursive'}>Cursive</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="align">Выравнивание:</InputLabel> 
                    <Select
                        labelId="align"
                        id="alignSelect"
                        value={selectedAlign}
                        label="Align"
                        onChange={handleChangeAlign}
                    >
                    <MenuItem value={'left'}>Слева</MenuItem>
                    <MenuItem value={'right'}>Справа</MenuItem>
                    <MenuItem value={'center'}>Центр</MenuItem> 
                    </Select>
                </FormControl>
            </Box>}

            {findTempalteItem &&
                <Box>
                    <Button variant="outlined" 
                        onClick={() => {
                            templateInfoStore.removeElement(findTempalteItem?.attributes['id']); 
                        }}
                    >Удалить</Button>
                </Box>
            } 
        </>
    )
}

export default observer(ChangeObject);