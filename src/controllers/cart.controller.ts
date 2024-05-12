import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CartItemData } from '../types.d';

const prisma = new PrismaClient();


export const getCartByUserId = async (req:Request, res:Response) => {
  const { userId } = req.params;
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId, 
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateCartByUserId = async (req:Request, res:Response) => {
  const { userId } = req.params;
  const { cartItems } = req.body;
  try {
    await Promise.all(
      cartItems.map(async (cartItem: CartItemData) => {
        await prisma.cartItem.create({
          data: {
            quantity: cartItem.quantity,
            productId: cartItem.productId,
            cartId: userId,
          },
        });
      })
    );
    const updatedCart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
