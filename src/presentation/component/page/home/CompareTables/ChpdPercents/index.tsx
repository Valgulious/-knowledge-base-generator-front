import { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';

interface Column {
    id: 'disease' | 'percents';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'disease', label: 'Класс' },
    { id: 'percents', label: 'Проценты' },
];

const ChpdPercents = observer(() => {
    const { diseases, getAmountPercents, commonAmountPercents } = useService(AppController);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map(({ id, label }) => (
                                <TableCell key={`compare-chpd-${id}`} align="center">
                                    {label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {diseases
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(({ id, name }) => {
                                return (
                                    <TableRow key={`compare-row-chpd-percents-${id}`}>
                                        <TableCell align="center">{name}</TableCell>
                                        <TableCell align="center">
                                            {getAmountPercents(id).toFixed(2)}%
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        <TableRow key="compare-row-chpd-percents-common">
                            <TableCell align="center">Средний процент</TableCell>
                            <TableCell align="center">{commonAmountPercents.toFixed(2)}%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={diseases.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
});

export default ChpdPercents;
