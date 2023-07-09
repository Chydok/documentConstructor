import { ITemplateElement } from "../store/templateInfoStore";

export function xmlToArray (xml: HTMLElement) {
    const tempDocArr: Array<ITemplateElement> = [];
    xml.childNodes.forEach(xmlItem => {
        if (xmlItem.nodeType === Node.ELEMENT_NODE) {
            const element: ITemplateElement = {name: xmlItem.nodeName, attributes:{}, children: [], value: ''}

            if (!xmlItem.parentElement?.parentElement) {
                if (xml.getElementsByTagName(xmlItem.nodeName)[0].attributes.getNamedItem('x') === null) {
                    element.attributes['x'] = 0;
                }
                if (xml.getElementsByTagName(xmlItem.nodeName)[0].attributes.getNamedItem('y') === null) {
                    element.attributes['y'] = 0;
                }
            }

            if (xmlItem.nodeName === 'record' || xmlItem.nodeName === 'columns') {
                if (xml.getElementsByTagName(xmlItem.nodeName)[0].attributes.getNamedItem('height') === null) {
                    element.attributes['height'] = 20;
                }
            }

            for (let i = 0; i < xml.getElementsByTagName(xmlItem.nodeName)[0].attributes.length; i++) {
                const nodeAttr = xml.getElementsByTagName(xmlItem.nodeName)[0].attributes[i];
                element.attributes[nodeAttr.nodeName] = nodeAttr.nodeValue;
                if (nodeAttr.nodeName === 'dms:widget' && nodeAttr.nodeValue === 'string') {
                    element.value = xmlItem.textContent || '';
                }
            }
            if (xmlItem.childNodes.length > 0) {
                element.children = xmlToArray(xmlItem as HTMLElement);
            }
            tempDocArr.push(element);
        }
    });
    return tempDocArr;
}

export function storeToXml(xmlDoc: Element, storeItems: Array<ITemplateElement>) {
    for (let item of storeItems) {
        if (xmlDoc.getElementsByTagName(item.name)[0]) {
            const findXmlElem = xmlDoc.getElementsByTagName(item.name)[0];
            for (let attr in item.attributes) {
                findXmlElem.setAttribute(attr, item.attributes[attr]);
            }
            if (item.children.length > 0) {
                storeToXml(findXmlElem, item.children);
            }
        }
    };
   return xmlDoc;
}