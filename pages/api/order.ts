import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

type Product = {
    id: number;
    name: string;
    photo: string;
    quantity: number;
    vendorId: number;
    price: number;
};

type Order = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    price: number;
    status: string;
    date: string;
    products: Product[];
};

const ordersPath = path.join(process.cwd(), 'public', 'orders.json');

function getNextOrderId(existingOrders: Order[]): number {
    const lastOrderId = existingOrders.reduce((maxId, order) => Math.max(maxId, order.id), 0);
    return lastOrderId + 1;
}

function groupProductsByVendor(products: Product[]): Record<number, Product[]> {
    const groupedProducts: Record<number, Product[]> = {};

    products.forEach(product => {
        if (!groupedProducts[product.vendorId]) {
            groupedProducts[product.vendorId] = [];
        }
        groupedProducts[product.vendorId].push(product);
    });

    return groupedProducts;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, phoneNumber, price, address, products }: Order = req.body;
        const groupedProducts = groupProductsByVendor(products);

        try {
            if (!fs.existsSync(ordersPath)) {
                fs.writeFileSync(ordersPath, '[]', 'utf8');
            }
            const ordersData = fs.readFileSync(ordersPath, 'utf8');
            const existingOrders: Order[] = JSON.parse(ordersData);

            Object.values(groupedProducts).forEach(productGroup => {
                const newOrder: Order = {
                    id: getNextOrderId(existingOrders),
                    name,
                    email,
                    phoneNumber,
                    address,
                    price: calculateTotalPrice(productGroup),
                    status: "in progress",
                    date: new Date().toISOString(),
                    products: productGroup,
                };
                existingOrders.push(newOrder);
            });

            fs.writeFileSync(ordersPath, JSON.stringify(existingOrders, null, 2));

            res.status(200).json({ success: true, message: 'Order(s) placed successfully!' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error placing the order.' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed.' });
    }
}

function calculateSubtotal(price: number, quantity: number): number {
    return price * quantity;
}

function calculateTotalPrice(products: Product[]): number {
    return products.reduce((total, item) => total + calculateSubtotal(item.price, item.quantity), 0);
}
