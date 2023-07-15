import React from "react";
import { observer } from "mobx-react";

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import templateInfoStore, { ITemplateElement } from '../../store/templateInfoStore';

import '../../styles/TreeView.css';

const ConstructorTreeView: React.FC = () => {
    const templateItems = templateInfoStore.templateItems;

    const handleClick = (currentTamplateItem: ITemplateElement) => {
        templateInfoStore.setSelectedItem(currentTamplateItem.attributes['id']);
        templateInfoStore.setAttrib(currentTamplateItem.attributes['id'], 'selected', true);
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
                label={mainNode.attributes['dms:title']}
                onClick={() => handleClick(mainNode)}
            >
                {mainNode.children.map((subMain, keySub) => (
                    <TreeItem
                        id={subMain.attributes['id']}
                        key={`${keySub}_${subMain.attributes['id']}`}
                        nodeId={subMain.attributes['id']}
                        label={subMain.name}
                        onClick={() => handleClick(subMain)}
                    >
                        {subMain.children.map((subMainChild, keyChild) => (
                            <TreeItem
                                id={subMainChild.attributes['id']} 
                                key={`${keyChild}_${subMainChild.attributes['id']}`}
                                nodeId={subMainChild.attributes['id']}
                                label={subMainChild.name}
                                onClick={() => handleClick(subMainChild)}
                            />
                        ))}
                    </TreeItem>
                ))}
            </TreeItem>)}
        </TreeView>
    );
}

export default observer(ConstructorTreeView);