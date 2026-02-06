import { users } from '../data/users.js';
import {
    createUserService, 
    updateUserService, 
    updateUserDetailsService, 
    getUserService, 
    getActiveUserService,
    updateByEmailService,
    deleteUserByEmailService
}  from '../services/user.service.js';
import chalk from 'chalk';

export const getUsers = async (req, res) => {
    console.log(chalk.green('Get all users called'));

    const allUsers = await getUserService();
    res.status(200).json({
        success: true,
        data: allUsers
    });
    
    console.log(chalk.blue('Response sent with all user data'));
}

export const getActiveUsers = async (req, res) => {
    console.log(chalk.green('Get active users called'));

    const allUsers = await getActiveUserService();
    res.status(200).json({
        success: true,
        data: allUsers
    });

    console.log(chalk.blue('Response sent with active user data'));
}

export const createUser = async(req, res) => {
    console.log(chalk.green('Create user called'));
    try {
        const newUser = await createUserService(req.body);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });

        console.log(chalk.blue(`User created with ID: ${newUser.id}`));
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
        console.log(chalk.red(`Error creating user: ${error.message}`));
    }
}

export const getUserById = (req, res) => {
    console.log(chalk.green('Get user by ID called'));
    const { id } = req.body;
    const user = users.find(u => u.id === id);
    if (!user) {
        res.status(404).json({ 
            success: false,
            message: 'User not found' 
        });
        console.log(chalk.red(`User not found with ID: ${id}`));
        return;
    }
    res.status(200).json({
        success: true,
        data: user
    });
    console.log(chalk.blue(`Response sent with user data for ID: ${id}`));
}

export const updateUser = async (req, res) => {
    console.log(chalk.green('Update user called'));
    try {
        const user = await updateUserService(req.body.id, req.body.updateUser);

        if (user === null) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            console.log(chalk.red(`User not found with ID: ${req.body.id}`));
            return;
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
        
        console.log(chalk.blue(`User updated with ID: ${req.body.id}`));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log(chalk.red(`Error updating user: ${error.message}`));
    }
}

export const updateUserDetails = (req, res) => {
    console.log(chalk.green('Update user details called'));
    try{
        const user = updateUserDetailsService(req.body.id, req.body.userData);

        if (user === null) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            console.log(chalk.red(`User not found with ID: ${req.body.id}`));
            return;
        }

        if (user === "No details provided for update") {
            res.status(400).json({
                success: false,
                message: 'No valid fields provided for update'
            });
            console.log(chalk.red(`No valid fields provided for update for ID: ${req.body.id}`));
            return;
        }

        res.status(200).json({
            success: true,
            data: user
        });

        console.log(chalk.blue(`User details updated with ID: ${req.body.id}`));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log(chalk.red(`Error updating user details: ${error.message}`));
    }
}

export const deleteUser = (req, res) => {
    console.log(chalk.green('Delete user called'));
    const { id } = req.body;
    const user = users.find(u => u.id === id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: 'User not found'
        });
        console.log(chalk.red(`User not found with ID: ${id}`));
        return;
    }

    users.splice(users.indexOf(user), 1);
    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
    console.log(chalk.blue(`User deleted with ID: ${id}`));
}

export const updateUserByEmail = async (req, res) => {
    console.log(chalk.green('Update user by email called'));
    const { email, updateUser } = req.body;

    try {
        const user = await updateByEmailService(email, updateUser);
        if (user === null) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            console.log(chalk.red(`User not found with email: ${email}`));
            return;
        }
        res.status(200).json({
            success: true,
            data: user
        });
        console.log(chalk.blue(`User updated with email: ${email}`));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log(chalk.red(`Error updating user by email: ${error.message}`));
    }
}

export const deleteUserByEmail = async (req, res) => {
    console.log(chalk.green('Delete user by email called'));
    const { email } = req.body;
    
    try {
        const user = await deleteUserByEmailService(email);
        if (user === null) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            console.log(chalk.red(`User not found with email: ${email}`));
            return;
        }
        res.status(200).json({
            success: true,
            data: user
        });
        console.log(chalk.blue(`User deleted with email: ${email}`));
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        console.log(chalk.red(`Error deleting user by email: ${error.message}`));
    }
}