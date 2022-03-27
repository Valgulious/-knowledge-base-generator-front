import { FC } from 'react';
import { observer } from 'mobx-react';
import BaseTable from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { useService } from 'presentation/context/Container';
import AppController from 'presentation/controller/app/AppController';

interface Column {
    id: 'disease' | 'attribute' | 'amount1' | 'amount2';
    label: string;
}

const COLUMNS: Column[] = [
    { id: 'disease', label: 'Класс' },
    { id: 'attribute', label: 'Признак' },
    { id: 'amount1', label: 'ЧПД (МБЗ)' },
    { id: 'amount2', label: 'ЧПД (ИФБЗ)' },
];

type PropsT = {
    page: number;
    rowsPerPage: number;
};

const Table: FC<PropsT> = observer((props) => {
    const { page, rowsPerPage } = props;
    const { compareConfigs } = useService(AppController);

    return (
        <Paper>
            <TableContainer component={Paper}>
                <BaseTable stickyHeader>
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
                            .map(({ id, disease, attribute, amount, indAmount }) => {
                                const backgroundColor = indAmount === amount ? 'green' : 'yellow';

                                return (
                                    <TableRow key={`compare-row-chpd-${id}`}>
                                        <TableCell align="center">{disease.name}</TableCell>
                                        <TableCell align="center">{attribute.name}</TableCell>
                                        <TableCell align="center" style={{ backgroundColor }}>
                                            {amount}
                                        </TableCell>
                                        <TableCell align="center" style={{ backgroundColor }}>
                                            {indAmount}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </BaseTable>
            </TableContainer>
        </Paper>
    );
});

export default Table;
