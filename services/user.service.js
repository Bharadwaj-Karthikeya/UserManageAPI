import { users }from '../data/users.js';

export const createUserService = (body) => {
    console.log('Creating user with data');
    const newUser = { 
        id: Date.now().toString(), 
        ...body
    };
    
    users.push(newUser);
    console.log('User created:', newUser);
    return newUser;
}

export const updateUserService = (id, body) => {

    const user = users.find(u => u.id === id);

    if (!user) {
        return null;
    }

    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    
    return user;
}

export const updateUserDetailsService = (id, body) => {

    const user = users.find(u => u.id === id);

    if (!user) {
        return null;
    }

    if (!body.name  || !body.email){
        return "No details provided for update";
    }

    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    
    return user;
}