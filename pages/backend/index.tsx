import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import Dashboard from '@/components/Dashboard';
import OrderChart from '@/components/OrderChart';
import BuySellChart from '@/components/BuySellChart';
import DashboardOrdersTable from '@/components/DashboardOrdersTable';
import styles from '@/styles/Backend.module.css';
import CryptoJS from 'crypto-js';
import { Box, Avatar, Breadcrumbs, Typography, Button } from '@mui/material';
import { MessageOutlined, PeopleOutline, NavigationOutlined, Inventory2Outlined } from '@mui/icons-material';
import Link from 'next/link';

interface Vendor {
  email: string;
  password: string;
}

function decryptFunction(encryptedData: string): any {
  return CryptoJS.AES.decrypt(encryptedData, "key").toString(CryptoJS.enc.Utf8);
}

export default function Backend(): JSX.Element {
  const [vendorsData, setVendorsData] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('../../vendors.json')
      .then((response) => response.json())
      .then((data) => {
        setVendorsData(vendorsData);
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
              console.log('User is authenticated.');
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
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.main}>
        <Dashboard />
        <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
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
            </div>
          </div>
          <div className={styles.box}>
            <ul className={styles.div}>
              <li>
                <Box sx={{ bgcolor: "#05e177", p: "30px 40px", borderRadius: 6, mr: 4, mb: 4 }}>
                  <div style={{ display: 'flex' }}>
                    <Avatar sx={{ bgcolor: "white", width: "50px", height: "50px" }}>
                      <NavigationOutlined sx={{ color: "#05e177" }} />
                    </Avatar>
                    <div className={styles.boxText}>
                      <h2>Earnings</h2>
                      <h3>This Month</h3>
                      <h3>$ 6659</h3>
                    </div>
                  </div>
                </Box>
              </li>
              <li>
                <Box sx={{ bgcolor: "#999", p: "30px 40px", borderRadius: 6, mr: 4 }}>
                  <div style={{ display: 'flex' }}>
                    <Avatar sx={{ bgcolor: "white", width: "60px", height: "60px" }}>
                      <Inventory2Outlined sx={{ color: "#999" }} />
                    </Avatar>
                    <div className={styles.boxText}>
                      <h2>Products</h2>
                      <h3>This Month</h3>
                      <h3># 99</h3>
                    </div>
                  </div>
                </Box>
              </li>
              <li>
                <Box sx={{ bgcolor: "#5098f8", p: "30px 40px", borderRadius: 6, mr: 4 }}>
                  <div style={{ display: 'flex' }}>
                    <Avatar sx={{ bgcolor: "white", width: "60px", height: "60px" }}>
                      <MessageOutlined sx={{ color: "#5098f8" }} />
                    </Avatar>
                    <div className={styles.boxText}>
                      <h2>Messages</h2>
                      <h3>This Month</h3>
                      <h3># 33</h3>
                    </div>
                  </div>
                </Box>
              </li>
              <li>
                <Box sx={{ bgcolor: "#b042ff", p: "30px 40px", borderRadius: 6 }}>
                  <div style={{ display: 'flex' }}>
                    <Avatar sx={{ bgcolor: "white", width: "60px", height: "60px" }}>
                      <PeopleOutline sx={{ color: "#b042ff" }} />
                    </Avatar>
                    <div className={styles.boxText}>
                      <h2>Vendors</h2>
                      <h3>This Month</h3>
                      <h3># 143</h3>
                    </div>
                  </div>
                </Box>
              </li>
            </ul>
          </div>
          <ul className={styles.div}>
            <li><OrderChart /></li>
            <li>
              <div style={{ width: 600 }}>
                <DashboardOrdersTable />
                <Link href="/backend/orders">
                  <Button variant='contained' sx={{ mt: 1 }}>
                    VIEW ALL ORDERS
                  </Button>
                </Link>
              </div>
            </li>
          </ul>
          <div className={styles.bschart}>
            <BuySellChart />
          </div>
        </div>
      </div>
    </>
  );
}