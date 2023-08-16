import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "@/styles/Table.module.css";
import TablePagination from "@mui/material/TablePagination";
import { rows } from "./tablerows";
import { Button, Breadcrumbs, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import cerculete from "@/styles/CerculeteColorate.module.css";
import { DataObject } from "@mui/icons-material";
import { useEffect } from "react";
import TableSortLabel from '@mui/material/TableSortLabel';
import Dialogmodal from "./EditProductModal";
import EditIcon from '@mui/icons-material/Edit';
import { productInt } from "./Interface";
import SubcategoryPopup from '@/components/AddProductModal';
import Link from "next/link";


const BasicTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState<productInt[]>([]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<productInt | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const handleOpen = (product: productInt, key: number) => {
    setModalOpen(true);
    setSelectedRow(product);
    setSelectedIndex(key);
  };

  const handleClose = () => { setModalOpen(false) };
  const handleEditProduct = (product: productInt) => {
    let updatedData = data;
    if (selectedIndex) {
      updatedData[selectedIndex] = product;
    }
    // trebuie sa modific json-ul (to update json)
    setData(updatedData);
  }


  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteTableRaw = (index: number) => {
    setData(data.filter((el) => el.id !== index));
    console.log("%c delete", "color: blue");
  };

  useEffect(() => {
    fetch("./products.json")
      .then((response) => response.json())
      .then((key) => {
        setData(key.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>DASHBOARD</h2>
          <h3>Cyberclothing Admin Panel</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/frontend">
              HOME
            </Link>
            <Typography color="text.primary">Dashboard</Typography>
          </Breadcrumbs>
          <SubcategoryPopup variant="table" />
        </div>
      </div>
      <TableContainer component={Paper} sx={{ borderRadius: '0px' }}>
        <Dialogmodal isOpen={modalOpen} product={selectedRow} closeHandler={handleClose} handleEditProduct={handleEditProduct} />
        <Table
          className={styles.tableList}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead className={styles.head}>
            <TableRow className={styles.element}>
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
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: productInt, index: number) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <img src={row.photo} className={styles.thumb} />
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">${row.price}</TableCell>
                    <TableCell align="center">
                      <span
                        className={`${cerculete.cercul} ${cerculete[row.status]}`}
                      ></span>
                    </TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => deleteTableRaw(row.id)}
                        className={styles.cos}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                      <Button
                        onClick={() => handleOpen(row, index)}
                        className={styles.pencil}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <TablePagination
          className={styles.pagination}
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default BasicTable;
