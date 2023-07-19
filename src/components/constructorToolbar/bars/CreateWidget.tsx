import React from "react";
import { observer } from "mobx-react";
import { Grid, Box } from "@mui/material";
import templateInfoStore, { ITemplateElement } from "../../../store/templateInfoStore";

const CreateWidget: React.FC = () => {
    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>, itemType: string) => {
        const {left, top} = document.getElementsByTagName('svg')[0].getBoundingClientRect();
        const x = +event.clientX - left;
        const y = +event.clientY - top;
        const newTemplateElement: ITemplateElement = {
            name: `${itemType}`,
            attributes: {
                "x": x,
                "y": y,
                "dms:widget": itemType,
                "dms:title": `${itemType}_${templateInfoStore.lastId}`,
            },
            children: [],
            value: ""
        };
        switch (itemType) {
            case 'time':
                newTemplateElement.value = String(Math.floor(new Date().getTime() / 1000));
                newTemplateElement.attributes['format'] = 'full';
                break;
            case 'table':
                newTemplateElement.children = [
                    {
                        name: "columns",    
                        attributes: {
                            "height": 35,
                        },
                        children: [
                            {
                                name: "cellHeader",
                                attributes: {
                                    "dms:title": "Тест1",
                                    "width": 55,
                                },
                                children: [],
                                value: ""
                            },
                        ],
                        value: ""
                    },
                    {
                        name: "record",
                        attributes: {
                            "height": 35,
                        },
                        children: [
                            {
                                name: "cellRecord",
                                attributes: {
                                    "dms:widget": "number",
                                    "width": 55,
                                },
                                children: [],
                                value: ""
                            },
                        ],
                        value: ""
                    }
                ];
                break;
        }
        templateInfoStore.addElement(newTemplateElement)
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Box
                    sx={{
                        width: 75,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        bgcolor: 'primary.dark',
                        cursor: 'pointer',
                        color: 'white',
                        '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                    draggable
                    onDragEnd={event => handleDragEnd(event, 'string')}
                >
                    Текст
                </Box>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Box
                    sx={{
                        width: 75,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        bgcolor: '#800080',
                        cursor: 'pointer',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#8B008B',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                    draggable
                    onDragEnd={event => handleDragEnd(event, 'table')}
                >
                    Таблица
                </Box>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                <Box
                    sx={{
                        width: 75,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        bgcolor: '#DA75D6',
                        cursor: 'pointer',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#DA75D6',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                    draggable
                    onDragEnd={event => handleDragEnd(event, 'time')}
                >
                    Таймер
                </Box>
            </Grid>
        </Grid>
    );
}

export default observer(CreateWidget);