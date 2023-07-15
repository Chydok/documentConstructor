import React, { useState } from "react";
import { observer } from "mobx-react";
import { Box, Tab, Tabs } from "@mui/material";

import '../../styles/ConstructorToolbar.css';
import ChangeObjec from "./bars/ChangeObject";
import templateInfoStore from "../../store/templateInfoStore";

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

const ConstructorToolbar: React.FC<{}> = ({}) => {
    const [tabValue, setTabValue] = useState<number>(0);

    const tabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
    };

    return (
        <Box className="toobarDiv">
            <Tabs value={tabValue} onChange={tabChange}>
                <Tab label="Объект"/>
                <Tab label="Виджеты"/>
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <ChangeObjec selectedItems={templateInfoStore.selectedItems} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                Виджеты
            </TabPanel>
        </Box>
    );
}

export default observer(ConstructorToolbar);