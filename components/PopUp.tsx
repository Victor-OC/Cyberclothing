import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, InputAdornment, Tooltip } from "@mui/material";
import { PermIdentityOutlined, EmailOutlined, HomeOutlined, PhoneOutlined } from "@mui/icons-material";

const PopUp = ({ cartItems, onOrderPlaced }: { variant: string; cartItems: any[]; onOrderPlaced: () => void }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phoneNumber: "", address: "" });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.id]: e.target.value,
        }));
    };

    const calculateSubtotal = (price: number, quantity: number) => {
        return price * quantity;
    };

    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + calculateSubtotal(item.price, item.quantity);
        }, 0);
        return totalPrice;
    };

    const isButtonDisabled = () => {
        return (
            cartItems.length === 0 ||
            formData.name.trim() === '' ||
            formData.email.trim() === '' ||
            formData.phoneNumber.trim() === '' ||
            formData.address.trim() === ''
        );
    };

    const handleSend = () => {
        const orderData = {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            price: calculateTotalPrice(),
            products: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                photo: item.image,
                quantity: item.quantity,
                vendorId: item.vendorId,
                price: item.price,
            })),
        };

        fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Order placed:", data);
                setOpen(false);
                localStorage.removeItem('cart');
                onOrderPlaced();
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    };

    return (
        <div>
            <Button variant="contained" size="large" color="primary" onClick={handleClickOpen}>
                CHECK OUT
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Check Out</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        type="text"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PermIdentityOutlined /></InputAdornment>,
                        }}
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        type="text"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><EmailOutlined /></InputAdornment>,
                        }}
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        type="tel"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><PhoneOutlined /></InputAdornment>,
                        }}
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        name="address"
                        autoComplete="address"
                        type="text"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><HomeOutlined /></InputAdornment>,
                        }}
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 25px', marginTop: '-20px' }}>
                    <Button onClick={handleClose} variant='contained' size='large' sx={[{ '&:hover': { color: 'black', backgroundColor: 'red', } }]}>
                        CANCEL ORDER
                    </Button>
                    <Tooltip title="Firstly add a product in your cart and complete all fields" placement="bottom" open={isButtonDisabled()}>
                        <span>
                            <Button
                                onClick={handleSend}
                                type='submit'
                                variant='contained'
                                size='large'
                                sx={{ '&:hover': { backgroundColor: 'green' } }}
                                disabled={isButtonDisabled()}>
                                CHECK OUT
                            </Button>
                        </span>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PopUp;
