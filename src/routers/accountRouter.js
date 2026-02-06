import { Router } from 'express'
import { userLogin, renderAccountSettings, userSignup, renderSignup } from '../controllers/accountController.js';

const accountRouter = Router();

accountRouter.get('/', renderAccountSettings)
accountRouter.get('/login', userLogin)
accountRouter.get('/signup', renderSignup)
accountRouter.post('/signup', userSignup)

export default accountRouter;