import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from "@mui/material";
import axios from "axios";

interface Products {
  id: number;
  photo: string;
  name: string;
  price: number;
  status: string;
  description: string;
  category: string;
  vendorId:number;
}

interface AddProductModalProps {
  variant: string;
  addProduct: (newProduct: Products) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ variant, addProduct }) => {
  const [open, setOpen] = useState(false);
  const [lastProductId, setLastProductId] = useState<number | null>(null);
  const [productData, setProductData] = useState<Products>({
    id: lastProductId || 0,
    vendorId: 1,
    name: "",
    photo: "",
    price: 0,
    status: "in stock",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchLastProductId()
      .then((id) => setLastProductId(id))
      .catch((error) => console.error("Error fetching last product ID:", error));
  }, []);

  const fetchLastProductId = async () => {
    try {
      const response = await axios.get("/api/products");
      const products = response.data.products;
      const lastProduct = products[products.length - 1];
      return lastProduct ? lastProduct.id + 1 : 1;
    } catch (error) {
      throw new Error("Error fetching last product ID");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      const newProductData = {
        ...productData,
        id: lastProductId || 0,
      };
      const response = await axios.post("/api/addProduct", { product: newProductData });

      if (response.data.success) {
        console.log("Product added successfully!");
        addProduct(newProductData);
        setOpen(false);
      } else {
        console.error("Error adding the product.");
      }
    } catch (error) {
      console.error("Error adding the product.", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setProductData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        ADD PRODUCT
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
        <DialogContent>
        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="photo"
                        label="Photo"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Price"
                        type="number"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="status"
                        label="Status"
                        select
                        fullWidth
                        value={productData?.status || ""}
                        onChange={handleInputChange}
                    >
                        <MenuItem value="in stock">In Stock</MenuItem>
                        <MenuItem value="low quantity">Low Quantity</MenuItem>
                        <MenuItem value="not available">Not Available</MenuItem>
                        <MenuItem value="deleted">Deleted</MenuItem>
                    </TextField>
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="category"
                        label="Category"
                        fullWidth
                        onChange={handleInputChange}
                    />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProductModal;
