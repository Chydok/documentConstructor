import React from 'react';
import { observer } from 'mobx-react';
import toJS  from 'mobx';

import MainMenu from './components/MainMenu';
import SvgBlock from './components/workingPanel/SvgBlock';
import ToolbarEditor from './components/constructorToolbar/ConstructorToolbar';
import ViewDocument from './components/viewDocument/ViewDocument';

import './styles/App.css';
import templateInfoStore from './store/templateInfoStore';
import ConstructorTreeView from './components/TreeView/TreeView';

templateInfoStore.removeStore();

if (window.location.pathname === '/') {
    const testXml = require('./production_log.xml');
    fetch(testXml).then(response => response.text()).then(text => {
        const parser: DOMParser = new DOMParser();
        const xmlDoc: Document = parser.parseFromString(text, 'text/xml');

        templateInfoStore.setTemplateInfo(xmlDoc.documentElement);
    });
} 
if (window.location.pathname === '/view') {
    const testXml = require('./data.xml');
    fetch(testXml).then(response => response.text()).then(text => {
        const parser: DOMParser = new DOMParser();
        const xmlDoc: Document = parser.parseFromString(text, 'text/xml');

        templateInfoStore.setTemplateInfo(xmlDoc.documentElement);
    });
    const testXmlView = require('./dataView.xml');
    fetch(testXmlView).then(response => response.text()).then(text => {
        const parser: DOMParser = new DOMParser();
        const xmlDoc: Document = parser.parseFromString(text, 'text/xml');

        templateInfoStore.dataXml = xmlDoc;
    });
}

const App = () => {
    return (
        <>
            <MainMenu />
            <div className='workDiv'>
                {window.location.pathname === '/' && 
                    <><ConstructorTreeView /><SvgBlock /><ToolbarEditor /></>}
                {window.location.pathname === '/view' && <><ViewDocument /></>}
            </div>
        </>
    );
}

export default observer(App);
