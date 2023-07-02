import * as d3 from "d3";
import { observer } from "mobx-react";
import ReactFauxDom from 'react-faux-dom';

import templateInfoStore, { ItemplateElement } from '../../store/templateInfoStore';

import '../../styles/WorkingPanel.css';
import { useEffect } from "react";

interface ITableRow {
    tableGroup: any,
    rowType: string,
    children: Array<ItemplateElement>,
    tableX: number,
    tableY: number,
    rowHeight?: number,
}

const tableRow = (props: ITableRow) => {
    const headerGroup = props.tableGroup
                        .append('g')
                        .attr('class', props.rowType);

    props.children.map((cell, recordIndex) => {
        const cellWidth = cell.attributes['width'] || 125 ;
        const cellHeight = props.rowHeight || 35;
        const rowCell = headerGroup
            .append('g')
            .attr('class', 'cell')

        rowCell.append('rect')
            .attr('x', recordIndex * cellWidth + props.tableX)
            .attr('y', props.tableY)
            .attr('width', cellWidth)
            .attr('height', cellHeight)
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr("fill", 'none');

        const cellText: string = props.rowType === 'record' ? cell.name : cell.attributes['dms:title']

        rowCell
            .append('foreignObject')
                .attr('x', recordIndex * cellWidth + props.tableX)
                .attr('y', props.tableY)
                .attr('width', cellWidth)
                .attr('height', cellHeight)
            .append("xhtml:div")
                .style("font", "14px 'Helvetica Neue'")
                .html(cellText);
    })
};

const SvgBlock = () => {
    const svgSpace: ReactFauxDom.Element = new ReactFauxDom.Element('svg');
    const templateItems = templateInfoStore.templateItems
    d3.select('svg')
        .attr('width', templateInfoStore.templateAttr.width)
        .attr('height', templateInfoStore.templateAttr.height)
        .style('background-color', 'white');

    templateItems.map((item, itemKey) => {
        const newGroup = d3.select(svgSpace)
                .append('g')
                .attr('class', 'newGroup')
                .attr('id', `#${item.name}`)
                .attr('x', +item.attributes['x'])
                .attr('y', +item.attributes['y'])
                .style("cursor", "pointer")

        if (item.attributes['dms:widget'] === 'table') {
            let rowHeight: number = 0;
            item.children.map((tableInfo) => {
                tableRow({
                    tableGroup: newGroup,
                    rowType: tableInfo.name,
                    children: tableInfo.children,
                    tableX: +item.attributes['x'],
                    tableY: +item.attributes['y'] + rowHeight
                });
                rowHeight += +tableInfo.attributes['height'];
            });
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
            .data(templateInfoStore.templateItems)
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
    }, [templateInfoStore.templateItems]);

    return (
        <div className="svgDiv">
            {svgSpace!.toReact()}
        </div>
    );
}

export default observer(SvgBlock);