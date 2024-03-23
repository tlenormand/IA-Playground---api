/* eslint-disable no-useless-escape */
// Email validation
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
/* eslint-enable no-useless-escape */

// Password validation, at least 8 characters; 1 lowercase, 1 uppercase, 1 number; allowed characters: a-zA-Z0-9!@#$-_=+§%^&*
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$-_=+§ %^&*]{8,}$/;


export {
    emailRegex,
    passwordRegex,
};
