import express from 'express';

import {
    getUsers,
    createUser,
    updateUser,
    updateUserDetails,
    deleteUser,
    getUserById
} from '../controllers/user.controller.js';

import { 
    checkAuth, 
    validateUserID ,
    checkforIDinReq,
    checkHeaderToken
} from '../middleware/auth.js';

import {
    validateUserDTO,
} from '../dtos/user.dto.js';

const router = express.Router();

router.get('/', checkHeaderToken, checkAuth,  getUsers);
router.post('/', validateUserDTO, createUser);
router.put('/:id', validateUserID, updateUserDetails);
router.patch('/:id', validateUserID, updateUser);
router.delete('/:id', validateUserID, deleteUser);
router.get('/id', checkforIDinReq, getUserById);

export default router;