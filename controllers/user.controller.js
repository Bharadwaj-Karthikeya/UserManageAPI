import { users } from '../data/users.js';

export const getUsers = (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
}

export const createUser = (req, res) => {
    try {
        const { name, email } = req.body;
        
        if (!name || !email) {
            return res.status(400).json({ 
                success: false,
                message: 'Name and email are required' 
            });
        }

        const newUser = { 
            id: Date.now().toString(), 
            name, 
            email 
        };

        users.push(newUser);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

export const getUserById = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ 
            success: false,
            message: 'User not found' 
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });
}

export const updateUser = (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    users.splice(users.indexOf(user), 1);
    
    res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
}