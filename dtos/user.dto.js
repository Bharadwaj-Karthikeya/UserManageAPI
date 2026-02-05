

export const validateUserDTO = (req, res, next) => {
    console.log('Validating user DTO');

    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({
            success: false,
            message: 'Name and email are required'
        });
        return;
    }
    console.log('User DTO validated successfully');
    next();
}