import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import DescriptionIcon from '@mui/icons-material/Description';
import { ButtonGroup, TextField, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import { deleteIssue, issues } from '../../redux/asyncThunk/issue.thunk';


const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Titulo', minWidth: 170 },
  { id: 'operator', label: 'Operador', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'creationAt', label: 'Fecha de Creación', minWidth: 170 },
  { id: 'actions', label: 'Operaciones', minWidth: 170 }
];

const Issues = () => {
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('id');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useAppDispatch();
  const listIssues = useAppSelector((state) => state.issue.data);

  useEffect(() => {
    dispatch(issues());
  }, []);

  const handleChangePage = (newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteIssue(Number(id)));
  }

  const handleFilterTypeChange = (event: any) => {
    setFilterType(event.target.value);
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Select
        value={filterType}
        onChange={handleFilterTypeChange}
      >
        <MenuItem value="id">Id</MenuItem>
        <MenuItem value="operator">Operador</MenuItem>
        <MenuItem value="creationAt">Día</MenuItem>
      </Select>
      <TextField
        label={`Filtrar por ${filterType === 'id' ? 'id' : filterType === 'operator' ? 'operador': 'dia' }`}
        value={filter}
        onChange={(e: any) => setFilter(e.target.value)}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listIssues
              .filter((row: any) => {
                if (filterType === 'id') {
                  return row.id.toString().includes(filter);
                } else if (filterType === 'creationAt') {
                  return row.creationAt.startsWith(filter);
                } else {
                  return row.operator.toLowerCase().includes(filter.toLowerCase());
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id.toString()}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center">
                      {column.id === 'actions' ? (
                        <ButtonGroup variant="text" aria-label="Operations">
                          <Link to={`/manager/issue/${row.id}`}>
                            <Tooltip title="Actualizar">
                              <IconButton aria-label="actualizar">
                                <UpdateIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip title="Eliminar">
                            <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Link to={`/manager/detail-issue/${row.id}`}>
                            <Tooltip title="Detalle">
                              <IconButton aria-label="detalle">
                                <DescriptionIcon />
                              </IconButton>
                            </Tooltip>
                          </Link>
                        </ButtonGroup>

                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={listIssues.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Issues;
