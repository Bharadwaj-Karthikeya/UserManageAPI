let success = false;

export const checkAuth = (req, res, next) => {
    const {authorization} = req.headers;
    authorization === 'Bearer 12316445' ? success = true : success = false;
    if (success) {
        console.log('Authentication successful');
        next();
    }
    else {
        console.log('Authentication failed');
        res.status(400).json({ 
            success: false,
            message: 'Unauthorized' 
        });
    }
}

export const validateZod = (schema) => (req, res, next) => {
    console.log('Validating create user data');
    const validation = schema.safeParse(req.body);
    if(!validation.success) {
        return res.status(400).json({
            success : false,
            message : validation.error.flatten().fieldErrors.email[0]
        })
    }
    next();
}

export const validateUserID = (req, res, next) => {
    const { id } = req.params;
    
    if (!id || isNaN(id) ) {
        res.status(400).json({
            success: false,
            message: 'Invalid user ID'
        });
        console.log("ID invalid")
        return;
    }
    console.log("ID validated")
    next();
}

export const checkforIDinReq = (req, res, next) => {
    const {id} = req.body;
    if (!id) {
        res.status(400).json({
            success: false,
            message: 'ID is required in request body'
        });
        console.log("ID is required in request body")
        return;
    }
    next();
}

// export const checkHeaderToken = (req, res, next) => {
//     const  = req.headers;
//     if (!token || token !== '12316445') {
//         res.status(401).json({
//             success: false,
//             message: 'Unauthorized'
//         });
//         console.log("Unauthorized access attempt")
//         return;
//     }
//     console.log("Header authorization successful")
//     next();
// }