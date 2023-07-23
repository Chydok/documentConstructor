import React from "react";
import { observer } from "mobx-react"
import { Menu, MenuItem} from "@mui/material";
import templateInfoStore, { ITemplateElement } from "../store/templateInfoStore";

interface ISideMenu {
    item: ITemplateElement;
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

    const handleAddTNewRow = (rowType: string) => {
        const newRow: ITemplateElement = {
            name: rowType,
            attributes: {
                height: 35
            },
            children: [{
                name: 'cell1',
                attributes: {
                    'width': 25,
                    'dms:title': rowType === 'columns' ? 'cell1' : ''
                },
                children: [],
                value: rowType !== 'columns' ? 'cell1' : ''
            }],
            value: ''
        }
        templateInfoStore.addChild(props.item?.attributes['id'], newRow);
    };
    return (
        <Menu
            anchorReference="anchorPosition"
            anchorPosition={{left: props.left, top: props.top}}
            open={props.open}
            onClose={handleClose}
        >
            <MenuItem onClick={() => handleAddTNewRow('columns')}>Добавить строку в thead</MenuItem>
            <MenuItem onClick={() => handleAddTNewRow('record')}>Добавить строку в tbody</MenuItem>
        </Menu>
    )
}

export default observer(SideMenu);