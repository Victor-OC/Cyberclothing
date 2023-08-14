import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Dashboard, Inventory, LocalShipping, KeyboardArrowRight, Logout } from '@mui/icons-material';
import { Avatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { blue } from '@mui/material/colors';
import styles from '@/styles/Dashboard.module.css';
import CryptoJS from 'crypto-js';

interface Vendor {
    id: number,
    name: string;
    email: string;
    password: string;
}

function decryptFunction(encryptedData: string): any {
    return CryptoJS.AES.decrypt(encryptedData, 'key').toString(CryptoJS.enc.Utf8);
}

export default function DashboardTab() {
    const handleLogOut = () => {
        Cookies.remove('userData');
        window.location.href = '/backend/login';
    };
    const [vendorsData, setVendorsData] = useState<Vendor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [authenticatedVendor, setAuthenticatedVendor] = useState<Vendor | null>(null);

    useEffect(() => {
        fetch('../../vendors.json')
            .then((response) => response.json())
            .then((data) => {
                setVendorsData(data);
                setIsLoading(false);
                const encryptedData = Cookies.get('userData');
                if (encryptedData) {
                    try {
                        const decryptedData = decryptFunction(encryptedData);
                        const user = JSON.parse(decryptedData) as Vendor;
                        const matchedVendor = data.find(
                            (vendor: any) => vendor.email === user.email && vendor.password === user.password
                        );

                        if (matchedVendor) {
                            setAuthenticatedVendor(matchedVendor);
                        } else {
                            console.log('Invalid user or session expired. Redirecting to login page...');
                            Cookies.remove('userData');
                            window.location.href = '/backend/login';
                        }
                    } catch (error) {
                        console.error('Error parsing decrypted data:', error);
                        Cookies.remove('userData');
                        window.location.href = '/backend/login';
                    }
                } else {
                    console.log('No cookie found. Redirecting to login page...');
                    window.location.href = '/backend/login';
                }
            })
            .catch((error) => {
                console.error('Error fetching vendors:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div className={styles.userProfile}>
                    <Avatar sx={{ bgcolor: blue[500], width: 56, height: 56 }} />
                    {authenticatedVendor && (
                        <>
                            <h1 className={styles.name}>{authenticatedVendor.name}</h1>
                            <h1 className={styles.pos}>Vendor ID: #{authenticatedVendor.id}</h1>
                        </>
                    )}
                </div>
                <div>
                    <Link href="/backend">
                        <ListItemButton className={styles.btn} sx={{ pr: '40px' }}>
                            <ListItemIcon sx={{ mr: '-2px' }}>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </Link>
                    <Link href="/backend/products">
                        <ListItemButton className={styles.btn} sx={{ pr: '40px' }}>
                            <ListItemIcon sx={{ mr: '-2px' }}>
                                <Inventory />
                            </ListItemIcon>
                            <ListItemText primary="Products" />
                            <KeyboardArrowRight fontSize="small" />
                        </ListItemButton>
                    </Link>
                    <Link href="/backend/orders">
                        <ListItemButton className={styles.btn} sx={{ pr: '40px' }}>
                            <ListItemIcon sx={{ mr: '-2px' }}>
                                <LocalShipping />
                            </ListItemIcon>
                            <ListItemText primary="Orders" />
                            <KeyboardArrowRight fontSize="small" />
                        </ListItemButton>
                    </Link>
                    <ListItemButton className={styles.btn} onClick={handleLogOut} sx={{ pr: '40px' }}>
                        <ListItemIcon sx={{ mr: '-2px' }}>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </div>
            </div>
        </div>
    );
}