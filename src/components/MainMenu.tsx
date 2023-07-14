import React from 'react';
import { observer } from 'mobx-react';
import '../styles/MainMenu.css';
import templateInfoStore from '../store/templateInfoStore';
import { get } from 'mobx';
import { createXml } from '../util/parser';

const MainMenu = () => {
    return (
        <div className='mainDiv'>
            <div className='mainInfo'>Document Constructor</div>
            <button 
                className='menuSaveButton'
                onClick={() => {
                    const testXml = require('../production_log.xml');
                    fetch(testXml).then(response => response.text()).then(text => {
                        const parser: DOMParser = new DOMParser();
                        const xmlDoc: Document = parser.parseFromString(text, 'text/xml');
                        
                        for (let attr in templateInfoStore.templateAttr) {
                            xmlDoc.documentElement.setAttribute(attr, get(templateInfoStore.templateAttr, attr)) 
                        }
                        const newXmlDoc = createXml(templateInfoStore.templateItems);
                        const serializer = new XMLSerializer();
                        const xmlString = serializer.serializeToString(newXmlDoc);
                        const xhr = new XMLHttpRequest();
                        xhr.open('GET', `data:text/xml;charset=utf-8,${encodeURIComponent(xmlString)}`);
                        xhr.responseType = 'blob';
                        xhr.onload = () => {
                        const blob = xhr.response;
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'data.xml';
                        link.click();
                        };
                        xhr.send();
                    });
                }}>
                    Сохранить
            </button>
        </div>
    );
}

export default observer(MainMenu);