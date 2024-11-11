import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { parseISO, format } from 'date-fns';

type Order = {
    id: number;
    date: string;
    price: number;
};

type ChartData = {
    name: string;
    totalIncome: number;
    orderCount: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), 'public', 'orders.json');

    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const orders: Order[] = JSON.parse(jsonData);
        const monthlyData: Record<string, { totalIncome: number; orderCount: number }> = {};

        orders.forEach((order) => {
            const month = format(parseISO(order.date), 'MMMM');
            if (!monthlyData[month]) {
                monthlyData[month] = { totalIncome: 0, orderCount: 0 };
            }
            monthlyData[month].totalIncome += order.price;
            monthlyData[month].orderCount += 1;
        });

        const processedData: ChartData[] = Object.keys(monthlyData).map((month) => ({
            name: month,
            totalIncome: monthlyData[month].totalIncome,
            orderCount: monthlyData[month].orderCount,
        }));

        res.status(200).json(processedData);
    } catch (error) {
        console.error("Error reading orders.json:", error);
        res.status(500).json({ error: "Failed to read or process order data" });
    }
}
