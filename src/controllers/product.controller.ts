import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Create a new product
export const createProduct = async (req:Request, res:Response) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        quantity: quantity ?? 0,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products
export const getAllProducts = async (req:Request, res:Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a product by ID
export const getProductById = async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a product by ID
export const updateProductById = async (req:Request, res:Response) => {
  const { id } = req.params;
  const { description, price, quantity } = req.body;
  try {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
        });
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        description: description ?? product.description,
        price: price ?? product.price,
        quantity: quantity ?? product.quantity,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product by ID
export const deleteProductById = async (req:Request, res:Response) => {
  const { id } = req.body;
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
