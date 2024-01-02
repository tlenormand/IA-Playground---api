'use strict';

const roles = {
    god: 0,
    super: 1,
    admin: 2,
    user: 3,
};

// ================================================================================
// @rolesMiddleware
// ================================================================================
// @description
// Middleware used to check if the user has the correct role
// ================================================================================
// @params
// role: string
// ================================================================================
// @return
// next: function
// ================================================================================
// @errors
// 401: Unauthorized
// ================================================================================
const rolesMiddleware = (role, options) => {
    return (req, res, next) => {
        if (roles[req.user.role] <= roles[role]) {
            return next();
        }

        return res.status(401).json({message: `Unauthorized, you need role '${role}'`});
    };
}


export default rolesMiddleware;
