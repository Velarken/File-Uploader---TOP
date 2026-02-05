import { Router } from 'express'

const accountRouter = Router();

accountRouter.get('/', (req,res) => {
    res.render('accountSettings', { pageTitle: 'Account Settings' })
})
accountRouter.get('/login', (req,res) => {
    res.render('login', { pageTitle: 'Log In' })
})
accountRouter.get('/signup', (req,res) => {
    res.render('signup', { pageTitle: 'Sign Up' })
})

export default accountRouter;