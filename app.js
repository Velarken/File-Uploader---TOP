import express from 'express'
import path from 'node:path'
import 'dotenv/config'
import 'bcrypt'
import { prisma } from './lib/prisma.js';
import session from 'express-session';
import passport from 'passport';
import { fileURLToPath } from 'node:url';
import { initPassport } from './config/passport.js'
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import userFilesRouter from './src/routers/userFilesRouter.js'
import accountRouter from './src/routers/accountRouter.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// sessions
const prismaStore = new PrismaSessionStore(
    prisma,
    {
        // refer to docs for @quixo3/prisma-session-store
    }
)
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
        },
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: prismaStore
    })
)
initPassport();
app.use(passport.session());

// routes
app.use('/account', accountRouter)
app.use('/files', userFilesRouter)
app.get('/', (req,res) => {
    res.render('index', { pageTitle: 'Home' })
});

app.use((req,res) => {
    res.status(404).render('404', { pageTitle: '404 Error'})
})

app.listen(process.env.APP_PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log('Server started. Listening on port', process.env.APP_PORT)
})