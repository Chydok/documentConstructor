import { makeAutoObservable } from "mobx";
import { xmlToArray } from "../util/parser";

export interface ITemplateElement {
    name: string,
    attributes: any,
    children: Array<ITemplateElement>,
    value: string
}

export interface ItemplateAttr {
    width: number,
    height: number,
}

class templateInfoStore {
    templateItems: Array<ITemplateElement> = [];
    templateAttr: ItemplateAttr = {
        width: 1240,
        height: 550,
    };
    dataXml?: Document;

    constructor() {
        makeAutoObservable(this);
    }

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
        const findElem: ITemplateElement | undefined = this.templateItems.find( item => item.name === nameElem)
        findElem!.attributes['x'] = x;
        findElem!.attributes['y'] = y;
    }

    setAttrib = (elemId: string, attribName: string, value: string | number) => {
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

    addElement = (item: ITemplateElement) => {
        this.templateItems.push(item);
    }

    removeStore = () => {
        this.templateItems = [];
        this.templateAttr = {
            width: 1240,
            height: 550,
        };
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new templateInfoStore();