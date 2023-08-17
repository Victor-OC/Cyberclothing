import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

type Product = {
  id: number;
  name: string;
  photo: string;
  price: number;
  status: string;
  description: string;
  category: string;
  vendorId: number;
};

const productsPath = path.join(process.cwd(), "public", "products.json");

function getNextProductId(existingProducts: Product[]): number {
  const lastProductId = existingProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
  return lastProductId + 1;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log("Received POST request:", req.body);

    const { name, photo, price, status, description, category, vendorId }: Product = req.body.product;
    const newProduct: Product = {
      id: 0,
      name,
      photo,
      price,
      status,
      description,
      category,
      vendorId,
    };

    try {
      console.log("Reading products file...");
      if (!fs.existsSync(productsPath)) {
        fs.writeFileSync(productsPath, JSON.stringify({ products: [] }), "utf8");
      }
      const productsData = fs.readFileSync(productsPath, "utf8");
      const productsObj = JSON.parse(productsData);
      const existingProducts: Product[] = productsObj.products;
      newProduct.id = getNextProductId(existingProducts);

      const updatedProducts: Product[] = [...existingProducts, newProduct];
      productsObj.products = updatedProducts;

      console.log("Writing updated products to file...");
      fs.writeFileSync(productsPath, JSON.stringify(productsObj, null, 2));

      res.status(200).json({ success: true, message: "Product added successfully!" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "Error adding the product." });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}
