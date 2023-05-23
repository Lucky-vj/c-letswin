import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein, ext, exts) {
  return { name, calories, fat, carbs, protein, ext, exts };
}

const rows = [
  createData('Match1', 159, 6.0, 24, 4.0, 24, 4.0),
  createData('Match2', 237, 9.0, 37, 4.3, 37, 4.3),
  createData('Match3', 262, 16.0, 24, 6.0, 24, 6.0),
  createData('Match4', 305, 3.7, 67, 4.3, 67, 4.3),
  createData('Match5', 356, 16.0, 49, 3.9, 49, 3.9),
];

export default function AllGames() {
  return (
    <TableContainer component={Paper} className='football-table-part'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='football-table-part-inner'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Germany</StyledTableCell>
            <StyledTableCell align="right">Champions League</StyledTableCell>
            <StyledTableCell align="right">1x</StyledTableCell>
            <StyledTableCell align="right">x</StyledTableCell>
            <StyledTableCell align="right">2x</StyledTableCell>
            <StyledTableCell align="right">STAT</StyledTableCell>
            <StyledTableCell align="right">BETS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
              <StyledTableCell align="right">{row.ext}</StyledTableCell>
              <StyledTableCell align="right">{row.exts}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}