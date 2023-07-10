import { useEffect, useRef } from "react";
import { observer } from "mobx-react";

import SimpleTable from "../SimpleTable";
import TextInput from "../TextInput";

import templateInfoStore, { ITemplateElement } from "../../store/templateInfoStore";

import '../../styles/ViewDocument.css';

const ViewDocument = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const pageWidth = templateInfoStore.templateAttr.width;
    //const pageHeight = templateInfoStore.templateAttr.height;

    const templateItems = templateInfoStore.templateItems;

    const renderItem = (item: ITemplateElement, itemKey: number) => {
        if (item.attributes['dms:widget'] === 'table') {
            return (
                <div 
                    key={item.name}
                    id={item.name}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                    }}>
                    <SimpleTable itemTableKey={itemKey} tableView={true}></SimpleTable>
                </div>
            );
        }
        if (item.attributes['dms:widget'] === 'string') {
            const xmlDoc = templateInfoStore.dataXml;
            const stringInfo = xmlDoc ? xmlDoc.getElementsByTagName(item.name)[0].textContent : '';

            return (
                <div
                    key={item.name}
                    id={item.name}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                    }}>
                    <TextInput attributes={item.attributes} inputText={stringInfo || ''}/>
                </div>
            );
        }
    }

    useEffect(() => {
        if (divRef.current) {
            const objects = divRef.current.children;

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
                                const findObj = templateItems.find(item => item.name === obj1.id);
                                const obj1Height = findObj?.attributes['dms:widget'] === 'table' ? +rect1.bottom - +findObj?.attributes['height'] : 0;
                                const objItemMove = templateItems.find(item => item.name === obj2.id);
                                if (objItemMove) {
                                    templateInfoStore.setAttrib(
                                        objItemMove.attributes['id'],
                                        'y',
                                        (+objItemMove.attributes['y'] + obj1Height)
                                    );
                                }
                            }
                        }

                        if (rect2.top < rect1.top) {
                            if (rect2.bottom > rect1.top) {
                                const findObj = templateItems.find(item => item.name === obj2.id);
                                const obj1Height = findObj?.attributes['dms:widget'] === 'table' ? +rect2.bottom - +findObj?.attributes['height'] : 0;
                                const objItemMove = templateItems.find(item => item.name === obj1.id);
                                if (objItemMove) {
                                    console.log(+objItemMove.attributes['y'], (obj1Height));
                                    templateInfoStore.setAttrib(
                                        objItemMove.attributes['id'],
                                        'y',
                                        (+objItemMove.attributes['y'] + obj1Height)
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
                {templateItems.map((item, itemKey) => renderItem(item, itemKey))}
            </div>
        </div>
    );
}

export default observer(ViewDocument);