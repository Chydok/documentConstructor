import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { observer } from 'mobx-react';
import templateInfoStore from '../store/templateInfoStore';

import * as mobx from 'mobx';

interface Props {
    itemTableKey: number;
    tableView?: boolean
  }

const SimpleTable: React.FC<Props> = ({itemTableKey, tableView }) => {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        var el = e.currentTarget;
        switch (e.detail) {
            case 1:
              console.log("click");
              templateInfoStore.setCellStyle(el!.getAttribute('id')!, "click");
              break;
            case 2:
              console.log("double click");
              templateInfoStore.setCellStyle(el!.getAttribute('id')!, "click");
              break;
          }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        var el = e.currentTarget.parentElement?.parentElement;
        templateInfoStore.setCellStyle(el!.getAttribute('id')!, "enter" );
    };

    const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
        var el = e.currentTarget.parentElement?.parentElement;
        templateInfoStore.setCellStyle(el!.getAttribute('id')!, "out" );
    };

    const table = templateInfoStore.templateItems[itemTableKey];
    let tableWidth = 0;
    let tableHeight = 0;

    const tableRow = (rowType: string) => table.children.filter(item => item.name === rowType).map(row => {
        tableHeight += +row.attributes['height'];
        var cellAttributes = templateInfoStore.cellAttributes;
        return (
            <TableRow
                key={row.attributes['id']}
                style={mobx.toJS(templateInfoStore.cellAttributes[row.attributes['id']])} 
                id={row.attributes['id']}
                onClick={handleClick}
                >
                {row.children.map(cell => {
                    if (rowType === 'columns') {
                        tableWidth += cell.attributes['width'] ? +row.attributes['width'] : 25;
                    }
                    return mobx.toJS(
                        <TableCell
                            key={cell.attributes['id']}
                            style={{
                                minWidth: +cell.attributes['width'] || 25,
                                maxWidth: +cell.attributes['width'] || 25,
                                minHeight: +cell.attributes['width'] || 25,
                                maxHeight: +cell.attributes['width'] || 25,
                                lineHeight: 1,
                                backgroundColor: 'transparent',
                                overflow: 'hidden',
                                textOverflow: 'clip',
                            }}
                        >
                            <div id={cell.attributes['id']}  className='cellDiv' 
                            style={mobx.toJS(templateInfoStore.cellAttributes[cell.attributes['id']])} 
                            onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}
                            >
                            {rowType === 'columns' ? cell.attributes['dms:title'] : cell.name}</div>
                        </TableCell>);
                })}
            </TableRow>
        )
    });

    const viewRow = () => {
        const xmlDoc = templateInfoStore.dataXml;
        if (xmlDoc) {
            const tableInfo = xmlDoc.getElementsByTagName(table.name)[0];
            return Array.from(tableInfo.getElementsByTagName('record')).map((recordInfo, keyRI) => {
                return table.children.filter(item => item.name === 'record').map(row => {
                    return (
                        <TableRow
                            key={row.attributes['id'] + keyRI}
                            sx={{
                                height: +row.attributes['height'],
                            }}
                            >
                            {row.children.map(cell => {
                                return (
                                    <TableCell
                                        key={cell.attributes['id'] + keyRI}
                                        style={{
                                            minWidth: +cell.attributes['width'] || 25,
                                            maxWidth: +cell.attributes['width'] || 25,
                                            lineHeight: 1,
                                            backgroundColor: 'white',
                                            overflow: 'hidden',
                                            textOverflow: 'clip'
                                        }}
                                    >
                                        {recordInfo.getElementsByTagName(cell.name)[0].textContent}
                                    </TableCell>);
                            })}
                        </TableRow>
                )});
            });
        }
    };

    useEffect(() => {
        if (!tableView) {
            templateInfoStore.setAttrib(table.attributes['id'], 'width', tableWidth);
            templateInfoStore.setAttrib(table.attributes['id'], 'height', tableHeight);
        }
    }, [table.attributes, tableView, tableWidth, tableHeight]);

    return (
        <TableContainer component={Paper}>
        <Table padding='none'>
          <TableHead>
            {tableRow('columns')}
          </TableHead>
          <TableBody>
            {tableView ? viewRow() : tableRow('record')}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default observer(SimpleTable);