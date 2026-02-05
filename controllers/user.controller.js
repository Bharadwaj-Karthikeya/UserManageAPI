import { users } from '../data/users.js';
import {createUserService, updateUserService, updateUserDetailsService}  from '../services/user.service.js';
import chalk from 'chalk';

export const getUsers = (req, res) => {
    console.log(chalk.green('Get all users called'));
    res.status(200).json({
        success: true,
        data: users
    });
    console.log(chalk.blue('Response sent with all user data'));
}

export const createUser = (req, res) => {
    console.log(chalk.green('Create user called'));
    try {
        const newUser = createUserService(req.body);

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
    // const user = users.find(u => u.id === id);
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

export const updateUser = (req, res) => {
    console.log(chalk.green('Update user called'));
    try {
        const user = updateUserService(req.params.id, req.body);

        if (user === null) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            console.log(chalk.red(`User not found with ID: ${req.params.id}`));
            return;
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
        
        console.log(chalk.blue(`User updated with ID: ${req.params.id}`));
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
        const user = updateUserDetailsService(req.params.id, req.body);

        if (user === null) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            console.log(chalk.red(`User not found with ID: ${req.params.id}`));
            return;
        }

        if (user === "No details provided for update") {
            res.status(400).json({
                success: false,
                message: 'No valid fields provided for update'
            });
            console.log(chalk.red(`No valid fields provided for update for ID: ${req.params.id}`));
            return;
        }

        res.status(200).json({
            success: true,
            data: user
        });

        console.log(chalk.blue(`User details updated with ID: ${req.params.id}`));
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
    const { id } = req.params;
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