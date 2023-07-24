import { useEffect, useRef } from "react";
import { observer } from "mobx-react";

import TextForm from "../TextForm";
import TextInput from "../TextInput";
import TimeWidget from "../TimeWidget";
import SimpleTable from "../SimpleTable";

import templateInfoStore, { ITemplateElement } from "../../store/templateInfoStore";

import '../../styles/ViewDocument.css';

const ViewDocument = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const pageWidth = templateInfoStore.templateAttr.width;
    //const pageHeight = templateInfoStore.templateAttr.height;

    const templateItems = templateInfoStore.templateItems;

    const renderItem = (item: ITemplateElement) => {
        return (
            <div 
                key={item.attributes['id']}
                id={item.attributes['id']}
                style={{
                    position: 'absolute',
                    left: +item.attributes['x'],
                    top: +item.attributes['y'],
                    height: item.attributes['dms:widget'] === 'string' ? +item.attributes['height'] : '',
                    width: item.attributes['dms:widget'] === 'string' ? +item.attributes['width'] : ''
                }}>
                    {item.attributes['dms:widget'] === 'table' && <SimpleTable itemTableID={item.attributes['id']} tableView={true}></SimpleTable>}
                    {item.attributes['dms:widget'] === 'string' && <TextInput attributes={item.attributes} name={item.name} id={item.attributes['id']}/>}
                    {item.attributes['dms:widget'] === 'time' && <TimeWidget attributes={item.attributes} value={item.value}/>}
                    {item.attributes['dms:widget'] === 'text' && <TextForm attributes={item.attributes} value={item.value}/>}
            </div>
        );
    }

    useEffect(() => {
        if (divRef.current) {
            const objects = divRef.current.children;
            const coordTemp = templateInfoStore.coordTemp;
            for (let i = 0; i < objects.length; i++) {
                const obj1 = objects[i] as HTMLElement;
                const findObj = coordTemp.find(item => item.id === obj1.id);
                const rect1 = obj1.getBoundingClientRect();
                console.log(rect1.height, findObj?.height);
                if (+rect1.height > +findObj?.height!) {
                    const diffHeidth = +rect1.height - +findObj?.height!;

                    for (let j = i + 1; j < objects.length; j++) {
                        const obj2 = objects[j] as HTMLElement;
                        const rect2 = obj2.getBoundingClientRect();

                        if (rect1.top < rect2.top && rect1.left < rect2.right && rect1.right > rect2.left) {
                            const findObj2 = coordTemp.find(item => item.id === obj2.id);
                            findObj2!.y = +findObj2!.y + diffHeidth;
                        }
                    }
                }
            }
            coordTemp.forEach(item => {
                templateInfoStore.setAttrib(item!.id, 'y', +item!.y);
            });
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