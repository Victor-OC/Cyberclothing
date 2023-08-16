import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Orders.module.css'
import Dashboard from '@/components/Dashboard'
import BasicTable from '@/components/ProductsTable'

export default function ProductsPage() {
    return (
        <>
            <Head>
                <title>Products</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className={styles.main}>
                <Dashboard />
                <BasicTable />
            </div>
        </>
    )
}
