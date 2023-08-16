import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

const AddProductModal = ({ variant }: { variant: string }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        ADD PRODUCT
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Physical Product</DialogTitle>
        <DialogContent>
          {/* Subcategory Name */}
          <TextField
            autoFocus
            margin="dense"
            id="subcategoryName"
            label="Subcategory Name"
            fullWidth
          />
          {/* Upload Image */}
          <TextField
            margin="dense"
            id="uploadImage"
            type="file"
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {/* {variant === "pencil" && showAdditionalFields && (
            <Button onClick={handleHideAdditionalFields} color="primary">
            </Button>
          )} */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProductModal;
