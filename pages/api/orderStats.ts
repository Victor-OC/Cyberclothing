import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Order = {
    id: number;
    date: string;
    price: number;
};

type MonthlyStats = {
    month: string;
    Income: number;
    Orders: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), 'public', 'orders.json');

    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const orders: Order[] = JSON.parse(jsonData);
        const monthlyStats: Record<string, MonthlyStats> = {};

        orders.forEach(order => {
            const date = new Date(order.date);
            const month = date.toLocaleString('default', { month: 'long' });

            if (!monthlyStats[month]) {
                monthlyStats[month] = { month, Income: 0, Orders: 0 };
            }

            monthlyStats[month].Income += order.price;
            monthlyStats[month].Orders += 1;
        });
        const statsArray = Object.values(monthlyStats);
        res.status(200).json(statsArray);
    } catch (error) {
        console.error("Error reading orders.json:", error);
        res.status(500).json({ error: "Failed to read order data" });
    }
}
