import React from 'react';
import { observer } from 'mobx-react';

import MainMenu from './components/MainMenu';
import SvgBlock from './components/workingPanel/SvgBlock';
import ConstructorToolbar from './components/constructorToolbar/ConstructorToolbar';
import ViewDocument from './components/viewDocument/ViewDocument';

import './styles/App.css';
import templateInfoStore from './store/templateInfoStore';
import ConstructorTreeView from './components/TreeView/TreeView';

templateInfoStore.removeStore();

if (window.location.pathname === '/') {
    const testXml = require('./new_new_data.xml');
    fetch(testXml).then(response => response.text()).then(text => {
        const parser: DOMParser = new DOMParser();
        const xmlDoc: Document = parser.parseFromString(text, 'text/xml');

        templateInfoStore.setTemplateInfo(xmlDoc.documentElement);
    });
}
if (window.location.pathname === '/view') {
    const testXml = require('./new_new_data.xml');
    fetch(testXml).then(response => response.text()).then(text => {
        const parser: DOMParser = new DOMParser();
        const xmlDoc: Document = parser.parseFromString(text, 'text/xml');

        templateInfoStore.setTemplateInfo(xmlDoc.documentElement);
    });
    const testXmlView = require('./new_new_data.xml');
    fetch(testXmlView).then(response => response.text()).then(text => {
        const parser: DOMParser = new DOMParser();
        const xmlDoc: Document = parser.parseFromString(text, 'text/xml');

        templateInfoStore.dataXml = xmlDoc;
    });

}

const App: React.FC = () => {
    return (
        <>
            <MainMenu />
            <div className='workDiv'>
                {window.location.pathname === '/' && 
                    <>
                        <ConstructorTreeView />
                        <SvgBlock />
                        <ConstructorToolbar />
                    </>}
                {window.location.pathname === '/view' && <><ViewDocument /></>}
            </div>
        </>
    );
}

export default observer(App);
