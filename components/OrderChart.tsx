import React, { useEffect, useState } from "react";
import styles from "@/styles/OrdersChart.module.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function OrdersChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await fetch('/api/orderStats');
                if (!response.ok) throw new Error('Failed to fetch chart data');
                
                const chartData = await response.json();
                setData(chartData);
            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <div className={styles.main}>
            <h3>Orders/Income for the Last 6 Months</h3>
            <BarChart
                width={600}
                height={500}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Orders" fill="#999" />
                <Bar dataKey="Income" fill="#5098f8" />
            </BarChart>
        </div>
    );
}
