import { observer } from "mobx-react";

import templateInfoStore, { ItemplateElement } from "../../store/templateInfoStore";

import '../../styles/ViewDocument.css'
import SimpleTable from "../SimpleTable";

const ViewDocument = () => {
    const pageWidth = templateInfoStore.templateAttr.width;
    //const pageHeight = templateInfoStore.templateAttr.height;

    const templateItems = templateInfoStore.templateItems;

    const renderItem = (item: ItemplateElement, itemKey: number) => {
        if (item.attributes['dms:widget'] === 'table') {
            return (
                <div key={item.name} style={{
                        position: 'absolute',
                        left: +item.attributes['x'],
                        top: +item.attributes['y'],
                    }}>
                    <SimpleTable itemTableKey={itemKey} tableView={true}></SimpleTable>
                </div>
            );
        }
    }
    return (
        <div className="viewDiv">
            <div style={{
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