import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from 'bcrypt';
import { getUserById, getUserByUsername} from '../lib/dbQueries.js'

async function verifyUser(username, password, done) {
    try {
        const user = await getUserByUsername()
        if (!user) {
            return done(null, false, { message: 'User not found.' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // user.password is a hashed value
        if (!isPasswordValid) {
            return done(null, false, { message: 'Password is incorrect.' });
        }
        return done(null, user);
    } catch (err) {
        return done(err)
    }
}

export function initPassport() {
    passport.use(new LocalStrategy(verifyUser));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById()
        } catch (err) {
            done(err)
        }
    })
    return passport;
}