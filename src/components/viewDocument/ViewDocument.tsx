import { observer } from "mobx-react";
import templateInfoStore from "../../store/templateInfoStore";
import "../../styles/WorkingPanel";

const ViewDocument = () => {
    const pageWidth = templateInfoStore.templateAttr.width;
    const pageHeight = templateInfoStore.templateAttr.height;

    return (
        <div className="svgDiv">
            <div style={{width: pageWidth}}>

            </div>
        </div>
    );
}

export default observer(ViewDocument);