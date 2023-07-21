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

export interface ICoordTemp {
    id: string,
    name: string,
    x: number,
    y: number,
    widget: string,
    height: number,
    width: number,
}

class templateInfoStore {
    templateItems: Array<ITemplateElement> = [];
    templateAttr: ItemplateAttr = {
        width: 1240,
        height: 550,
    };
    dataXml?: Document;
    selectedItems: string = '';
    lastId: number = 1;
    coordTemp: Array<ICoordTemp> = [];

    constructor() {
        makeAutoObservable(this);
    }

    generateIds(items: ITemplateElement[], counter: number): number {
        items.forEach((item) => {
          item.attributes['id'] = `dms_${counter}`;
          counter++;
          if (item.children.length > 0) {
            counter = this.generateIds(item.children, counter);
          }
        });
        return counter;
    }

    setTemplateInfo = (xml: HTMLElement) => {
        if (xml.attributes.getNamedItem('width') && xml.attributes.getNamedItem('width')?.nodeValue) {
            this.templateAttr.width = +xml.attributes.getNamedItem('width')?.nodeValue!;
        }
        if (xml.attributes.getNamedItem('height')) {
            this.templateAttr.height = +xml.attributes.getNamedItem('height')?.nodeValue!;
        }
        this.templateItems = xmlToArray(xml);
        this.lastId = this.generateIds(this.templateItems, this.lastId);

        if (window.location.pathname === '/view') {
            for (let item of this.templateItems) {
                const findObj = item;
                this.coordTemp.push({
                    id: findObj?.attributes['id'],
                    name: findObj?.name,
                    x: +findObj?.attributes['x'],
                    y: +findObj?.attributes['y'],
                    widget: findObj?.attributes['dms:widget'],
                    height: +findObj?.attributes['height'],
                    width: +findObj?.attributes['width'],
                });
            }
        }
    }

    changeCoord = (nameElem: string, x: number, y: number) => {
        const findElem: ITemplateElement | undefined = this.templateItems.find( item => item.attributes['id'] === nameElem)
        findElem!.attributes['x'] = x;
        findElem!.attributes['y'] = y;
    }

    searchByName(targetId: string): ITemplateElement {
        const result: ITemplateElement[] = [];
    
        const findNode = (node: ITemplateElement) => {
          if (node.attributes['id'] === targetId) {
            result.push(node);
          }
    
          for (const child of node.children) {
            findNode(child);
          }
        };
    
        for (const node of this.templateItems) {
          findNode(node);
        }
    
        return result[0];
    }

    setSelectedItem = (newSelectItem: string) => {
        this.setAttrib(this.selectedItems, 'selected', false);
        this.selectedItems = newSelectItem;
    }

    setAttrib = (elemId: string, attribName: string, value: string | number | boolean) => {
        const findElem = this.searchByName(elemId);
        if (typeof findElem !== 'undefined') {
            findElem.attributes[attribName] = value;
        }
    }

    addElement = (item: ITemplateElement) => {
        this.lastId = this.generateIds([item], this.lastId);
        this.templateItems.push(item);
    }

    addChild = (elemId: string, child: ITemplateElement) => {
        const findElem = this.searchByName(elemId);
        if (typeof findElem !== 'undefined') {
            //console.log("old:", findElem.children)
            findElem.children.push(child);
            //console.log("\nnew:", findElem.children)
        }
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