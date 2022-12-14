import express from 'express';
import multer from 'multer';
import { authUser } from '../Controllers/authController.js';
import { deleteUser, followUnfollowUser, getUsers, updateUser } from '../Controllers/userController.js';

const router = express.Router();

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/profiles')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const userUpload = multer({ storage: profileStorage })

router.use(authUser);
router.get('/users', getUsers);
router.put('/updateUser/:id',
    userUpload.fields([
        { name: 'profilePicture', maxCount: 1 },
        { name: 'coverPicture', maxCount: 1 }]), updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.put('/followUnfollow/:id', followUnfollowUser);
// router.put('/unfollowUser/:id', unfollowUser);


export default router;