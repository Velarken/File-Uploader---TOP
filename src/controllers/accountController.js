import { createNewUser } from '../../lib/dbQueries.js'
import { body, validationResult } from 'express-validator'

export function validateSignUpInfo( req, res, next ) {
    const validateUser = [
        body('username').trim()
            .isAlphanumeric().withMessage('Username can only contain alphanumeric characters.')
            .isLength({ min: 3, max: 16 }).withMessage('Username must be between 3 - 16 characters.'),
        body('firstName').trim()
            .isAlpha().withMessage('First name must only contain letters.')
            .isLength({ min: 2, max: 20 }).withMessage('First name must be between 2 - 20 letters.'),
        body('lastName').trim()
            .isAlpha().withMessage('Last name must only contain letters.')
            .isLength({ min: 2, max: 20 }).withMessage('Last name must be between 2 - 20 letters.'),
        body('email').trim()
            .isEmail().withMessage('Please check email formatting.'),
        body('password').trim()
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.'),
        body('confirmPassword').trim()
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    ]
}
export function renderSignup( req, res ) {
    res.render('signup', { pageTitle: 'Sign Up' })
}
export async function userSignup( req, res ) {
    const {username, firstName, lastName, email, password, confirmPassword} =  req.body
    if (confirmPassword !== password) {
        console.error('Passwords must match.')
        return
    }
    try {
        const user = await createNewUser(username, firstName, lastName, email, password);
    } catch (error) {
        console.error(error)
    } finally {
        res.redirect('/')
    }
}
export function userLogin( req, res ) {
    res.render('login', { pageTitle: 'Log In' })
}
export function renderAccountSettings( req, res ) {
    res.render('accountSettings', { pageTitle: 'Account Settings' })
}
