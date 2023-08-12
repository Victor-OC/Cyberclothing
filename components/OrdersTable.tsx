import React, { useEffect, useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Breadcrumbs, TablePagination } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Link from 'next/link';
import styles from '@/styles/Orders.module.css';
import DropdownOrderStatus from '@/components/DropdownOrderStatus';

interface Product {
    id: number;
    name: string;
    photo: string;
    quantity: number;
    status: string;
}

interface Order {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    price: number;
    status: string;
    products: Product[];
}

function CollapsibleTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = useState<Order[]>([]);
    const [openRows, setOpenRows] = useState<boolean[]>([]);

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        fetch('../orders.json')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setOpenRows(new Array(data.length).fill(false));
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleStatusUpdate = async (orderId: number, newStatus: string) => {
        try {
            const response = await fetch(`/api/updateOrderStatus`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, newStatus }),
            });

            if (response.ok) {
                const updatedData = data.map((item) => (item.id === orderId ? { ...item, status: newStatus } : item));
                setData(updatedData);
            } else {
                throw new Error('Error updating order status');
            }
        } catch (error) {
            console.log('Error updating order status:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div className={styles.section}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2>ORDERS</h2>
                    <h3>Cyberclothing Admin Panel</h3>
                </div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/frontend">
                        HOME
                    </Link>
                    <Typography color="text.primary">Orders</Typography>
                </Breadcrumbs>
            </div>
            <TableContainer component={Paper} sx={{ borderRadius: '0px' }}>
                <Table sx={{ minHeight: 777 }}aria-label="collapsible table">
                    <TableHead className={styles.head}>
                        <TableRow className={styles.element}>
                            <TableCell align="center" className={styles.tableHeaderS}>
                                {openRows.length > 0 && (openRows[0] ? <b>Close</b> : <b>Open</b>)}
                            </TableCell>
                            <TableCell align="center" className={styles.tableHeader}>
                                <b>Order Id</b>
                            </TableCell>
                            <TableCell align="center" className={styles.tableHeader}>
                                <b>Name</b>
                            </TableCell>
                            <TableCell align="center" className={styles.tableHeader}>
                                <b>Email</b>
                            </TableCell>
                            <TableCell align="center" className={styles.tableHeader}>
                                <b>Phone Number</b>
                            </TableCell>
                            <TableCell align="center" className={styles.tableHeader}>
                                <b>Address</b>
                            </TableCell>
                            <TableCell align="center" className={styles.tableHeader}>
                                <b>Price</b>
                            </TableCell>
                            <TableCell align="center" className={styles.tableHeader}>
                                <b>Status</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((order, index) => (
                            <Row
                                key={order.id}
                                order={order}
                                open={openRows[index]}
                                setOpen={(isOpen: boolean) => {
                                    const newOpenRows = [...openRows];
                                    newOpenRows[index] = isOpen;
                                    setOpenRows(newOpenRows);
                                }}
                                updateStatus={(newStatus: string) => handleStatusUpdate(order.id, newStatus)}
                            />
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    className={styles.pagination}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}

function Row(props: {
    order: Order;
    open: boolean;
    setOpen: (open: boolean) => void;
    updateStatus: (newStatus: string) => void;
}) {
    const { order, open, setOpen, updateStatus } = props;

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    #{order.id}
                </TableCell>
                <TableCell align="center">{order.name}</TableCell>
                <TableCell align="center">{order.email}</TableCell>
                <TableCell align="center">{order.phoneNumber}</TableCell>
                <TableCell align="center">{order.address}</TableCell>
                <TableCell align="center">${order.price}</TableCell>
                <TableCell align="center">
                    <DropdownOrderStatus currentStatus={order.status} updateStatus={updateStatus} orderId={order.id} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div" className={styles.title}>
                                Ordered Products
                            </Typography>
                            <Table size="small" aria-label="products">
                                <TableHead className={styles.head}>
                                    <TableRow className={styles.element}>
                                        <TableCell align="center" className={styles.tableHeader}>
                                            <b>Product Id</b>
                                        </TableCell>
                                        <TableCell align="center" className={styles.tableHeader}>
                                            <b>Photo</b>
                                        </TableCell>
                                        <TableCell align="center" className={styles.tableHeader}>
                                            <b>Name</b>
                                        </TableCell>
                                        <TableCell align="center" className={styles.tableHeader}>
                                            <b>Quantity</b>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.products.map((product: any) => (
                                        <TableRow key={product.id}>
                                            <TableCell align="center" component="th" scope="row">
                                                {product.id}
                                            </TableCell>
                                            <TableCell align="center"><img src={product.photo} alt={product.name} width="80" /></TableCell>
                                            <TableCell align="center">{product.name}</TableCell>
                                            <TableCell align="center">{product.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default CollapsibleTable;
