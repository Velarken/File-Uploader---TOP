import { prisma } from './prisma.js'
import bcrypt from 'bcrypt'

export async function getUserByUsername(username) {
    return await prisma.user.findUnique({
        wher: { username }
    });
}
export async function getUserById(id) {
    return await prisma.user.findUnique({
        where: { id }
    })
}