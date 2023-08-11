import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PopUp from '@/components/PopUp';
import styles from '@/styles/Cart.module.css';
import Link from 'next/link';
import { Box, Button, Breadcrumbs, Tooltip, Typography, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Clear, Add, Remove, Facebook, Google, Twitter, Instagram, RssFeed } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';

type CartItem = {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
    action: string;
};

export default function Cart() {
    const router = useRouter();

    const calculateSubtotal = (price: number, quantity: number) => {
        return price * quantity;
    };

    const calculateTotalPrice = () => {
        const totalPrice = rows.reduce((total, row) => {
            return total + calculateSubtotal(row.price, row.quantity);
        }, 0);
        return totalPrice;
    };

    const [rows, setRows] = useState<CartItem[]>(initialRows);
    const [orderStatus, setOrderStatus] = useState<'IN_CART' | 'ORDER_PLACED'>('IN_CART');

    const updateQuantity = (id: number, quantity: number) => {
        const updatedRows = rows.map((row) => (row.id === id ? { ...row, quantity: quantity } : row));
        setRows(updatedRows);
        localStorage.setItem('cart', JSON.stringify(updatedRows));
    };

    const deleteItem = (id: number) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        localStorage.setItem('cart', JSON.stringify(updatedRows));
    };

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        setRows(cartItems);
    }, []);

    const handleOrderPlaced = () => {
        setOrderStatus('ORDER_PLACED');
    };

    return (
        <>
            <Header />
            <div className={styles.section}>
                <h2>Cart Page</h2>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="./">
                        HOME
                    </Link>
                    <Typography color="text.primary">Cart Page</Typography>
                </Breadcrumbs>
            </div>
            {orderStatus === 'IN_CART' ? (
                <div>
                    <BasicTable rows={rows} updateQuantity={updateQuantity} deleteItem={deleteItem} calculateSubtotal={calculateSubtotal} />
                    <div className={styles.total}>
                        <h3>Total Price: ${calculateTotalPrice()}</h3>
                    </div>
                    <div className={styles.btns}>
                        <Button
                            size="large"
                            variant="contained"
                            onClick={() => {
                                router.push('/frontend');
                                setTimeout(() => {
                                    const distance = (document?.querySelector('#products') as HTMLElement)?.offsetTop;
                                    window.scrollTo({
                                        top: distance,
                                        behavior: 'smooth',
                                    });
                                }, 500);
                            }}
                        >
                            CONTINUE SHOPPING
                        </Button>
                        <PopUp variant='table' cartItems={rows} onOrderPlaced={handleOrderPlaced} />
                    </div>
                </div>
            ) : (
                <div className={styles.tyPage}>
                    <h1>Thank you!</h1>
                    <h2>Your order was placed successfully.</h2>
                    <h3>The order is now on its way towards you!</h3>
                    <h3 style={{ display: 'flex', color: '#222' }}>Track your order here: <h3 style={{ color: '#5098f8', marginLeft: '5px' }}>RO138502185US</h3></h3>
                    <div className={styles.shipping}>
                        <img src='https://cdn.pixabay.com/photo/2020/09/17/22/52/shipping-5580515_1280.png'></img>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p>An email receipt including the details about your order has been sent to you.</p>
                            <p>Please keep it for your records.</p>
                        </div>
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'white', border: '1px solid #777', borderRadius: '2px', mb: '20px', pt: '10px' }}>
                        <h3 style={{ color: '#222' }}>Connect with us</h3>
                        <ul className={styles.links}>
                            <li><Facebook fontSize='large' className={styles.clr} /></li>
                            <li><Google fontSize='large' className={styles.clr} /></li>
                            <li><Twitter fontSize='large' className={styles.clr} /></li>
                            <li><Instagram fontSize='large' className={styles.clr} /></li>
                            <li><RssFeed fontSize='large' style={{ color: '#5098f8' }} /></li>
                        </ul>
                    </Box>
                    <Link href='/frontend'>
                        <Button variant='contained' type='submit' size='large'>RETURN TO HOMEPAGE</Button>
                    </Link>
                </div>
            )}
            <Footer />
        </>
    );
}

const initialRows: CartItem[] = [];

function BasicTable({ rows, updateQuantity, deleteItem, calculateSubtotal }: any) {
    const router = useRouter();
    return (
        <TableContainer component={Paper} sx={{borderRadius: 0}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">IMAGE</TableCell>
                        <TableCell align="center">PRODUCT NAME</TableCell>
                        <TableCell align="center">PRICE</TableCell>
                        <TableCell align="center">QUANTITY</TableCell>
                        <TableCell align="center">ACTION</TableCell>
                        <TableCell align="center">SUBTOTAL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                <h3 className={styles.h3}>Your Cart is Empty</h3>
                                <Link href="/frontend">
                                    <Button variant="contained" size="large" onClick={() => {
                                        router.push('/frontend');
                                        setTimeout(() => {
                                            const distance = (document?.querySelector('#products') as HTMLElement)?.offsetTop;
                                            window.scrollTo({
                                                top: distance,
                                                behavior: 'smooth',
                                            });
                                        }, 500);
                                    }}>
                                        SHOP OUR PRODUCTS
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ) : (
                        rows.map((row: any) => (
                            <TableRow key={row.image} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    <img className={styles.img} src={row.image} alt={row.name} />
                                </TableCell>
                                <TableCell align="center" className={styles.ts}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center" className={styles.ts}>
                                    ${row.price}
                                </TableCell>
                                <TableCell align="center">
                                    <Increment quantity={row.quantity} updateQuantity={(newQuantity: any) => updateQuantity(row.id, newQuantity)} />
                                </TableCell>
                                <TableCell align="center">
                                    <Button style={{ backgroundColor: 'transparent' }} className={styles.clearbtn} onClick={() => deleteItem(row.id)}>
                                        <Clear />
                                    </Button>
                                </TableCell>
                                <TableCell align="center" className={styles.ts}>
                                    ${calculateSubtotal(row.price, row.quantity)}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const Increment = ({ quantity, updateQuantity }: any) => {
    const [count, setCount] = useState(quantity);

    const IncNum = () => {
        setCount(count + 1);
        updateQuantity(count + 1);
    };

    const DecNum = () => {
        if (count > 1) {
            setCount(count - 1);
            updateQuantity(count - 1);
        } else {
            setCount(1);
            updateQuantity(1);
        }
    };

    return (
        <>
            <div className={styles.btndiv}>
                <Box component="span" sx={{ bgcolor: 'white', border: '1px solid #777', borderRadius: '2px' }}>
                    <div className={styles.btndiv}>
                        <Tooltip title="Delete Item">
                            <Button style={{ backgroundColor: 'transparent' }} onClick={DecNum}>
                                <Remove />
                            </Button>
                        </Tooltip>
                        <div className={styles.increment}>{quantity}</div>
                        <Tooltip title="Add Item">
                            <Button style={{ backgroundColor: 'transparent' }} onClick={IncNum}>
                                <Add />
                            </Button>
                        </Tooltip>
                    </div>
                </Box>
            </div>
        </>
    );
}