import { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import getStringInterval from 'helper/string/getStringInterval';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';

interface Column {
    id: 'disease' | 'attribute' | 'values' | 'indValues';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'disease', label: 'Класс' },
    { id: 'attribute', label: 'Признак' },
    { id: 'values', label: 'ЗДП (МБЗ)' },
    { id: 'indValues', label: 'ЗДП (ИФБЗ)' },
];

const Zdp = observer(() => {
    const { compareConfigs } = useService(AppController);
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
                        {compareConfigs
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((compareConfig) => {
                                const {
                                    id,
                                    disease,
                                    attribute,
                                    amount,
                                    indAmount,
                                    values,
                                    indValues,
                                    valuesColors,
                                } = compareConfig;

                                return (
                                    <>
                                        {amount === indAmount &&
                                            values.map((value, index) => {
                                                const indValue = indValues[index];
                                                const backgroundColor = valuesColors[index];

                                                return (
                                                    <TableRow key={`compare-row-zdp-${id}`}>
                                                        <TableCell align="center">
                                                            {!index && disease.name}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {!index && attribute.name}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            style={{ backgroundColor }}
                                                        >
                                                            {getStringInterval(value)}
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            style={{ backgroundColor }}
                                                        >
                                                            {getStringInterval(indValue)}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={compareConfigs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
});

export default Zdp;
