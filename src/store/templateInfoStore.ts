import { makeAutoObservable } from "mobx";
import { xmlToArray } from "../util/parser";
import { observable } from 'mobx';
import { action } from 'mobx';
import * as mobx from 'mobx';

export interface ITemplateElement {
    name: string,
    attributes: any,
    children: Array<ITemplateElement>,
    value: string
}

export interface ItemplateAttr {
    width: number,
    height: number,
    backgroundColor: string,
    display?: string,
    overflow?: string
    Position?: string
}

export interface ICellAttr {
    backgroundColor: string,
    display?: string,
    width?: string,
    margin?: number,
    padding?: number,
    outline?: number,
    padding_left?: string,
    top?: number,
    height?: string,
}

export interface ICoords {
    name: string,
    x: number,
    y: number
}

export interface CellAttributes {
    [key: string]: ICellAttr;
}

export interface BranchAttributes {
    [key: string]: ICellAttr;
}

export interface ElemCoords {
    [key: string]: ICoords;
}

export interface ITreeAttr {
    backgroundColor: string,
}

class templateInfoStore {
    cellAttributes: CellAttributes = {};
    branchAttributes: BranchAttributes = {};
    coordTarget: string = '';
    paramTarget: string = '';
    coords = [2];
    params = [2];

    setCoords = (x: number, y: number) => {
        this.coords[0] = x;
        this.coords[1] = y;
    }

    setParams = (w: number, h: number) => {
        this.params[0] = w;
        this.params[1] = h;
    }

    setTarget = (elemId: string) => {
        var findElem: ITemplateElement;
        this.templateItems.find(item => {
            if (item.attributes['id'] === elemId) {
                findElem = item;
                return;
            }
            item.children.find(childrenItem => {
                if (childrenItem.attributes['id'] === elemId) {
                    findElem = childrenItem;
                    return;
                }
                childrenItem.children.find(element => {
                    if (element.attributes['id'] === elemId) {
                        findElem = element;
                        return;
                    }
                });
            });
        });

        this.paramTarget = findElem!.attributes['id'];
        
        this.params[0] = findElem!.attributes['width'];
        this.params[1] = findElem!.attributes['height'];
        console.log('элемент: ' + findElem!.attributes['id']);
        return findElem!;
    }

    setCellStyle = (elemId: string, type: string) => {
        if (type === 'click') {
            if (this.cellAttributes[elemId] !== this.cellAttr2) {
                this.cellAttributes[elemId] = this.cellAttr2;
                this.branchAttributes[elemId] = this.branchAttr2;
                this.setTarget(elemId);
                // this.paramTarget = elemId;
            } else {
                this.cellAttributes[elemId] = this.cellAttr;
                this.branchAttributes[elemId] = this.branchAttr;
            }
        } else if (this.cellAttributes[elemId] !== this.cellAttr2) {
            if ((type === 'enter') && (this.cellAttributes[elemId] !== this.cellAttr3)) {
                this.cellAttributes[elemId] = this.cellAttr3;
                this.branchAttributes[elemId] = this.branchAttr3;
            } else if ((type === 'out') && (this.cellAttributes[elemId] !== this.cellAttr2)) {
                this.cellAttributes[elemId] = this.cellAttr;
                this.branchAttributes[elemId] = this.branchAttr;
            }
        }
    };
  
    removeCellStyle = (cellId: string) => {
      delete this.cellAttributes[cellId];
    };
    
