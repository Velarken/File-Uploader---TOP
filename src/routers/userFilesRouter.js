import { Router } from 'express'

const userFilesRouter = Router();

userFilesRouter.get('/', (req,res) => {
    res.render('allFiles', { pageTitle: 'Your Uploaded Files'})
})
userFilesRouter.get('/upload', (req, res) => {
    res.render('uploadFile', { pageTitle: 'Upload New File'})
})
userFilesRouter.get('/preview', (req,res) => {
    res.render('fileInfo', { pageTitle: 'Filename - change later'})
})

export default userFilesRouter;