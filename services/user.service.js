import { users }from '../data/users.js';
import User from '../models/users.js';

export const createUserService = async (body) => {
    console.log('Creating user with data');
    const newUser = await User.create({ 
        ...body
    });
    
    users.push(newUser);
    console.log('User created:', newUser);
    return newUser;
}

export const updateUserService = async (id, body) => {

    const userUpdated = await User.findByIdAndUpdate(id, 
        {
            $set: body
        }, 
        { 
            new: true,
            runValidators:true,
        }
    );

    return userUpdated;
}

export const updateUserDetailsService = async (id, body) => {
    try {
        const user = await User.findByIdAndUpdate(id,
        {
            $set: body
        },
        {
            new: true,
            runValidators: true,
        }
    );
    return user;
    } catch (error) {
        console.error('Error updating user details:', error);
        throw error;
}
        
}

export const getUserService = async() => {
    const allUsers = await User.find();
    return allUsers;
}

export const getActiveUserService = async() => {
    const allUsers = await User.find({isActive:true});
    return allUsers;
}

export const updateByEmailService = async(email, body) => {
    const userUpdated = await User.findOneAndUpdate( 
        {
            email: email
        }, 
        {
            $set: body
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return userUpdated;
}

export const deleteUserByEmailService = async(email) => {
    const userDeleted = await User.findOneAndDelete(
        {
            email: email
        }
    );
    return userDeleted;
} 