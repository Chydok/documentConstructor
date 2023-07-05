import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { observer } from 'mobx-react';
import templateInfoStore from '../store/templateInfoStore';

const SimpleTable = (props: {itemTableKey: number}) => {
    const table = templateInfoStore.templateItems[props.itemTableKey];
    let tableWidth = 0;
    let tableHeight = 0;

    const theader = table.children.filter(item => item.name === 'columns').map((row, rowIndex) => {
        tableHeight += row.attributes['height'] ? row.attributes['height'] : 100;
        return (
            <TableRow 
                key={row.attributes['id']}
                sx={{height: row.attributes['height']}}
                >
                {row.children.map(cell => {
                    tableWidth += cell.attributes['width'] ? row.attributes['width'] : 25;
                    return (
                        <TableCell
                            key={cell.attributes['id']}
                            style={{
                                minWidth: cell.attributes['width'] || 20,
                                maxWidth: cell.attributes['width'] || 20,
                                height: row.attributes['height'] ? row.attributes['height'] : 100,
                                backgroundColor: 'white'
                            }}
                        >
                            {cell.attributes['dms:title']}
                        </TableCell>);
                })}
            </TableRow>
        )
    });

    const tbody = table.children.filter(item => item.name === 'record').map((row, rowIndex) => {
        tableHeight += row.attributes['height'] ? row.attributes['height'] : 100;
        return (
            <TableRow 
                key={row.attributes['id']}
                sx={{height: row.attributes['height']}}
                >
                {row.children.map(cell => {
                    return (
                        <TableCell
                            key={cell.attributes['id']}
                            style={{
                                minWidth: cell.attributes['width'] || 20,
                                maxWidth: cell.attributes['width'] || 20,
                                height: row.attributes['height'] ? row.attributes['height'] : 100,
                                backgroundColor: 'white'
                            }}
                        >
                            {cell.name}
                        </TableCell>);
                })}
            </TableRow>
        )
    });

    useEffect(() => {
        templateInfoStore.setAttrib(table.attributes['id'], 'width', tableWidth);
        templateInfoStore.setAttrib(table.attributes['id'], 'height', tableHeight);
    }, [table.attributes, theader, tbody, tableWidth, tableHeight])

    return (
        <TableContainer component={Paper}>
        <Table padding='none'>
          <TableHead>
            {theader}
          </TableHead>
          <TableBody>
            {tbody}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
export default observer(SimpleTable);