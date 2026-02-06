import {z} from 'zod';

const userSchema = z.object({
    name: z.string(),
    email: z.email()
});

export const createUserSchema = z.object({
    name: z.string().min(3, 'Name is too short'),
    email: z.email('Invalid email format')
});

export const updateUserSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.email().optional()
});