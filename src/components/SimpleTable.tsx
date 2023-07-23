import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

import templateInfoStore from '../store/templateInfoStore';

const SimpleTable: React.FC<{itemTableID: string, tableView?: boolean}> = (props) => {
    const table = templateInfoStore.templateItems.find(item => item.attributes['id'] === props.itemTableID);
    const tableAttributes = toJS(table?.attributes);
    let tableWidth = 0;
    let tableHeight = 0;

    const tableRow = (rowType: string) => table?.children.filter(item => item.name === rowType).map(row => {
        tableHeight += +row.attributes['height'];
        return (
            <TableRow
                key={row.attributes['id']}
                sx={{
                    height: +row.attributes['height'],
                    backgroundColor: row.attributes['selected'] ? 'lightgray' : 'transparent',
                }}
            >
                {row.children.map(cell => {
                    if (rowType === 'columns') {
                        tableWidth += cell.attributes['width'];
                    }
                    const cellFontStyle = cell?.attributes['fontStyle'] ? cell?.attributes['fontStyle'] : table?.attributes['fontStyle'];
                    const cellFontFamily = cell?.attributes['fontFamily'] ? cell?.attributes['fontFamily'] : table?.attributes['fontFamily'];
                    return (
                        <TableCell
                            id={table.attributes['id']}
                            key={cell.attributes['id']}
                            style={{
                                minWidth: +cell.attributes['width'],
                                maxWidth: +cell.attributes['width'],
                                lineHeight: 1,
                                backgroundColor: cell.attributes['selected'] ? 'lightgray' : cell.attributes['targeted'] ? 'lightblue' : 'transparent',
                                overflow: 'hidden',
                                textOverflow: 'clip',
                                fontStyle: cellFontStyle,
                                fontFamily: cellFontFamily,
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
            const tableInfo = xmlDoc.getElementsByTagName(table!.name)[0];
            if (tableInfo) {
                return Array.from(tableInfo.getElementsByTagName('record')).map((recordInfo, keyRI) => {
                    return table?.children.filter(item => item.name === 'record').map(row => {
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
                                                minWidth: +cell.attributes['width'],
                                                maxWidth: +cell.attributes['width'],
                                                lineHeight: 1,
                                                backgroundColor: 'white',
                                                overflow: 'hidden',
                                                textOverflow: 'clip',
                                            }}
                                        >
                                            {recordInfo.getElementsByTagName(cell.name)[0].textContent}
                                        </TableCell>);
                                })}
                            </TableRow>
                    )});
                });
            }
            return <></>
        }
    };

    useEffect(() => {
        if (!props.tableView) {
            templateInfoStore.setAttrib(tableAttributes['id'], 'width', tableWidth);
            templateInfoStore.setAttrib(tableAttributes['id'], 'height', tableHeight);
        }
    }, [tableAttributes, props.tableView, tableWidth, tableHeight]);

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