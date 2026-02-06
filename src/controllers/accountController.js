import { createNewUser } from '../../lib/dbQueries.js'

export function renderSignup( req, res ) {
    const {username, firstName, lastName, email, password} = req.body

    res.render('signup', { pageTitle: 'Sign Up' })
}
export async function userSignup( req, res ) {
    const {username, firstName, lastName, email, password} = await req.body
    try {
        const user = await createNewUser(username, firstName, lastName, email, password);
    } catch (error) {
        console.error(error)
    }
}

export function userLogin( req, res ) {
    res.render('login', { pageTitle: 'Log In' })
}

export function renderAccountSettings( req, res ) {
    res.render('accountSettings', { pageTitle: 'Account Settings' })
}
