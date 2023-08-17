import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Breadcrumbs, TablePagination } from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material';
import styles from '@/styles/Orders.module.css';
import Link from 'next/link';
import EditProductModal from './EditProductModal';
import Cookies from 'js-cookie';
import AddProductModal from '@/components/AddProductModal';
import DropdownProductStatus from './DropdownProductStatus';

interface Products {
  id: number;
  photo: string;
  name: string;
  price: number;
  status: string;
  category: string;
  vendorId: number;
}

interface Vendor {
  id: number;
  email: string;
  password: string;
}

function decryptFunction(encryptedData: string): any {
  return CryptoJS.AES.decrypt(encryptedData, "key").toString(CryptoJS.enc.Utf8);
}

const BasicTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<Products[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Products | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [vendorsData, setVendorsData] = useState<Vendor[]>([]);
  const [loggedInVendor, setLoggedInVendor] = useState<Vendor | null>(null);

  const handleOpen = (product: Products, key: number) => {
    setSelectedRow(product);
    setSelectedIndex(key);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleEditProduct = (product: Products) => {
    const updatedData = data.map((item) =>
      item.id === product.id ? { ...item, ...product } : item
    );
    setData(updatedData);
    handleClose();
  }

  const deleteTableRow = (id: number) => {
    const updatedData = data.map((el) =>
      el.id === id ? { ...el, status: 'deleted' } : el
    );
    setData(updatedData);
    fetch(`/api/updateProductStatus`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: id,
        newStatus: 'deleted',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product status updated:', data);
      })
      .catch((error) => console.error('Error updating product status:', error));
  };

  const handleStatusUpdate = async (productId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/updateProductStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, newStatus }),
      });

      if (response.ok) {
        const updatedData = data.map((item) =>
          item.id === productId ? { ...item, status: newStatus } : item
        );
        setData(updatedData);
      } else {
        throw new Error('Error updating product status');
      }
    } catch (error) {
      console.log('Error updating product status:', error);
    }
  };

  const handleAddProduct = (newProduct: Products) => {
    setData(prevData => [...prevData, newProduct]);
};

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleDeletedVisibility = () => {
    setShowDeleted(!showDeleted);
  };

  useEffect(() => {
    fetch('../../vendors.json')
      .then((response) => response.json())
      .then((vendorData) => {
        setVendorsData(vendorData);
        const encryptedData = Cookies.get('userData');
        if (encryptedData) {
          try {
            const decryptedData = decryptFunction(encryptedData);
            const user = JSON.parse(decryptedData) as Vendor;
            const loggedInVendor = vendorData.find(
              (vendor: Vendor) => vendor.email === user.email && vendor.password === user.password
            );
            if (loggedInVendor) {
              setLoggedInVendor(loggedInVendor);
              fetch('../products.json')
                .then((response) => response.json())
                .then((productsData) => {
                  console.log("All Products Data:", productsData);
                  const filteredProducts = productsData.products.filter(
                    (product: Products) => product.vendorId === loggedInVendor.id
                  );

                  console.log("Filtered Products:", filteredProducts);
                  setData(filteredProducts);
                })
                .catch((error) => console.error('Error fetching products:', error));
            }
          } catch (error) {
            console.error('Error decrypting data:', error);
          }
        }
      })
      .catch((error) => console.error('Error fetching vendors:', error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div className={styles.section}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>PRODUCTS</h2>
          <h3>Cyberclothing Admin Panel</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/frontend">
              HOME
            </Link>
            <Typography color="text.primary">Products</Typography>
          </Breadcrumbs>
          <AddProductModal variant="table" addProduct={handleAddProduct} loggedInVendor={loggedInVendor} />
        </div>
      </div>
      <TableContainer component={Paper} sx={{ borderRadius: '0px' }}>
        <EditProductModal
          isOpen={modalOpen}
          product={selectedRow}
          closeHandler={handleClose}
          handleEditProduct={handleEditProduct}
        />
        <Table className={styles.tableList} sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.head}>
            <TableRow className={styles.element}>
              <TableCell align="center" className={styles.tableHeader1}>
                <b>Id</b>
              </TableCell>
              <TableCell align="center" className={styles.tableHeader}>
                <b>Photo</b>
              </TableCell>
              <TableCell align="center" className={styles.tableHeader}>
                <b>Name</b>
              </TableCell>
              <TableCell align="center" className={styles.tableHeader}>
                <b>Price</b>
              </TableCell>
              <TableCell align="center" className={styles.tableHeader}>
                <b>Status</b>
              </TableCell>
              <TableCell align="center" className={styles.tableHeader}>
                <b>Category</b>
              </TableCell>
              <TableCell align="center" className={styles.tableHeader}>
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.body}>
            {data
              ?.filter((row: Products) => showDeleted || row.status !== 'deleted')
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Products, index: number) => (
                <TableRow key={row.id}>
                  <TableCell align="center" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">
                    <img src={row.photo} alt={row.name} className={styles.image} />
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">${row.price}</TableCell>
                  <TableCell align="center">
                    <DropdownProductStatus
                      currentStatus={row.status}
                      updateStatus={(newStatus) => handleStatusUpdate(row.id, newStatus)}
                      orderId={row.id}
                    />
                  </TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteTableRow(row.id)} className={styles.delete}>
                      <DeleteOutline />
                    </Button>
                    <Button onClick={() => handleOpen(row, index)} className={styles.edit}>
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: "#f8f8f8" }}>
          <Button
            variant='contained'
            sx={{ bgcolor: "red", width: '20%', ml: 2 }}
            onClick={toggleDeletedVisibility}
          >
            {showDeleted ? "HIDE DELETED PRODUCTS" : "SHOW DELETED PRODUCTS"}
          </Button>
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
        </Box>
      </TableContainer>
    </div>
  );
};

export default BasicTable;
