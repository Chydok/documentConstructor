import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { observer } from 'mobx-react';
import templateInfoStore from '../store/templateInfoStore';

const SimpleTable = (props: {itemTableKey: number}) => {
    const table = templateInfoStore.templateItems[props.itemTableKey];
    return (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
          {table.children.filter(item => item.name === 'columns').map((row, rowIndex) => {
            return (
                <TableRow key={row.name + rowIndex}>
                    {row.children.map(cell => {
                        return (<TableCell key={cell.name}>{cell.attributes['dms:title']}</TableCell>);
                    })}
                </TableRow>
            )
          })}
          </TableHead>
          <TableBody>
            {table.children.filter(item => item.name === 'record').map((row, rowIndex) => {
                return (
                    <TableRow key={row.name + rowIndex}>
                        {row.children.map(cell => {
                            return (<TableCell key={cell.name}>{cell.name}</TableCell>);
                        })}
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
export default observer(SimpleTable);