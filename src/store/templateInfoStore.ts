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
    targetedItems: string = '';
    lastId: number = 1;
    coordTemp: Array<ICoordTemp> = [];
    selectedItemsArray: Array<string> = [];

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
        const findElem: ITemplateElement | undefined = this.templateItems.find(item => item.attributes['id'] === nameElem)
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

    setSelectedItem = (newSelectItem: string, event: any) => {
        if (this.selectedItemsArray.length === 0) { this.setAttrib(this.selectedItems, 'selected', false); }
        this.selectedItems = newSelectItem;
        
        if (event.nativeEvent !== undefined) {
            if (event.nativeEvent.shiftKey) { 
                this.selectedItemsArray.push(newSelectItem); 
            } else {
                if (this.selectedItemsArray.length > 0) {
                    this.selectedItemsArray.forEach(element => {
                        this.setAttrib(element, 'selected', false);
                    });
                    this.selectedItemsArray.length = 0;
                }
            }
        }
    }

    setTargetedItem = (newTargetItem: string) => {
        this.setAttrib(this.targetedItems, 'targeted', false);
        this.targetedItems = newTargetItem;
    }

    setAttrib = (elemId: string, attribName: string, value: string | number | boolean) => { 
        if (this.selectedItemsArray.length > 0 && this.selectedItemsArray.includes(elemId)) {
            this.selectedItemsArray.forEach(element => {
                const findEl = this.searchByName(element);
                if (typeof findEl !== 'undefined') { findEl.attributes[attribName] = value; }
            });
        } else {
            const findElem = this.searchByName(elemId);
            if (typeof findElem !== 'undefined') { findElem.attributes[attribName] = value; }
        }
    }

    setValue = (elemId: string, value: string) => { 
        if (this.selectedItemsArray.length > 0 && this.selectedItemsArray.includes(elemId)) {
            this.selectedItemsArray.forEach(element => {
                const findEl = this.searchByName(element);
                if (typeof findEl !== 'undefined') { findEl.value = value; }
            });
        } else {
            const findElem = this.searchByName(elemId);
            if (typeof findElem !== 'undefined') { findElem.value = value; }
        }
    }

    setName = (elemId: string, name: string) => { 
        const findElem = this.searchByName(elemId);
        if (typeof findElem !== 'undefined') { findElem.name = name; }
    }

    addElement = (item: ITemplateElement) => {
        this.lastId = this.generateIds([item], this.lastId);
        this.templateItems.push(item);
    }

    removeElement = (elemId: string) => {
        const delElem = this.templateItems.indexOf(this.searchByName(elemId));
        if (delElem > -1) {
            this.templateItems.splice(delElem, 1);
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