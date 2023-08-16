import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, MenuItem } from "@mui/material";

interface productInt {
  id: number;
  name: string;
  price: number;
  status: string;
  category: string;
  photo: string;
  vendorId:number;
}

type DialogmodalProps = {
  isOpen: boolean;
  product?: productInt | null;
  closeHandler?: () => void;
  handleEditProduct?: (product: productInt) => void;
};

const EditProductModal: React.FC<DialogmodalProps> = ({
  isOpen,
  product,
  closeHandler,
  handleEditProduct,
}) => {
  const [editedProduct, setEditedProduct] = React.useState<productInt | null>(null);

  React.useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  const handleFieldChange = (
    field: keyof productInt,
    value: string | number | boolean
  ) => {
    if (editedProduct) {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [field]: value,
      }) as productInt);
    }
  };
  
  const closeModal = () => {
    closeHandler && closeHandler();
  };

  const saveProduct = async () => {
    if (editedProduct) {
      try {
        const response = await fetch("/api/updateProduct", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: editedProduct }),
        });

        if (response.ok) {
          handleEditProduct && handleEditProduct(editedProduct);
          closeModal();
        } else {
          throw new Error('Error updating order status');
        }
      } catch (error) {
          console.log('Error updating order status: ', error)
      }
    }
  };

  return (
    <div>
      <Dialog open={isOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          {editedProduct && (
            <>
              <FormControl fullWidth>
                <TextField
                  value={editedProduct.name}
                  margin="dense"
                  id="name"
                  label="Name"
                  fullWidth
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange("name", event.target.value)
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={editedProduct.photo}
                  margin="dense"
                  id="photo"
                  label="Photo"
                  fullWidth
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange("photo", event.target.value)
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={editedProduct.price}
                  margin="dense"
                  id="price"
                  label="Price"
                  fullWidth
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange("price", parseFloat(event.target.value))
                  }
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={editedProduct.status}
                  margin="dense"
                  id="status"
                  label="Status"
                  select
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
                    handleFieldChange("status", event.target.value as string)
                  }
                >
                  <MenuItem value="in stock">In Stock</MenuItem>
                  <MenuItem value="low quantity">Low Quantity</MenuItem>
                  <MenuItem value="not available">Not Available</MenuItem>
                  <MenuItem value="deleted">Deleted</MenuItem>
                </TextField>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={editedProduct.category}
                  margin="dense"
                  id="category"
                  label="Category"
                  fullWidth
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleFieldChange("category", event.target.value)
                  }
                />
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={saveProduct} color="primary">
            Save
          </Button>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProductModal;
