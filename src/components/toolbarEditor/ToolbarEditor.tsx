import { observer } from "mobx-react";
import '../../styles/ToolbarEditor.css';

const ToolbarEditor = () => {
    return (
        <div className="toobarDiv">
            <div>
                <div>Координаты:</div>
                <div>
                    <div>X:</div>
                    <input/>
                </div>
                <div >
                    <div>Y:</div>
                    <input/>
                </div>
            </div>
        </div>
    );
}

export default observer(ToolbarEditor);