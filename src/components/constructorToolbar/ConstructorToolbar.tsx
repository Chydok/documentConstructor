import React, { useState } from "react";
import { observer } from "mobx-react";
import { Box, InputAdornment, Tab, Tabs, TextField } from "@mui/material";

import '../../styles/ConstructorToolbar.css';

interface TabPanelProps {
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

    return (
        <Box className="toobarDiv">
            <Tabs value={tabValue} onChange={tabChange}>
                <Tab label="Обьект"/>
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
                />
                <TextField
                    id="coordY"
                    sx={{m: 1, width: '10ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Y:</InputAdornment>,
                    }}
                    variant="standard"
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                Виджеты
            </TabPanel>
        </Box>
    );
}

export default observer(ConstructorToolbar);