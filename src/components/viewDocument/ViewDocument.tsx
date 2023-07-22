import { useEffect, useRef } from "react";
import { observer } from "mobx-react";

import SimpleTable from "../SimpleTable";
import TextInput from "../TextInput";
import TimeWidget from "../TimeWidget";

import templateInfoStore, { ITemplateElement } from "../../store/templateInfoStore";

import '../../styles/ViewDocument.css';
import { toJS } from "mobx";
import TextForm from "../TextForm";

const ViewDocument = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const pageWidth = templateInfoStore.templateAttr.width;
    //const pageHeight = templateInfoStore.templateAttr.height;

    const templateItems = toJS(templateInfoStore.templateItems);

    const renderItem = (item: ITemplateElement) => {
        if (item.attributes['dms:widget'] === 'table') {
            return (
                <div 
                    key={item.attributes['id']}
                    id={item.attributes['id']}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                    }}>
                    <SimpleTable itemTableID={item.attributes['id']} tableView={true}></SimpleTable>
                </div>
            );
        }

        if (item.attributes['dms:widget'] === 'string') {
            return (
                <div
                    key={item.attributes['id']}
                    id={item.attributes['id']}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                        height: +item.attributes['height'],
                        width: +item.attributes['width']
                    }}>
                    <TextInput attributes={item.attributes} name={item.name} id={item.attributes['id']}/>
                </div>
            );
        }

        if (item.attributes['dms:widget'] === 'time') {
            return (
                <div
                    key={item.attributes['id']}
                    id={item.attributes['id']}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                    }}>
                    <TimeWidget attributes={item.attributes} value={item.value}/>
                </div>
            );
        }

        if (item.attributes['dms:widget'] === 'text') {
            return (
                <div
                    key={item.attributes['id']}
                    id={item.attributes['id']}
                    style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                    }}>
                    <TextForm attributes={item.attributes} value={item.value}/>
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
                const findObj = coordTemp.find(item => item.id === obj1.id);
                const rect1 = obj1.getBoundingClientRect();

                if (+rect1.height > +findObj?.height!) {
                    const diffHeidth = +rect1.height - +findObj?.height!;

                    for (let j = i + 1; j < objects.length; j++) {
                        const obj2 = objects[j] as HTMLElement;
                        const rect2 = obj2.getBoundingClientRect();

                        if (rect1.top < rect2.top && rect1.left < rect2.right && rect1.right > rect2.left) {
                            const findObj2 = coordTemp.find(item => item.id === obj2.id);
                            templateInfoStore.setAttrib(findObj2!.id, 'y', +findObj2!.y + diffHeidth);
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