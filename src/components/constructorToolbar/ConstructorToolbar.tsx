import React, { useState } from "react";
import { observer } from "mobx-react";
import { Box, InputAdornment, Tab, Tabs, TextField } from "@mui/material";

import '../../styles/ConstructorToolbar.css';
import templateInfoStore from "../../store/templateInfoStore";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
interface  BarProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const {children, value, index} = props;
    
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`panel-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const ConstructorToolbar = () => {
    const [tabValue, setTabValue] = useState<number>(0);

    const tabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
    };

    const handleCoordsChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        var x = Number((document.getElementById("coordX") as HTMLInputElement).value.replace(/[^0-9]/g, ''));
        var y = Number((document.getElementById("coordY") as HTMLInputElement).value.replace(/[^0-9]/g, ''));
        templateInfoStore.setCoords(x, y);
        templateInfoStore.changeCoord(templateInfoStore.coordTarget, x, y);
    };

    const handleParamsChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        var x = Number((document.getElementById("paramW") as HTMLInputElement).value.replace(/[^0-9]/g, ''));
        var y = Number((document.getElementById("paramH") as HTMLInputElement).value.replace(/[^0-9]/g, ''));
        templateInfoStore.setParams(x, y);
        templateInfoStore.changeParam(templateInfoStore.paramTarget, x, y);
    };

    return (
        <Box className="toobarDiv">
            <Tabs value={tabValue} onChange={tabChange}>
                <Tab label="Объект"/>
                <Tab label="Виджеты"/>
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <Box>Координаты:</Box>
                <TextField 
                    id="coordX"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">X:</InputAdornment>,
                    }}
                    value={templateInfoStore.coords[0]}
                    onChange={handleCoordsChange}
                />
                <TextField
                    id="coordY"
                    sx={{m: 1, width: '10ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Y:</InputAdornment>,
                    }}
                    variant="standard"
                    value={templateInfoStore.coords[1]}
                    onChange={handleCoordsChange}
                />
                <TextField
                    id="paramW"
                    sx={{m: 1, width: '10ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">W:</InputAdornment>,
                    }}
                    variant="standard"
                    value={templateInfoStore.params[0]}
                    onChange={handleParamsChange}
                />
                <TextField
                    id="paramH"
                    sx={{m: 1, width: '10ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">H:</InputAdornment>,
                    }}
                    variant="standard"
                    value={templateInfoStore.params[1]}
                    onChange={handleParamsChange}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                Виджеты
            </TabPanel>
        </Box>
    );
}

export default observer(ConstructorToolbar);