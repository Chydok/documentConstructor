import React, { createElement, useEffect, useState } from "react";
import { observer } from "mobx-react";
import ReactFauxDom from 'react-faux-dom';

import * as d3 from "d3";
import * as mobx from 'mobx';

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import templateInfoStore from '../../store/templateInfoStore';
import ITemplateElement from '../../store/templateInfoStore';

import '../../styles/TreeView.css';
import { observable } from "mobx";

const ConstructorTreeView: React.FC = () => {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        var el = e.currentTarget.parentElement;
        console.log(el!.getAttribute('id'));
        templateInfoStore.setCellStyle(el!.getAttribute('id')!, "click");
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        var el = e.currentTarget;
        templateInfoStore.setCellStyle(el!.getAttribute('id')!, "enter" );
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
        var el = e.currentTarget;
        templateInfoStore.setCellStyle(el!.getAttribute('id')!, "out" );
    };

    const templateItems = templateInfoStore.templateItems;
    
    return (
       <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            style={{ minHeight: "50%", maxHeight: "96vh", flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>   

            {templateItems.map((item) =>  <TreeItem nodeId={item.attributes['id']}  label={item.attributes['dms:title']} id={item.attributes['id']}>
   
            {item.children.map((ite) => (
                <TreeItem nodeId={ite.attributes['id']} label={ite.name} id={ite.attributes['id']}
                style={mobx.toJS(templateInfoStore.branchAttributes[ite.attributes['id']])}
                >
                {ite.children.map((it) => (
                    <TreeItem nodeId={it.attributes['id']} label={it.name} id={it.attributes['id']} 
                    onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}
                    style={templateInfoStore.branchAttributes[it.attributes['id']] ? mobx.toJS(templateInfoStore.branchAttributes[it.attributes['id']]) : mobx.toJS(templateInfoStore.branchAttr)}>
                    </TreeItem>
                ))}
                </TreeItem>
            ))}
            </TreeItem>)}
        </TreeView>
    );
}

export default observer(ConstructorTreeView);