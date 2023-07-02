import { makeAutoObservable } from "mobx";
import { xmlToArray } from "../util/parser";

export interface ItemplateElement {
    name: string,
    attributes: any,
    children: Array<ItemplateElement>,
    value: string
}

export interface ItemplateAttr {
    width: number,
    height: number,
}

class templateInfoStore {
    templateItems: Array<ItemplateElement> = [];
    templateAttr: ItemplateAttr = {
        width: 1240,
        height: 550,
    };

    constructor() {
        makeAutoObservable(this);
    }

    setTemplateInfo = (xml: HTMLElement) => {
        this.templateAttr.width = xml.attributes.getNamedItem('width') ? Number(xml.attributes.getNamedItem('width')) : this.templateAttr.width;
        this.templateAttr.height = xml.attributes.getNamedItem('height') ? Number(xml.attributes.getNamedItem('height')) : this.templateAttr.height;
        this.templateItems = xmlToArray(xml);
    }

    changeCoord = (nameElem: string, x: number, y: number) => {
        const findElem: ItemplateElement | undefined = this.templateItems.find( item => item.name === nameElem)
        findElem!.attributes['x'] = x;
        findElem!.attributes['y'] = y;
    }
}

export default new templateInfoStore();