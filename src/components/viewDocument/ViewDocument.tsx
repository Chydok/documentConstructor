import { useEffect, useRef } from "react";
import { observer } from "mobx-react";

import SimpleTable from "../SimpleTable";
import TextInput from "../TextInput";
import TimeWidget from "../TimeWidget";

import templateInfoStore, { ITemplateElement } from "../../store/templateInfoStore";

import '../../styles/ViewDocument.css';
import { toJS } from "mobx";

const ViewDocument = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const pageWidth = templateInfoStore.templateAttr.width;
    //const pageHeight = templateInfoStore.templateAttr.height;

    const templateItems = toJS(templateInfoStore.templateItems);

    const renderItem = (item: ITemplateElement) => {
        const xmlDoc = templateInfoStore.dataXml;
        if (item.attributes['dms:widget'] === 'table') {
            return (
                <div 
                    key={item.name}
                    id={item.name}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                        fontStyle: 'italic'
                    }}>
                    <SimpleTable itemTableID={item.attributes['id']} tableView={true}></SimpleTable>
                </div>
            );
        }
        if (item.attributes['dms:widget'] === 'string') {
            const stringInfo = xmlDoc && xmlDoc.getElementsByTagName(item.name)[0] ? xmlDoc.getElementsByTagName(item.name)[0].textContent : '';
            return (
                <div
                    key={item.name}
                    id={item.name}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                    }}>
                    <TextInput name={item.name} inputText={stringInfo || ''}/>
                </div>
            );
        }

        if (item.attributes['dms:widget'] === 'time') {
            const stringInfo = xmlDoc && xmlDoc.getElementsByTagName(item.name)[0] ? xmlDoc.getElementsByTagName(item.name)[0].textContent : '';
            return (
                <div
                    key={item.name}
                    id={item.name}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                    }}>
                    <TimeWidget attributes={item.attributes} value={stringInfo && stringInfo !== '' ? stringInfo : item.value}/>
                </div>
            );
        }
    }

    useEffect(() => {
        if (divRef.current) {
            const objects = divRef.current.children;
            const coordTemp = templateInfoStore.coordTemp;
            for (let i = 0; i < objects.length; i++) {
                const obj1 = objects[i] as HTMLElement;
                const rect1 = obj1.getBoundingClientRect();

                for (let j = i + 1; j < objects.length; j++) {
                    const obj2 = objects[j] as HTMLElement;
                    const rect2 = obj2.getBoundingClientRect();

                    if (rect1.left < rect2.right && rect1.right > rect2.left &&
                        rect1.top < rect2.bottom && rect1.bottom > rect2.top) {
                        if (rect1.top < rect2.top) {
                            if (rect1.bottom > rect2.top) {
                                const findObj = coordTemp.find(item => item.name === obj1.id);
                                const findObj2 = coordTemp.find(item => item.name === obj2.id);
                                const objDiff = findObj?.widget === 'table' ?
                                    +findObj2!.y - ((+findObj?.y) + findObj?.height)
                                    : 0;
                                if (findObj2) {
                                    templateInfoStore.setAttrib(
                                        findObj2.id,
                                        'y',
                                        (+rect1.bottom + objDiff)
                                    );
                                }
                            }
                        }

                        if (rect2.top < rect1.top) {
                            if (rect2.bottom > rect1.top) {
                                const findObj = coordTemp.find(item => item.name === obj2.id);
                                const findObj2 = coordTemp.find(item => item.name === obj1.id);
                                const objDiff = findObj?.widget === 'table' ?
                                    +findObj2!.y - ((+findObj?.y) + findObj?.height)
                                    : 0;
                                if (findObj2) {
                                    templateInfoStore.setAttrib(
                                        findObj2.id,
                                        'y',
                                        (+rect2.bottom + objDiff)
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [templateItems]);

    return (
        <div className="viewDiv">
            <div ref={divRef} style={{
                position: 'relative',
                width: pageWidth,
                backgroundColor: 'white'
            }}>
                {templateItems.map((item) => renderItem(item))}
            </div>
        </div>
    );
}

export default observer(ViewDocument);