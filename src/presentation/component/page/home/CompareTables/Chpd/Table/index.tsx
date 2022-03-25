import { FC } from 'react';
import { observer } from 'mobx-react';
import BaseTable from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Period from 'domain/entity/period/Period';

interface Column {
    id: 'disease' | 'attribute' | 'amount';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'disease', label: 'Класс' },
    { id: 'attribute', label: 'Признак' },
    { id: 'amount', label: 'ЧПД' },
];

type PropsT = {
    periods: Period[];
    page: number;
    rowsPerPage: number;
};

const Table: FC<PropsT> = observer((props) => {
    const { periods, page, rowsPerPage } = props;

    return (
        <Paper>
            <TableContainer component={Paper}>
                <BaseTable stickyHeader>
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map(({ id, label }) => (
                                <TableCell key={`compare-chpd-${id}`}>{label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {periods
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(({ id, disease, attribute, amount }) => (
                                <TableRow key={`compare-row-chpd-${id}`}>
                                    <TableCell>{disease.name}</TableCell>
                                    <TableCell>{attribute.name}</TableCell>
                                    <TableCell>{amount}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </BaseTable>
            </TableContainer>
        </Paper>
    );
});

export default Table;
