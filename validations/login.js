const Validator = require('validator');
const {
    isEmpty
} = require('./common');

const validateLoginInput = input => {
    let errors = {};

    //Email
    if (!input.email || !Validator.isEmail(input.email)) {
        errors.email = 'Invalid email format.';
    }

    //Password
    if (!input.password || isEmpty(input.password)) {
        errors.password = 'Password is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;