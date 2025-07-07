import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@mui/material';
import {DataGridPro} from '@mui/x-data-grid-pro';

export default function EnrolledParticipantsDialog({open, onClose, date}) {
    const [rows, setRows] = useState([
        {id: 1, name: 'Vivek', shift: 'Morning'},
        {id: 2, name: 'Manish', shift: 'Evening'},
        {id: 3, name: 'Karan', shift: 'Night'},
    ]);

    useEffect(() => {
        if (open) {
            setRowSelectionModel({ type: 'include', ids: new Set() });
        }
    }, [open, date]);


    const [rowSelectionModel, setRowSelectionModel] = useState({
        type: 'include',
        ids: new Set(),
    });

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'name', headerName: 'Performer Name', width: 200, editable: true},
        {field: 'shift', headerName: 'Shift', width: 150, editable: true},
    ];

    const handleDelete = () => {
        const selectedIds = Array.from(rowSelectionModel.ids);
        const newRows = rows.filter((row) => !selectedIds.includes(row.id));
        setRows(newRows);
        setRowSelectionModel({type: 'include', ids: new Set()}); // reset selection
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Shift Plan Management</DialogTitle>
            <DialogContent>
                <Typography sx={{mb: 2}}>
                    Selected Date: {date?.toLocaleDateString()}
                </Typography>

                <DataGridPro
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={(model) => setRowSelectionModel(model)}
                    disableRowSelectionOnClick/>
            </DialogContent>

            <DialogActions sx={{justifyContent: 'space-between'}}>
                <Box>
                    <Button variant="contained">
                        Add
                    </Button>
                    <Button onClick={handleDelete} variant="contained" color='error'>Delete</Button>
                </Box>
                <Button variant="contained" onClick={onClose}>
                    Generate
                </Button>

            </DialogActions>
        </Dialog>
    );
}
