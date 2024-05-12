import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../types.d'

const client = new PrismaClient()

export const register = async (req:Request, res:Response) => {
	try {
		const { name, email, password, address } = req.body
		if (await findUser(email)) return res.status(409).json({ message: 'user with this email already exists' }).end()
		const pwd = await bcrypt.hash(password, 10)
		const user = await client.user.create({ data: { 
			name,
			email,
			password: pwd,
			address
		 } })
		const token = generateJwt({ uid: user.id })
		const createCart = await client.cart.create({ data: { userId: user.id } })
		if (!createCart) return res.status(500).json({ message: 'error creating cart' }).end()
		res.json({user, token}).end() 
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: err }).end()
	}
}

export const logIn = async (req:Request, res:Response) => {
	try {
		const { email, password } = req.body
		const user = await findUser(email)
		if (!user) return res.status(409).json({ message: 'no account was registered with this email' }).end()
		const isValidPwd = await bcrypt.compare(password, user.password)
		if (!isValidPwd) return res.status(401).json({ message: 'password is incorrect :(' }).end()
		const token: string = generateJwt({ uid: user.id })
		res.json({user, token}).end()
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: err }).end()
	}
}

export const changePwd = async (req:Request<User>, res:Response) => {
	try {
		const { id,oldPwd, newPwd } = req.body
		if (!id) return res.status(401).json({ message: 'unauthorized' }).end()
		const user = await client.user.findFirst({ where: { id } })
		if (!user) return res.status(404).json({ message: 'user not found' }).end()
		const isValidPwd = await bcrypt.compare(oldPwd, user.password)
		if (!isValidPwd) return res.status(401).json({ message: 'old password is incorrect :(' }).end()
		const pwd = await bcrypt.hash(newPwd, 10)
		await client.user.update({ where: { id }, data: { password:pwd } })
		res.json({ message: 'Password changed successfully' }).status(200).end()
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: err }).end()
	}
}

const generateJwt = (payload: any) => jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET as string, { expiresIn: '15d' })

const findUser = async (email: string) => client.user.findFirst({ where: { email } })