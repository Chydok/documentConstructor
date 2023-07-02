import React from 'react';
import { observer } from 'mobx-react';

import MainMenu from './components/MainMenu';
import SvgBlock from './components/workingPanel/SvgBlock';
import ToolbarEditor from './components/toolbarEditor/ToolbarEditor';

import templateInfoStore from './store/templateInfoStore';

import './styles/App.css';


const testXml = require('./production_log.xml');
fetch(testXml).then(response => response.text()).then(text => {
    const parser: DOMParser = new DOMParser();
    const xmlDoc: Document = parser.parseFromString(text, 'text/xml');

    templateInfoStore.setTemplateInfo(xmlDoc.documentElement);
});

const App = () => {
    return (
        <>
            <MainMenu />
            <div className='workDiv'>
                <SvgBlock />
                <ToolbarEditor />
            </div>
        </>
    );
}

export default observer(App);
