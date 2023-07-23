import React from "react";
import { observer } from "mobx-react"
import { Button, Menu, MenuItem} from "@mui/material";
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

    //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        //setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        //setAnchorEl(null);
    };

    const handleAddCellVertical = () => {
    //const table = document.getElementById(findTemplateItem?.attributes['id']) as HTMLTableElement;
    const table = props.item?.attributes['id']
    if (table !== undefined && table !== null) {
        const defualtChild: ITemplateElement = {
            name: `newRecord`, 
            attributes: {
                "dms:widget": "number",
                "width": 55,
            },
            children: [
                {
                name: "meowmeow",
                attributes: {
                    "dms:title": "Тест2",
                    "width": 55,
                },
                children: [],
                value: ""
                },
            ],
            value: ""
        };
        templateInfoStore.addChild(props.item?.attributes['id'], defualtChild);
    }

    
      };
    
      const handleAddCellHorizontal = () => {
        
      };
    
    return (
        <div>
                {/* <Button
                    id="demo-positioned-button"
                    aria-controls={props.open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={props.open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Менюшка
                </Button> */}
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={props.anchorEl}
                    open={props.open}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleAddCellVertical}>Добавить ячейку по вертикали</MenuItem>
                    <MenuItem onClick={handleAddCellHorizontal}>Добавить ячейку по горизонтали</MenuItem>
                    <MenuItem onClick={handleClose}>Хз</MenuItem>
                </Menu>
            </div>
    )
}

export default observer(SideMenu);