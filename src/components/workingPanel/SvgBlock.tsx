import * as d3 from "d3";
import { observer } from "mobx-react";
import ReactFauxDom from 'react-faux-dom';

import templateInfoStore from '../../store/templateInfoStore';

import '../../styles/WorkingPanel.css';
import { useEffect } from "react";
import SimpleTable from "../SimpleTable";

const SvgBlock = () => {
    const svgSpace: ReactFauxDom.Element = new ReactFauxDom.Element('svg');
    const templateItems = templateInfoStore.templateItems;
    d3.select('svg')
        .attr('width', templateInfoStore.templateAttr.width)
        .attr('height', templateInfoStore.templateAttr.height)
        .style('background-color', 'white');

    templateItems.forEach((item, itemKey) => {
        const newGroup = d3.select(svgSpace)
                .append('g')
                .attr('class', 'newGroup')
                .attr('id', `#${item.name}`)
                .attr('x', +item.attributes['x'])
                .attr('y', +item.attributes['y'])
                .style("cursor", "pointer")

        if (item.attributes['dms:widget'] === 'table') {
            const simpleTable = <SimpleTable itemTableKey={itemKey}></SimpleTable>
            newGroup.append('foreignObject')
                .attr('x', +item.attributes['x'])
                .attr('y', +item.attributes['y'])
                .attr('width', item.attributes['width'] ? item.attributes['width'] + 5 : 0)
                .attr('height', item.attributes['height'] ? item.attributes['height'] + 5 : 0)
                .append('xhtml:div')
                    // @ts-ignore
                    .html(simpleTable);
        }
        if (item.attributes['dms:widget'] === 'string') {
            newGroup
                .append('text')
                .attr('x', +item.attributes['x'])
                .attr('y', +item.attributes['y'] + 10)
                .text(item.name);
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
                })
                .on('drag', (event, d) => {
                    const moveX = event.sourceEvent.x - delta.x;
                    const moveY = event.sourceEvent.y - delta.y;
                    const x = moveX > 0 ? moveX : 0;
                    const y = moveY > 0 ? moveY : 0;
                    templateInfoStore.changeCoord(d.name, x, y);
                }));
    }, [templateItems]);

    return (
        <div className="svgDiv">
            {svgSpace!.toReact()}
        </div>
    );
}

export default observer(SvgBlock);