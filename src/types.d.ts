import { CartItem } from '@prisma/client'

export type User = {
    id: number
    email: string
}

export type CartItemData= Omit<CartItem, 'id' | 'createdAt' | 'updatedAt'>