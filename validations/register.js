const Validator = require('validator');
const {
    isEmpty
} = require('./common');

const validateRegisterInput = input => {
    let errors = {};

    //First Name
    if (!input.firstName || !Validator.isLength(input.firstName, {
            min: 2,
            max: 30
        })) {
        errors.firstName = 'First name must be between 2 and 30 characters.';
    }

    //Last Name
    if (!input.lastName || !Validator.isLength(input.lastName, {
            min: 2,
            max: 30
        })) {
        errors.lastName = 'Last name must be between 2 and 30 characters.';
    }

    //Gender
    if (!input.gender || !Validator.isIn(input.gender, ['M', 'F'])) {
        errors.gender = 'Gender must M or F.';
    }

    //Birth Year
    if (!input.birthYear || !Validator.isNumeric(input.birthYear)) {
        errors.birthYear = 'Birth year must a numeric value.';
    } else {
        const currentYear = new Date().getFullYear();
        if (input.birthYear < 1900 ||
            input.birthYear > currentYear) {
            errors.birthYear = `Birth year must a vaue between 1900 and ${currentYear}.`;
        }
    }

    //Email
    if (!input.email || !Validator.isEmail(input.email)) {
        errors.email = 'Invalid email format.';
    }

    //Password
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!input.password || !passwordRegex.test(input.password)) {
        errors.password = 'Invalid password format. Need at least 8 characters, 1 uppercase, 1 lowercase, 1 numeric value and 1 special character';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput;