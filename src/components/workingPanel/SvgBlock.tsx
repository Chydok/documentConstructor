import React, { useEffect } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import ReactFauxDom from 'react-faux-dom';
import * as d3 from "d3";

import SimpleTable from "../SimpleTable";
import TextInput from "../TextInput";

import templateInfoStore from '../../store/templateInfoStore';

import '../../styles/WorkingPanel.css';

const SvgBlock: React.FC<{}> = ({}) => {
    const svgSpace: ReactFauxDom.Element = new ReactFauxDom.Element('svg');
    const templateItems = templateInfoStore.templateItems;
    d3.select('svg')
        .attr('width', templateInfoStore.templateAttr.width)
        .attr('height', templateInfoStore.templateAttr.height)
        .style('background-color', 'white')
        .on('click', () => {
            templateInfoStore.setSelectedItem('');
        });

    const gridSize = 20;
    const grid = d3.select(svgSpace)
                    .append('g')
                    .attr('class', 'grid');
    for (let x = 0; x < templateInfoStore.templateAttr.width; x += gridSize) {
        for (let y = 0; y < templateInfoStore.templateAttr.height; y += gridSize) {
            grid.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', gridSize)
                .attr('height', gridSize)
                .attr('fill', 'none')
                .attr('stroke', 'darkgray')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', 2.2);
        }
    }

    templateItems.forEach((item, itemKey) => {
        const newGroup = d3.select(svgSpace)
                .append('g')
                .attr('class', 'newGroup')
                .attr('id', `#${item.name}`)
                .attr('x', +item.attributes['x'])
                .attr('y', +item.attributes['y'])
                .style("cursor", "pointer");

        if (['table', 'string'].indexOf(item.attributes['dms:widget']) !== -1) {
            let addHtmlElement = <></>;
            switch (item.attributes['dms:widget']) {
                case 'table':
                    addHtmlElement = <SimpleTable itemTableKey={itemKey}></SimpleTable>;
                    break;
                case 'string':
                    addHtmlElement = <TextInput attributes={item.attributes} inputText={''}/>
                    break;
            }
            newGroup.append('foreignObject')
                    .attr('x', +item.attributes['x'])
                    .attr('y', +item.attributes['y'])
                    .attr('width', item.attributes['width'] ? item.attributes['width'] + 5 : 100)
                    .attr('height', item.attributes['height'] ? item.attributes['height'] + 5 : 65)
                    .append('xhtml:div')
                        .style('display', 'flex')
                        .style('align-items', 'end')
                        .style('width', '100%')
                        .style('height', '100%')
                        // @ts-ignore
                        .html(addHtmlElement);

            newGroup.append('rect')
                    .attr('x', +item.attributes['x'])
                    .attr('y', +item.attributes['y'])
                    .attr('width', item.attributes['width'] ? item.attributes['width'] + 5 : 100)
                    .attr('height', item.attributes['height'] ? item.attributes['height'] + 5 : 65)
                    .attr('fill', 'transparent')
                    .attr('stroke', `${item.attributes['selected'] === true ? '#408BD5' : ''}`)
                    .attr('stroke-width', 2)
                    .on('click', () => {
                        templateInfoStore.setSelectedItem(item.attributes['id']);
                        templateInfoStore.setAttrib(item.attributes['id'], 'selected', true);
                    })
                    .attr('stroke-dasharray', 5.5);
        }
    });

    useEffect(()=>{
        const delta = {x: 0, y: 0};
        d3.selectAll('g.newGroup')
            .data(templateItems)
            .call(d3.drag<any, any>()
                .on('start', (event, d) => {
                    const currentX = +d.attributes['x'];
                    const currentY = +d.attributes['y'];
                    delta.x = event.sourceEvent.x - currentX;
                    delta.y = event.sourceEvent.y - currentY;
                    templateInfoStore.setSelectedItem(d.attributes['id']);
                    templateInfoStore.setAttrib(d.attributes['id'], 'selected', true);
                })
                .on('drag', (event, d) => {
                    const moveX = event.sourceEvent.x - delta.x;
                    const moveY = event.sourceEvent.y - delta.y;
                    const x = moveX > 0 ? Math.round(moveX / gridSize) * gridSize : 0;
                    const y = moveY > 0 ? Math.round(moveY / gridSize) * gridSize : 0;
                    templateInfoStore.changeCoord(d.name, x, y);
                }));
    }, [toJS(templateItems)]);

    return (
        <div className="svgDiv">
            {svgSpace!.toReact()}
        </div>
    );
}

export default observer(SvgBlock);