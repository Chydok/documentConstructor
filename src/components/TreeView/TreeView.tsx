import React from "react";
import { observer } from "mobx-react";
import { TreeView, TreeItem } from '@mui/lab';

import templateInfoStore, { ITemplateElement } from '../../store/templateInfoStore';

import '../../styles/TreeView.css';

const ConstructorTreeView: React.FC = () => {
    const templateItems = templateInfoStore.templateItems;

    const handleClick = (currentTamplateItem: ITemplateElement, event: any) => {
        if (event.shiftKey) {
            templateInfoStore.setSelectedItem(currentTamplateItem.attributes['id'], true);
        } else {
            templateInfoStore.setSelectedItem(currentTamplateItem.attributes['id'], false);
        }
        templateInfoStore.setAttrib(currentTamplateItem.attributes['id'], 'selected', true);
    };

    const handleTarget = (currentTamplateItem: ITemplateElement, enter: boolean) => {
        templateInfoStore.setTargetedItem(currentTamplateItem.attributes['id']);
        templateInfoStore.setAttrib(currentTamplateItem.attributes['id'], 'targeted', enter ? true : false);
    };

    return (
       <TreeView
            defaultCollapseIcon="-"
            defaultExpandIcon="+"
            style={{
                height: "96vh",
                width: 300,
                overflowX: 'auto'
            }}
        >
            {templateItems.map((mainNode, keyMain) =>
            <TreeItem
                key={`${keyMain}_${mainNode.attributes['id']}`}
                id={mainNode.attributes['id']}
                nodeId={mainNode.attributes['id']}
                label={mainNode.name}
                onClick={(event) => handleClick(mainNode, event)}
                onMouseEnter={() => handleTarget(mainNode, true)}
                onMouseOut={() => handleTarget(mainNode, false)}
            >
                {mainNode.children.map((subMain, keySub) => (
                    <TreeItem
                        id={subMain.attributes['id']}
                        key={`${keySub}_${subMain.attributes['id']}`}
                        nodeId={subMain.attributes['id']}
                        label={subMain.name}
                        onClick={(event) => handleClick(subMain, event)}
                    >
                        {subMain.children.map((subMainChild, keyChild) => (
                            <TreeItem
                                id={subMainChild.attributes['id']} 
                                key={`${keyChild}_${subMainChild.attributes['id']}`}
                                nodeId={subMainChild.attributes['id']}
                                label={subMainChild.name}
                                onClick={(event) => handleClick(subMainChild, event)}
                                onMouseEnter={() => handleTarget(subMainChild, true)}
                                onMouseOut={() => handleTarget(subMainChild, false)}
                            />
                        ))}
                    </TreeItem>
                ))}
            </TreeItem>)}
        </TreeView>
    );
}

export default observer(ConstructorTreeView);