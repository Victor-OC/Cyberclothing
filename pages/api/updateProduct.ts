import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

type Product = {
  id: number;
  name: string;
  price: number;
  status: string;
  category: string;
  photo: string;
};

const productsPath = path.join(process.cwd(), 'public', 'products.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { product }: { product: Product } = req.body;

    try {
      if (!fs.existsSync(productsPath)) {
        res.status(400).json({ success: false, message: 'Products file not found.' });
        return;
      }

      const productsData = fs.readFileSync(productsPath, 'utf8');
      const existingProducts: { products: Product[] } = JSON.parse(productsData);
      const updatedProducts: { products: Product[] } = {
        products: existingProducts.products.map((p) =>
          p.id === product.id ? { ...product } : p
        ),
      };

      fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));

      res.status(200).json({ success: true, message: 'Product updated successfully!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating product.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
  }
}
