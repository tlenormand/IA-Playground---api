'use strict';

// ================================================================================
// @isAuthenticated
// ================================================================================
// @description
// Middleware used to check if the user is authenticated
// ================================================================================
// @params
// req: request
// res: response
// next: function
// ================================================================================
// @return
// next: function
// ================================================================================
// @errors
// 401: Unauthorized
// ================================================================================
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).json({message: 'Unauthorized, you need to be logged in'});
    }

};


export default isAuthenticated;