import express from 'express';

import {
    getUsers,
    createUser,
    updateUser,
    updateUserDetails,
    deleteUser,
    getUserById,
    getActiveUsers,
    updateUserByEmail,
    deleteUserByEmail,
} from '../controllers/user.controller.js';

import { 
    checkAuth, 
    validateUserID ,
    checkforIDinReq,
    // checkHeaderToken,
    validateZod
} from '../middleware/auth.js';

import {
    validateUserDTO,
} from '../dtos/user.dto.js';

import { createUserSchema, updateUserSchema } from "../dtos/user.zod.js";


const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/id', updateUserDetails);
router.patch('/email', updateUserByEmail);
router.delete('/email', deleteUserByEmail);
router.patch('/id', updateUser);
router.delete('/id', deleteUser);
router.get('/id', getUserById);
router.get('/active', getActiveUsers);

// router.get('/',  checkAuth,  getUsers);
// router.post('/', validateZod(createUserSchema), createUser);
// router.put('/:id', validateZod(updateUserSchema), updateUserDetails);
// router.patch('/:id', validateUserID, updateUser);
// router.delete('/:id', validateUserID, deleteUser);
// router.get('/id', checkforIDinReq, getUserById);

export default router;