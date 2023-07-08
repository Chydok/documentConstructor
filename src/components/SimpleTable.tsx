import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { observer } from 'mobx-react';
import templateInfoStore from '../store/templateInfoStore';

const SimpleTable = (props: {itemTableKey: number, tableView?: boolean}) => {
    const table = templateInfoStore.templateItems[props.itemTableKey];
    let tableWidth = 0;
    let tableHeight = 0;

    const tableRow = (rowType: string) => table.children.filter(item => item.name === rowType).map(row => {
        tableHeight += +row.attributes['height'];
        return (
            <TableRow
                key={row.attributes['id']}
                sx={{
                    height: +row.attributes['height'],
                }}
                >
                {row.children.map(cell => {
                    if (rowType === 'columns') {
                        tableWidth += cell.attributes['width'] ? +row.attributes['width'] : 25;
                    }
                    return (
                        <TableCell
                            key={cell.attributes['id']}
                            style={{
                                minWidth: +cell.attributes['width'] || 25,
                                maxWidth: +cell.attributes['width'] || 25,
                                lineHeight: 1,
                                backgroundColor: 'white',
                                overflow: 'hidden',
                                textOverflow: 'clip'
                            }}
                        >
                            {rowType === 'columns' ? cell.attributes['dms:title'] : cell.name}
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
            } else {
                return <></>
            }
    };

    useEffect(() => {
        if (!props.tableView) {
            templateInfoStore.setAttrib(table.attributes['id'], 'width', tableWidth);
            templateInfoStore.setAttrib(table.attributes['id'], 'height', tableHeight);
        }
    }, [table.attributes, tableWidth, tableHeight]);

    return (
        <TableContainer component={Paper}>
        <Table padding='none'>
          <TableHead>
            {tableRow('columns')}
          </TableHead>
          <TableBody>
            {props.tableView ? viewRow() : tableRow('record')}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
export default observer(SimpleTable);