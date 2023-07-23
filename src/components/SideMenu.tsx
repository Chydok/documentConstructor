import React from "react";
import { observer } from "mobx-react"
import { Menu, MenuItem} from "@mui/material";
import templateInfoStore, { ITemplateElement } from "../store/templateInfoStore";

interface ISideMenu {
    item: ITemplateElement | null;
    open: boolean;
    setMenuItem:Function;
    setMenuOpen:Function;
    left: number,
    top: number
}

const SideMenu: React.FC<ISideMenu> = (props) => {
    const handleClose = () => {
        props.setMenuItem(null);
        props.setMenuOpen(false);
    };

    const handleAddTHeadRow = () => {
        
    };

    const handleAddTBodyRow = () => {
    
    };
    return (
        <Menu
            anchorReference="anchorPosition"
            anchorPosition={{left: props.left, top: props.top}}
            open={props.open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleAddTHeadRow}>Добавить строку в thead</MenuItem>
            <MenuItem onClick={handleAddTBodyRow}>Добавить строку в tbody</MenuItem>
        </Menu>
    )
}

export default observer(SideMenu);