import { prisma } from './prisma.js'
import bcrypt from 'bcrypt'

export async function getUserByUsername(username) {
    return await prisma.user.findUnique({
        where: { username }
    });
}
export async function getUserById(id) {
    return await prisma.user.findUnique({
        where: { id }
    })
}
export async function createNewUser( username, firstName, lastName, email, password ) {
    const doesUserExist = await getUserByUsername(username);
    if (doesUserExist) {
        console.error('user already exists with that username')
        return
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return await prisma.user.create({
        data: {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        }
    })
}