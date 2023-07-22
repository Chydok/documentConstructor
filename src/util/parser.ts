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
        } else {
            const tempXmlDoc = document.implementation.createDocument('', '', null);
            const xmlElem = tempXmlDoc.createElement(item.name);
            for (let attr in item.attributes) {
                xmlElem.setAttribute(attr, item.attributes[attr]);
            }
            if (item.children.length > 0) {
                storeToXml(xmlElem, item.children);
            }
            xmlDoc.appendChild(xmlElem);
        }
    };
    return xmlDoc;
}

export function createXml(templateItems: Array<ITemplateElement>): Document {
    const xmlDoc = document.implementation.createDocument('', '', null);
    const rootElem = xmlDoc.createElement('root');
    xmlDoc.appendChild(rootElem);

    for (let item of templateItems) {
        const xmlElem = xmlDoc.createElement(item.name);
        for (let attr in item.attributes) {
            xmlElem.setAttribute(attr, item.attributes[attr]);
        }
        if (item.value) {
            xmlElem.textContent = item.value;
        }
        if (item.children.length > 0) {
            for (let child of item.children) {
                const childXmlElem = xmlDoc.createElement(child.name);
                for (let attr in child.attributes) {
                    childXmlElem.setAttribute(attr, child.attributes[attr]);
                }
                if (child.value) {
                    childXmlElem.textContent = child.value;
                }
                xmlElem.appendChild(childXmlElem);
            }
        }
        rootElem.appendChild(xmlElem);
    }

    return xmlDoc;
  }