    templateItems: Array<ITemplateElement> = [];
    templateAttr: ItemplateAttr = {
        width: 1240,
        height: 550,
        backgroundColor: "white",
        display: "table-cell",
        overflow: "hidden"
    };
    cellAttr: ICellAttr = {
        height: "25",
        width: "25",
        backgroundColor: "transparent",
        // display: "table-cell",
    };
    cellAttr2: ICellAttr = {
        height: "100%",
        width: "100px",
        backgroundColor: "lightgray",
    };
    cellAttr3: ICellAttr = {
        height: "100%",
        width: "100px",
        backgroundColor: "lightblue",
    };
    branchAttr: ICellAttr = {
        backgroundColor: "white",
        width: "100%",
        margin: 0,
        padding: 0,
        outline: 0,
        padding_left: "4px",
    };
    branchAttr2: ICellAttr = {
        backgroundColor: "lightgray",
        width: "100%",
        margin: 0,
        padding: 0,
        outline: 0,
        padding_left: "4px"
    };
    branchAttr3: ICellAttr = {
        backgroundColor: "lightblue",
        width: "100%",
        margin: 0,
        padding: 0,
        outline: 0,
        padding_left: "4px"
    };
    treeAttr: ITreeAttr = {
        backgroundColor: "white",
    };
    dataXml?: Document;

    constructor() {
        makeAutoObservable(this);
    }

    setTreeStyle = (elemId: string, attribName: string, value: string | number) => {
        var findItem = this.templateItems[0];
        findItem.attributes[attribName] = value;
        this.templateItems.find(item => {
            if (item.attributes['id'] === elemId) {
                findItem = item;
                return;
            }
            item.children.find(childrenItem => {
                if (childrenItem.attributes['id'] === elemId) {
                    findItem = childrenItem;
                    return;
                }
                childrenItem.children.find(element => {
                    if (element.attributes['id'] === elemId) {
                        findItem = element;
                        return;
                    }
                });
            });
        });
        if ((typeof findItem !== 'undefined') && (typeof findItem !== null)) {
            findItem.attributes[attribName] = value;
            this.cellAttr.backgroundColor = value.toString();
        }
    };

    getElementStyle = () => {
        return mobx.toJS(this.cellAttr);
    };

    setTemplateInfo = (xml: HTMLElement) => {
        if (xml.attributes.getNamedItem('width') && xml.attributes.getNamedItem('width')?.nodeValue) {
            this.templateAttr.width = +xml.attributes.getNamedItem('width')?.nodeValue!;
        }
        if (xml.attributes.getNamedItem('height')) {
            this.templateAttr.height = +xml.attributes.getNamedItem('height')?.nodeValue!;
        }
        this.templateItems = xmlToArray(xml);
    }

    changeCoord = (nameElem: string, x: number, y: number) => {
        if (nameElem !== ''){
            const findElem: ITemplateElement | undefined = this.templateItems.find(item => item.name === nameElem);
            findElem!.attributes['x'] = x;
            findElem!.attributes['y'] = y;
            this.coords[0] = x;
            this.coords[1] = y;
            this.coordTarget = nameElem;
        }
    }

    changeParam = (nameElem: string, x: number, y: number) => {
        if (nameElem !== ''){
            const findElem: ITemplateElement | undefined = this.templateItems.find(item => { 
                if (item.name === nameElem) {
                    return item;
                }
                var ele = item.children.find(child => {
                    if (child.attributes['id'] === nameElem) {
                        return child;
                    }
                    var el = child.children.find(chi => {
                        if (chi.attributes['id'] === nameElem) {
                            return chi;
                        }
                    });
                    return el;
                });
                return ele;
            });
            console.log('элемент: ' + findElem);
            // findElem!.attributes['width'] = x;
            // findElem!.attributes['height'] = y;
            this.params[0] = x;
            this.params[1] = y;
            this.paramTarget = nameElem;
        }
    }

    setAttrib = (elemId: any, attribName: string, value: string | number) => {
        const findItem = this.templateItems.find(item => {
            if (item.attributes['id'] === elemId) {
                return item;
            }
            return item.children.find((childrenItem => childrenItem.attributes['id'] === elemId));
        });
        if (typeof findItem !== 'undefined') {
            findItem.attributes[attribName] = value;
        }
    }

    removeStore = () => {
        this.templateItems = [];
        this.templateAttr = {
            width: 1240,
            height: 550,
            backgroundColor: "white",
            display: "table-cell",
            overflow: "hidden"
        };
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new templateInfoStore();
// export default todoStore();