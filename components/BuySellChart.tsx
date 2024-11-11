import React, { useEffect, useState } from "react";
import styles from "@/styles/BuySellChart.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type ChartData = {
    name: string;
    totalIncome: number;
    orderCount: number;
};

export default function BuySellChart() {
    const [data, setData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await fetch('/api/buySellData');
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
            <h3>Monthly Orders & Income</h3>
            <LineChart
                width={1200}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Orders" stroke="#999" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Income" stroke="#5098f8" />
            </LineChart>
        </div>
    );
}
