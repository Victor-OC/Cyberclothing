import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import logo from '@/components/img/img1.svg';
import { Button, Menu, MenuItem, MenuList, Badge } from '@mui/material';
import { Search, ShoppingBasketOutlined, KeyboardArrowDown } from '@mui/icons-material';

export default function Header() {

    let currentlyHovering = false;

    const [anchorElHome, setAnchorElHome] = React.useState<null | HTMLElement>(null);
    const [anchorElShop, setAnchorElShop] = React.useState<null | HTMLElement>(null);
    const [anchorElProducts, setAnchorElProducts] = React.useState<null | HTMLElement>(null);
    const [anchorElFeatures, setAnchorElFeatures] = React.useState<null | HTMLElement>(null);
    const [anchorElPages, setAnchorElPages] = React.useState<null | HTMLElement>(null);
    const [anchorElBlog, setAnchorElBlog] = React.useState<null | HTMLElement>(null);
    const [cartItemCount, setCartItemCount] = useState(0);

    const openHome = Boolean(anchorElHome);
    const openShop = Boolean(anchorElShop);
    const openProducts = Boolean(anchorElProducts);
    const openFeatures = Boolean(anchorElFeatures);
    const openPages = Boolean(anchorElPages);
    const openBlog = Boolean(anchorElBlog);

    const homeMenuList = ['Fashion', 'Beauty', 'Electronic', 'Furniture', 'Kids', 'Pets', 'Vegetables', 'Watch'];
    const shopMenuList = ['Left Sidebar','Right Sidebar','No Sidebar','Furniture', 'Metro', 'Full Width'];
    const productsMenuList = ['Left Sidebar','Right Sidebar','No Sidebar','Thumbnail Left','Thumbnail Right','Thumbnail Below','Image Left','Image Right'];
    const pagesMenuList = ['About Us','404','Lookbook','Login','Register','Search','Collection','Forgot Password','Contact','Dashboard','FAQ']
    const blogMenuList = ['Left Sidebar','Right Sidebar','Blog Details']

    const handleOpenHome = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElHome(event.currentTarget);
    };

    const handleOpenShop = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElShop(event.currentTarget);
    };
    const handleOpenProducts = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElProducts(event.currentTarget);
    };
    const handleOpenFeatures = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElFeatures(event.currentTarget);
    };
    const handleOpenPages = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElPages(event.currentTarget);
    };
    const handleOpenBlog = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElBlog(event.currentTarget);
    };

    function handleHoverHome() {
        currentlyHovering = true;
    }
    function handleHoverShop() {
        currentlyHovering = true;
    }
    function handleHoverProducts() {
        currentlyHovering = true;
    }
    function handleHoverFeatures() {
        currentlyHovering = true;
    }
    function handleHoverPages() {
        currentlyHovering = true;
    }
    function handleHoverBlog() {
        currentlyHovering = true;
    }

    function handleCloseHoverHome() {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleCloseHome();
            }
        }, 50);
    }
    function handleCloseHoverShop() {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleCloseShop();
            }
        }, 50);
    }
    function handleCloseHoverProducts() {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleCloseProducts();
            }
        }, 50);
    }
    function handleCloseHoverFeatures() {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleCloseFeatures();
            }
        }, 50);
    }
    function handleCloseHoverPages() {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleClosePages();
            }
        }, 50);
    }
    function handleCloseHoverBlog() {
        currentlyHovering = false;
        setTimeout(() => {
            if (!currentlyHovering) {
                handleCloseBlog();
            }
        }, 50);
    }
    const handleCloseHome = () => {
        setAnchorElHome(null);
    };

    const handleCloseShop = () => {
        setAnchorElShop(null);
    };

    const handleCloseProducts = () => {
        setAnchorElProducts(null);
    };
    const handleCloseFeatures = () => {
        setAnchorElFeatures(null);
    };
    const handleClosePages = () => {
        setAnchorElPages(null);
    };
    const handleCloseBlog = () => {
        setAnchorElBlog(null);
    };

    const updateCartItemCount = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(cartItems.length);
    };

    useEffect(() => {
        updateCartItemCount();
        window.addEventListener('storage', updateCartItemCount);
        return () => {
            window.removeEventListener('storage', updateCartItemCount);
        };
    }, []);

    return (
        <>
            < div className={styles.container}>
                <Link href='/frontend'>
                    <Image className={styles.logo} src={logo} alt="logo" />
                </Link>
                <div className={styles.btn}>
                    <Button
                        className={styles.btn}
                        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
                        onClick={handleOpenHome}
                        onMouseOver={handleOpenHome}
                        onMouseLeave={handleCloseHoverHome}
                        endIcon={<KeyboardArrowDown />}
                    >
                        HOME
                    </Button>
                    <Menu
                        anchorEl={anchorElHome}
                        open={openHome}
                        onClose={handleCloseHome}
                        MenuListProps={{
                            onMouseEnter: handleHoverHome,
                            onMouseLeave: handleCloseHoverHome,
                            style: { pointerEvents: "auto" }
                        }}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        PopoverClasses={{
                            root: styles.popOverRoot
                        }}
                    >
                        <MenuList>
                            {homeMenuList.map((link, index) => (
                                <MenuItem key={index} className={styles.menuitem}>{link}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Button
                        className={styles.btn}
                        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
                        onClick={handleOpenShop}
                        onMouseOver={handleOpenShop}
                        onMouseLeave={handleCloseHoverShop}
                        endIcon={<KeyboardArrowDown />}
                    >
                        SHOP
                    </Button>
                    <Menu
                        anchorEl={anchorElShop}
                        open={openShop}
                        onClose={handleCloseShop}
                        MenuListProps={{
                            onMouseEnter: handleHoverShop,
                            onMouseLeave: handleCloseHoverShop,
                            style: { pointerEvents: "auto" }
                        }}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        PopoverClasses={{
                            root: styles.popOverRoot
                        }}
                    >
                        <MenuList>
                            {shopMenuList.map((link, index) => (
                                <MenuItem key={index} className={styles.menuitem}>{link}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Button
                        className={styles.btn}
                        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
                        onClick={handleOpenProducts}
                        onMouseOver={handleOpenProducts}
                        onMouseLeave={handleCloseHoverProducts}
                        endIcon={<KeyboardArrowDown />}
                    >
                        PRODUCTS
                    </Button>
                    <Menu
                        anchorEl={anchorElProducts}
                        open={openProducts}
                        onClose={handleCloseProducts}
                        MenuListProps={{
                            onMouseEnter: handleHoverProducts,
                            onMouseLeave: handleCloseHoverProducts,
                            style: { pointerEvents: "auto" }
                        }}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        PopoverClasses={{
                            root: styles.popOverRoot
                        }}
                    >
                        <MenuList>
                            {productsMenuList.map((link, index) => (
                                <MenuItem key={index} className={styles.menuitem}>{link}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Button
                        className={styles.btn}
                        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
                        onClick={handleOpenFeatures}
                        onMouseOver={handleOpenFeatures}
                        onMouseLeave={handleCloseHoverFeatures}
                        endIcon={<KeyboardArrowDown />}
                    >
                        FEATURES
                    </Button>
                    <Menu
                        anchorEl={anchorElFeatures}
                        open={openFeatures}
                        onClose={handleCloseFeatures}
                        MenuListProps={{
                            onMouseEnter: handleHoverFeatures,
                            onMouseLeave: handleCloseHoverFeatures,
                            style: { pointerEvents: "auto" }
                        }}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        PopoverClasses={{
                            root: styles.popOverRoot
                        }}
                    >
                        <div className={styles.menud}>
                            <MenuList>
                                <h3>Portofolio</h3>
                                <MenuItem className={styles.menuitem}>Portofolio Grid 2</MenuItem>
                                <MenuItem className={styles.menuitem}>Portofolio Grid 3</MenuItem>
                                <MenuItem className={styles.menuitem}>Portofolio Grid 4</MenuItem>
                                <MenuItem className={styles.menuitem}>Masonery 2</MenuItem>
                                <MenuItem className={styles.menuitem}>Masonery 3</MenuItem>
                                <MenuItem className={styles.menuitem}>Masonery 4</MenuItem>
                                <MenuItem className={styles.menuitem}>Masonery Full Width</MenuItem>

                            </MenuList>
                            <MenuList>
                                <h3>Theme Elements</h3>
                                <MenuItem className={styles.menuitem}>Element Title</MenuItem>
                                <MenuItem className={styles.menuitem}>Collection Banner</MenuItem>
                                <MenuItem className={styles.menuitem}>Category</MenuItem>
                                <MenuItem className={styles.menuitem}>Service</MenuItem>
                            </MenuList>
                            <MenuList>
                                <h3>Product Elements</h3>
                                <MenuItem className={styles.menuitem}>Product Box</MenuItem>
                                <MenuItem className={styles.menuitem}>Product Slider</MenuItem>
                                <MenuItem className={styles.menuitem}>No Slider</MenuItem>
                                <MenuItem className={styles.menuitem}>Multi Slider</MenuItem>
                                <MenuItem className={styles.menuitem}>Tab</MenuItem>
                            </MenuList>
                            <MenuList>
                                <h3>Email Template</h3>
                                <MenuItem className={styles.menuitem}>Order_succes</MenuItem>
                                <MenuItem className={styles.menuitem}>Order_succes2</MenuItem>
                                <MenuItem className={styles.menuitem}>Email Template</MenuItem>
                                <MenuItem className={styles.menuitem}>Email Template2</MenuItem>
                            </MenuList>
                            <MenuList>
                                <h3>Accessories</h3>
                                <MenuItem className={styles.menuitem}>Fashion Jewllery</MenuItem>
                                <MenuItem className={styles.menuitem}>Caps And Hats</MenuItem>
                                <MenuItem className={styles.menuitem}>Precious Jewllery</MenuItem>
                                <MenuItem className={styles.menuitem}>Necklaces</MenuItem>
                                <MenuItem className={styles.menuitem}>Earrings</MenuItem>
                                <MenuItem className={styles.menuitem}>Rings & Wrist Wear</MenuItem>
                            </MenuList>
                        </div>
                    </Menu>
                    <Button
                        className={styles.btn}
                        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
                        onClick={handleOpenPages}
                        onMouseOver={handleOpenPages}
                        onMouseLeave={handleCloseHoverPages}
                        endIcon={<KeyboardArrowDown />}
                    >
                        PAGES
                    </Button>
                    <Menu
                        anchorEl={anchorElPages}
                        open={openPages}
                        onClose={handleClosePages}
                        MenuListProps={{
                            onMouseEnter: handleHoverPages,
                            onMouseLeave: handleCloseHoverPages,
                            style: { pointerEvents: "auto" }
                        }}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        PopoverClasses={{
                            root: styles.popOverRoot
                        }}
                    >
                        <MenuList>
                            {pagesMenuList.map((link, index) => (
                                <MenuItem key={index} className={styles.menuitem}>{link}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Button
                        className={styles.btn}
                        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
                        onClick={handleOpenBlog}
                        onMouseOver={handleOpenBlog}
                        onMouseLeave={handleCloseHoverBlog}
                        endIcon={<KeyboardArrowDown />}
                    >
                        BLOG
                    </Button>
                    <Menu
                        anchorEl={anchorElBlog}
                        open={openBlog}
                        onClose={handleCloseBlog}
                        MenuListProps={{
                            onMouseEnter: handleHoverBlog,
                            onMouseLeave: handleCloseHoverBlog,
                            style: { pointerEvents: "auto" }
                        }}
                        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                        PopoverClasses={{
                            root: styles.popOverRoot
                        }}
                    >
                        <MenuList>
                            {blogMenuList.map((link, index) => (
                                <MenuItem key={index} className={styles.menuitem}>{link}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                </div>
                <Search fontSize='large' className={styles.btn1} />
                <Link href='/frontend/cart'>
                    <Badge badgeContent={cartItemCount} color="primary">
                        <ShoppingBasketOutlined fontSize='large' className={styles.btn2} />
                    </Badge>
                </Link>
            </div>
        </>)
}