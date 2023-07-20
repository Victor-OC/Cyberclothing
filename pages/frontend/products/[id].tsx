import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header'
import Link from 'next/link'
import styles from '@/styles/Product.module.css';
import { Button, Breadcrumbs, Typography, Tooltip, IconButton, Icon, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Add, Remove, } from '@mui/icons-material'
import { useRouter } from 'next/router'

type Product = {
    id: number;
    photo: string;
    name: string;
    price: string;
    description: string;
};

export default function Product() {

    const [product, setProduct] = useState<Product>({});
    const router = useRouter()

    useEffect(() => {
        console.log('id', router.query.id)
        fetch('../../products.json')
            .then((response) => response.json())
            .then((data) => {
                const result = data.products.filter((product: any) => { return product.id == router.query.id });
                console.log(result)
                setProduct(result[0])
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, [router.query.id]);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <div className={styles.section}>
                <h2>{product.name}</h2>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/frontend">
                        HOME
                    </Link>
                    <Link
                        color="inherit"
                        href="/frontend"
                    >
                        PRODUCTS
                    </Link>
                    <Typography color="text.primary">{product.name}</Typography>
                </Breadcrumbs>
            </div>
            <div className={styles.product}>
                <div className={styles.ul}>
                    <img src={product.photo}></img>
                    <ul className={styles.li}>
                        <li><h2>{product.name}</h2></li>
                        <li><h4>{product.price}</h4></li>
                        <li><h3>Select Size</h3></li>
                        <li>
                            <ul className={styles.size}>
                                <li>
                                    <IconButton>
                                        <Icon color="primary">M</Icon>
                                    </IconButton>
                                </li>
                                <li>
                                    <IconButton>
                                        <Icon color="primary">L</Icon>
                                    </IconButton>
                                </li>
                                <li>
                                    <IconButton>
                                        <Icon color="primary">XL</Icon>
                                    </IconButton>
                                </li>
                            </ul>
                        </li>
                        <li><h5>InStock</h5></li>
                        <li><h6>Quantity</h6></li>
                        <li><Increment /></li>
                        <li><Button variant='contained' size='large' className={styles.btnAC}>ADD TO CART</Button></li>
                        <li><h1>Product Details</h1></li>
                        <li><div className={styles.p}><p>{product.description}</p></div></li>
                    </ul>
                </div>
            </div>
            <div className={styles.description}>
                <h2>DESCRIPTION</h2>
                <BasicTable />
            </div>
        </>
    );
}

const Increment = () => {
    const [count, setCount] = useState(1);
    const IncNum = () => {
        setCount(count + 1);
    };
    const DecNum = () => {
        if (count > 1) setCount(count - 1);
        else {
            setCount(1);
        }
    };
    return (
        <>
            <div className={styles.btndiv}>
                <Tooltip title="Delete">
                    <Button onClick={DecNum}>
                        <Remove />
                    </Button>
                </Tooltip>
                <div className={styles.increment}>{count}</div>
                <Button onClick={IncNum}>
                    <Add />
                </Button>
            </div>
        </>
    );
};

function createData(
    name: string,
    description: string,
) {
    return { name, description };
}
const rows = [
    createData("Ideal For :", "Women's"),
    createData("Pattern :", "Embroidered"),
    createData("Dress Fabric :", "Silk"),
    createData("Type :", "Ghagra, Choli, Dupatta Set"),
    createData("Neck :", "Round Neck"),
    createData("Sleeve :", "3/4 Sleeve"),
    createData("Work :", "N/A"),
];
function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


