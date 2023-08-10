import React from 'react';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, ListItemIcon } from '@mui/material';
import styles from '@/styles/Orders.module.css';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface DropdownProductStatusProps {
    currentStatus: string;
    updateStatus: (newStatus: string) => void;
    orderId: number;
}

export default function DropdownProductStatus(props: DropdownProductStatusProps) {
    const { currentStatus, updateStatus, orderId } = props;

    const handleChange = async (event: SelectChangeEvent) => {
        const newStatus = event.target.value as string;
        try {
            const response = await fetch(`/api/updateProductStatus`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, newStatus }),
            });

            if (response.ok) {
                updateStatus(newStatus);
            } else {
                throw new Error('Error updating order status');
            }
        } catch (error) {
            console.log('Error updating order status: ', error);
        }
    };

    const getLabelColor = (value: string) => {
        switch (value) {
            case 'in stock':
                return 'green';
            case 'low quantity':
                return 'orange';
            case 'now available':
                return 'gray';
            case 'deleted':
                return 'red';
            default:
                return 'black';
        }
    };

    const getStatusCircle = (color: string) => (
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
            <FiberManualRecordIcon sx={{ color, fontSize: 20 }} />
        </ListItemIcon>
    );

    const renderValue = () => (
        <Box>
            {getStatusCircle(getLabelColor(currentStatus))}
        </Box>
    );

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl variant="standard" fullWidth sx={{ textAlign: 'center' }}>
                <Select
                    className={styles.select}
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={currentStatus}
                    label="Order Status"
                    onChange={handleChange}
                    renderValue={renderValue}
                    sx={{
                        '& .MuiSelect-select:not(.Mui-focused)': {
                            color: getLabelColor(currentStatus),
                        },
                    }}
                    displayEmpty
                >
                    <MenuItem className={styles.instock} value={"in stock"}>In Stock</MenuItem>
                    <MenuItem className={styles.lowquantity} value={"low quantity"}>Low quantity</MenuItem>
                    <MenuItem className={styles.nowavailable} value={"not available"}>Not Available</MenuItem>
                    <MenuItem className={styles.deleted} value={"deleted"}>Deleted</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
